# Migration des sources d'assets vers mg-api.ariedam.fr

**Date** : 2026-08-27
**Statut** : validé, prêt pour le plan d'implémentation

## Contexte

MGData et MGSprite consomment déjà l'API : `/data` dans
[`modules/data/logic/fetch.ts`](../../../src/modules/data/logic/fetch.ts) et
`/assets/sprite-data?full=1` + `/assets/sprites/{cat}/{name}.png` dans
[`modules/sprite/logic/catalog.ts`](../../../src/modules/sprite/logic/catalog.ts).

Quatre zones ne l'utilisent pas encore. L'une d'elles est cassée : le fichier
`src/data/cosmetics/cosmeticTypes` a été supprimé du dépôt alors que deux
modules l'importent toujours. Comme ce sont des `import type`, Vite les efface
et le build passe, mais `CosmeticItem` ne résout plus rien et `CosmeticInfo`
perd tous ses champs. C'est l'origine des **47 erreurs de `npm run typecheck`**.

## Décisions prises

| Sujet | Décision |
|---|---|
| Périmètre | Les quatre zones : cosmetics, rive, mutations composées, base URL |
| `availability` des cosmétiques | Déduit du nom de fichier, pas d'ajout côté API |
| Mutations | Hybride : `toCanvas()` via l'API, `show()` reste local |
| Base URL | L'API en primaire, risque de décalage de version assumé |

## Section 1 — Cosmetics

### Source

`GET /assets/cosmetics?full=1` — 175 entrées, 8 catégories (`Banner`,
`Bottom`, `Default`, `Expression`, `FaceProp`, `Mid`, `Status`, `Top`).
Chaque entrée : `{ cat, name, base, src, url }`, `url` absolue et versionnée.

Le chargement passe par le helper `GM_xmlhttpRequest` avec repli `fetch`,
identique à celui de MGData et MGSprite.

### Types

Les types perdus (`CosmeticItem`, `CosmeticType`, `CosmeticAvailability`) sont
recréés dans [`modules/cosmetic/avatar/types.ts`](../../../src/modules/cosmetic/avatar/types.ts).
`src/data/` n'est **pas** ressuscité : la donnée vient de l'API, seule la forme
reste locale.

[`api/avatar.types.ts`](../../../src/api/avatar.types.ts) réexporte depuis le
module au lieu du chemin mort.

### Correspondance des champs

| Champ interne | Source API |
|---|---|
| `type` | `cat` |
| `displayName` | `name` |
| `filename` | `base + ".png"` |
| `id` | `base` |
| `url` | `url` |
| `availability` | déduit de `cat` + `base` — voir ci-dessous |

### `availability`

L'API ne sert pas ce champ. Une seule fonction le déduit :

```
deriveAvailability(cat, base):
  cat === "Default"            -> 'default'   # les 8 couleurs de corps
  base contient "_Default"     -> 'default'   # Top_DefaultGray, Expression_Default, ...
  base se termine par "_Blank" -> 'default'   # Top_Blank, Mid_Blank, Bottom_Blank
  sinon                        -> 'purchasable'
```

La première clause est indispensable : les couleurs de corps s'appellent
`Default_Blue`, `Default_Gray`… et ne contiennent donc pas `_Default`. Sans
elle, les 8 couleurs de base seraient classées payantes et disparaîtraient du
sélecteur pour un joueur qui ne les « possède » pas.

Tout le reste du module lit `item.availability` sans savoir d'où il vient. La
porte de possession de
[`query.ts`](../../../src/modules/cosmetic/avatar/logic/query.ts) est inchangée :
`'default'` passe toujours, le reste va à `isOwned()`.

**Fragilité assumée** : c'est une convention de nommage, pas un contrat. Un
renommage côté jeu la casse en silence. Le commentaire de la fonction doit le
dire et pointer vers `/assets/cosmetics` comme endroit où vérifier.

### Suppressions

- `logic/criticalDefaults.ts` — la liste codée en dur. Les trois fichiers
  qu'elle nommait (`Top_DefaultGray`, `Mid_DefaultGray`, `Bottom_DefaultGray`)
  existent tous dans l'API.
- `discoverFromManifest()` dans `query.ts` — le parcours du `manifest.json` du
  jeu, avec son `availability: "purchasable"` appliqué à tout.
- `getAssetBaseUrl()` dans `query.ts` — le scraping des balises `<script>`,
  avec son URL de dernier recours codée en dur. L'API sert des URLs absolues.

### Correction annexe

`BLANK_PATHS.Expression` vaut `"Expression_Blank.png"`, qui n'existe ni dans
l'API ni dans le jeu. Les seuls `_Blank` sont `Top_Blank`, `Mid_Blank` et
`Bottom_Blank`. La valeur correcte pour l'emplacement Expression est
`"Expression_Default.png"`.

## Section 2 — Rive

### Source

`GET /assets/rive?full=1` — 6 fichiers : `avatar`, `currency`, `decor`,
`giftbox`, `pets`, `thought-bubble`. Tous `loadable: true`.

> La description OpenAPI affirme que `avatar.riv` est définitivement
> `loadable: false`. Les données réelles disent l'inverse. **Se fier au champ,
> jamais à la description.**

Chaque fichier expose `key`, `aliases`, `url` (via `/assets/proxy`, qui ajoute
les en-têtes CORS que magicgarden.gg ne sert pas), `origin`, `bytes`,
`loadable`, et `artboards[]` avec, pour chacun, ses `animations[]` et ses
`stateMachines[].inputs[]` typés.

Les `.riv` vivent sous `magicgarden.gg/runtime-assets/<nom>.<hash>.riv`, donc
indépendamment de la base URL de la section 4.

### Suppressions

- `installFetchInterceptor()` / `removeFetchInterceptor()` — un patch global de
  `window.fetch`, interdit par la règle « no side effects, any patch MUST have
  cleanup ». Il patche par ailleurs `window` et non `pageWindow`, donc sous
  Tampermonkey il rate vraisemblablement les appels du jeu.
- `discoverFromScripts()` et `findRiveMatches()` — le parcours des scripts.
- `RIVE_FILE_PATTERNS` et `categorizeRiveFile()` — les regex de catégorisation,
  remplacées par la clé de l'API.

### Surface conservée

`waitForRiveFile(type)` et `findAvatarRiveFile()` gardent leur signature. Elles
résolvent depuis le catalogue, immédiatement, au lieu d'attendre jusqu'à 30 s
qu'une interception se produise.

### Gain

Le module expose l'inventaire des state machines. Aujourd'hui
[`outfit.ts`](../../../src/modules/riveLoader/logic/outfit.ts) et
[`instance.ts`](../../../src/modules/riveLoader/logic/instance.ts) ne peuvent
pas savoir qu'une entrée est un trigger plutôt qu'un booléen, et se tromper
échoue en silence. `Pet State Machine` mélange les deux : `sleep`, `held`,
`fire`, `thunder`, `isShadowVisible` sont des `boolean` ; `walk`, `eat`,
`petted`, `ability`, `hungry`, `mount`, `dismount`, `idleBreak` sont des
`trigger`. L'artboard avatar ajoute un troisième type, `number`
(`peekHeight`, `runDirection`).

## Section 3 — Mutations composées

`GET /assets/sprites/composed?key=<clé atlas>&mutations=<liste>` rend un PNG
avec tous les calques appliqués. Les 10 mutations qu'il accepte sont exactement
celles de `MUT_META` — parité complète.

### Découpe

- **`toCanvas()`** passe par l'API. Une image, mise en cache 24 h par le
  navigateur (`public, max-age=86400`).
- **`show()`** garde la composition locale. Il renvoie un `PixiSprite` attaché
  au monde, et l'endpoint « agrandit le canvas pour contenir tous les calques » :
  un PNG plus grand que la base décale le centre visuel par rapport à l'ancre
  de l'atlas, donc le sprite se placerait de travers en jeu.

### Ce que ça ne fait pas

`mutations/composer.ts`, `filters.ts` et `overlay.ts` **restent** — `show()` en
dépend. Le gain n'est pas de la suppression de code : c'est que les vignettes
du HUD deviennent identiques au pixel près à ce que sert l'API, et que
`mutations/cache.ts` devient inutile côté `toCanvas()` puisque le cache HTTP
le remplace.

Appelants concernés : `TeamListItem`, `TeamCard`, et le Locker
(`spriteRenderer`, `PreviewSection`, `RuleEditorModal`).

## Section 4 — Base URL des assets

### Décision et risque

[`modules/assets/logic/urls.ts`](../../../src/modules/assets/logic/urls.ts)
construit aujourd'hui `${ORIGIN}/version/${MGVersion}/assets/`, c'est-à-dire la
version qui tourne réellement dans la page. L'API renvoie la version qu'elle a
synchronisée en dernier.

**Décision** : l'API devient la source primaire.

**Risque assumé, à documenter dans le code** : si le jeu se met à jour avant la
synchronisation de l'API, la base URL pointe vers une version d'assets qui
n'existe plus, et les consommateurs prennent des 404. Ils sont trois :
[`modules/audio/logic/init.ts`](../../../src/modules/audio/logic/init.ts),
[`modules/cosmetic/logic/init.ts`](../../../src/modules/cosmetic/logic/init.ts)
et [`modules/manifest/logic/loading.ts`](../../../src/modules/manifest/logic/loading.ts).

La dérivation locale est conservée comme **repli sur échec réseau** — c'est de
la gestion d'erreur, pas un retour en arrière sur la décision. Elle ne se
déclenche pas quand l'API répond une version périmée, seulement quand elle ne
répond pas.

### Source

Aucun endpoint ne sert la base URL seule. Le porteur le moins cher est
`GET /assets/sprite-data?cat=ui&flat=1` : 78 octets, dont le champ `baseUrl`.

> Amélioration possible côté API, hors périmètre : exposer `baseUrl` sur
> `GET /`, qui ne le renvoie pas aujourd'hui. Ça remplacerait cet appel
> détourné par un appel direct.

## Tests

- `npm run typecheck` : **47 erreurs → 0**. C'est le critère de réussite
  principal, et il est entièrement porté par la section 1.
- `npm run build` reste vert.
- Le rendu en jeu n'est pas vérifiable sans lancer le jeu. Points à contrôler
  manuellement, dans l'ordre de risque :
  1. Les assets `/version/<hash>/assets/` chargent toujours (section 4) — audio,
     manifest, cosmetic non-avatar.
  2. Les pets Rive s'animent, en particulier `walk` et `eat`, qui sont des
     triggers (section 2).
  3. Les vignettes mutées du Locker et des équipes s'affichent (section 3).
  4. Le sélecteur d'avatar liste bien 175 cosmétiques et n'affiche que ceux
     possédés plus les `default` (section 1).

## Hors périmètre

- `/assets/animations` (boucles WebP/GIF) — le mod rend du Rive, pas des GIF.
- `/live/*` et `/stats/*` — les features d'alertes ont déjà leurs sources.
- L'option « mutations entièrement côté serveur », écartée au profit de
  l'hybride pour ne pas toucher au placement en jeu.
