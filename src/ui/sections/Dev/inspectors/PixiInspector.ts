import { element } from '../../../styles/helpers';
import { Button } from '../../../components/Button/Button';
import { Card } from '../../../components/Card/Card';
import { Input } from '../../../components/Input/Input';
import { MGTile } from '../../../../modules';
import { MGPixi } from '../../../../modules';
import { MGData } from '../../../../modules';
import { MGSprite } from '../../../../modules';

export function PixiInspector(): HTMLElement {
    const container = element('div', {
        className: 'pixi-inspector',
        style: 'display: flex; flex-direction: column; gap: 12px; height: 100%; min-height: 0; overflow: hidden;'
    });


    const controls = element('div', {
        style: 'display: flex; flex-direction: column; gap: 10px; padding: 2px;'
    });

    const inputRow = element('div', {
        style: 'display: grid; grid-template-columns: 1fr 1fr auto; gap: 8px; align-items: end;'
    });

    let tx = 0;
    let ty = 0;
    let isPicking = false;

    const txInput = Input({
        label: 'Tile X',
        mode: 'digits',
        value: '0',
        onChange: (v) => {
            tx = parseInt(v) || 0;
            doInspect();
        }
    });

    const tyInput = Input({
        label: 'Tile Y',
        mode: 'digits',
        value: '0',
        onChange: (v) => {
            ty = parseInt(v) || 0;
            doInspect();
        }
    });

    const pickBtn = Button({
        label: 'Pick from Canvas',
        variant: 'default',
        onClick: () => togglePicking()
    });

    if (txInput && (txInput as any).root) inputRow.appendChild((txInput as any).root);
    if (tyInput && (tyInput as any).root) inputRow.appendChild((tyInput as any).root);
    inputRow.appendChild(pickBtn);
    controls.appendChild(inputRow);
    container.appendChild(controls);

    const resultArea = element('div', {
        style: 'flex: 1; min-height: 0; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; padding-right: 4px;'
    });
    container.appendChild(resultArea);

    const togglePicking = () => {
        isPicking = !isPicking;
        pickBtn.textContent = isPicking ? '🎯 Click any tile...' : 'Pick from Canvas';
        pickBtn.style.background = isPicking ? 'var(--color-primary)' : '';
        pickBtn.style.color = isPicking ? '#000' : '';

        if (isPicking) {
            document.addEventListener('click', handleGlobalClick, true);
        } else {
            document.removeEventListener('click', handleGlobalClick, true);
        }
    };

    const handleGlobalClick = (e: MouseEvent) => {
        if (!isPicking) return;

        // Only process clicks on the game canvas
        const target = e.target as HTMLElement;
        if (!target || target.tagName !== 'CANVAS') return;

        e.preventDefault();
        e.stopPropagation();

        const res = MGTile.pointToTile({ x: e.clientX, y: e.clientY });
        if (res) {
            tx = res.tx;
            ty = res.ty;
            txInput.setValue(String(tx));
            tyInput.setValue(String(ty));
            doInspect();
        }
        togglePicking();
    };


    const doInspect = () => {

        resultArea.innerHTML = '';
        try {
            // "Combined" inspection (TileObject + View data)
            const data = MGTile.inspect(tx, ty);

            const card = Card({
                title: `Tile (${tx}, ${ty})`,
                subtitle: `GIDX: ${data.gidx} | ${data.objectType || 'EMPTY'}`,
                expandable: true,
                padding: 'sm'
            });

            const pre = element('pre', {
                style: 'margin: 0; padding: 8px; font-size: 11px; background: rgba(0,0,0,0.3); border-radius: 4px; color: var(--color-primary); overflow: auto; max-height: 400px;'
            });
            pre.textContent = JSON.stringify(data.tileObject || {}, (key, val) => {
                if (key === 'tileView' || key === 'displayObject') return '[Circular/Ref]';
                return val;
            }, 2);

            card.appendChild(pre);

            // Logic Helpers Section
            if (data.objectType === 'plant') {
                const speciesId = data.tileObject?.plant?.speciesId as string;
                const speciesBag = MGData.get('plants') as any;
                const species = speciesBag?.[speciesId];

                if (species) {
                    const metaCard = Card({
                        title: species.name || speciesId,
                        subtitle: 'SPECIES METADATA',
                        variant: 'soft',
                        padding: 'sm'
                    });

                    const details = element('div', { style: 'font-size: 11px; display: flex; flex-direction: column; gap: 4px;' });
                    details.appendChild(element('div', { textContent: `Base Grow Time: ${species.growTime}s` }));
                    const muts = Array.isArray(species.mutations) ? species.mutations.join(', ') : 'None';
                    details.appendChild(element('div', { textContent: `Mutations: ${muts}` }));
                    metaCard.appendChild(details);
                    resultArea.appendChild(metaCard);
                }

                const actions = element('div', { style: 'display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; padding: 8px; background: rgba(255,255,255,0.05); border-radius: 4px;' });
                actions.appendChild(Button({
                    label: 'Clear Tile',
                    size: 'sm',
                    variant: 'danger',
                    onClick: () => {
                        MGTile.setTileEmpty(tx, ty);
                        doInspect();
                    }
                }));
                card.appendChild(actions);
            }

            resultArea.appendChild(card);

            // Highlight the tile in game using overlay
            MGPixi.drawOverlayBox(tx, ty, {
                key: 'pixi-inspect-hl',
                tint: 0x7FF6FF,
                alpha: 0.8
            });

        } catch (e) {
            resultArea.innerHTML = `<div style="color:var(--color-danger); padding: 10px;">Error: ${e instanceof Error ? e.message : String(e)}</div>`;
        }
    };

    // Cleanup
    (container as any).destroy = () => {
        document.removeEventListener('click', handleGlobalClick, true);
        MGPixi.stopOverlay('pixi-inspect-hl');
    };


    return container;
}
