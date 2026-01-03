import { element } from '../../styles/helpers';
import { Card } from '../../components/Card/Card';
import { Input } from '../../components/Input/Input';
import { Gemini } from '../../../api';
import { MGData } from '../../../modules';
import { Globals } from '../../../globals';

export function AtomInspector(): HTMLElement {
    const container = element('div', {
        className: 'atom-inspector',
        style: 'display: flex; flex-direction: column; gap: 12px; height: 100%; min-height: 0; overflow: hidden;'
    });

    const searchRow = element('div', { style: 'flex-shrink: 0; padding-bottom: 8px;' });
    const searchInput = Input({
        placeholder: 'Search data keys...',
        value: '',
        onChange: (val) => renderList(val)
    });
    searchRow.appendChild(searchInput.root);
    container.appendChild(searchRow);

    const listContainer = element('div', {
        style: 'flex: 1; min-height: 0; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; padding-right: 4px; padding-bottom: 20px;'
    });
    container.appendChild(listContainer);


    const CATEGORIES = {
        MGData: ['plants', 'pets', 'mutations', 'items', 'decor', 'eggs', 'abilities', 'weather'],
        Globals: ['currentTile', 'myInventory', 'myPets', 'myGarden', 'players', 'shops', 'weather', 'gameMap'],
        Atoms: [
            'positionAtom', 'myCoinsCountAtom', 'myInventoryAtom', 'myPetInfosAtom',
            'weatherAtom', 'currentGardenNameAtom', 'numPlayersAtom', 'avgPingAtom'
        ]
    };

    const activeSubscriptions: Array<() => void> = [];

    const renderList = (filter = '') => {
        listContainer.innerHTML = '';
        activeSubscriptions.forEach(unsub => unsub());
        activeSubscriptions.length = 0;

        const filterLc = filter.toLowerCase();

        // Helper to create a lazy data card
        const createDataCard = (title: string, subtitle: string, getData: () => any, subscribe?: (cb: (val: any) => void) => () => void) => {
            const combinedTitle = `${title} - ${subtitle}`;
            if (filter && !combinedTitle.toLowerCase().includes(filterLc)) return;

            let cardUnsub: (() => void) | null = null;

            const pre = element('pre', {
                style: 'margin: 0; padding: 8px; font-size: 11px; background: rgba(0,0,0,0.3); border-radius: 4px; color: var(--color-primary); overflow: auto; max-height: 400px;'
            });
            pre.textContent = 'Expand to load data...';

            const card = Card({
                title: combinedTitle,
                expandable: true,
                defaultExpanded: !!filter, // Auto-expand if searching
                padding: 'sm',
                onExpandChange: (expanded) => {
                    if (expanded) {
                        pre.textContent = 'Loading...';
                        if (subscribe) {
                            cardUnsub = subscribe((val) => {
                                pre.textContent = JSON.stringify(val, null, 2);
                            });
                        } else {
                            try {
                                const data = getData();
                                pre.textContent = JSON.stringify(data, null, 2);
                            } catch (e) {
                                pre.textContent = `Error: ${e}`;
                            }
                        }
                    } else {
                        if (cardUnsub) {
                            cardUnsub();
                            cardUnsub = null;
                        }
                        pre.textContent = 'Paused (Collapsed)';
                    }
                }
            });

            card.appendChild(pre);
            listContainer.appendChild(card);

            // If filter is active, the defaultExpanded handles it, but we need to trigger the initial load if it's expanded
            if (filter) {
                // Since defaultExpanded: true, we need to mimic the 'true' branch of onExpandChange
                setTimeout(() => {
                    if (subscribe) {
                        cardUnsub = subscribe((val) => {
                            pre.textContent = JSON.stringify(val, null, 2);
                        });
                    } else {
                        pre.textContent = JSON.stringify(getData(), null, 2);
                    }
                }, 0);
            }
        };

        // --- MGData Section ---
        CATEGORIES.MGData.forEach(key => {
            createDataCard(key, 'Game Data (MGData)', () => MGData.get(key as any));
        });

        // --- Globals Section ---
        CATEGORIES.Globals.forEach(key => {
            const global = (Globals as any)[key];
            if (!global) return;
            createDataCard(key, 'Reactive Global', () => global.get(), (cb) => global.subscribe?.(cb) || (() => { }));
        });

        // --- Atoms Section ---
        CATEGORIES.Atoms.forEach(atomName => {
            createDataCard(atomName, 'Jotai Atom', () => null, (cb) => {
                let unsubbed = false;
                let innerUnsub: (() => void) | null = null;
                Gemini.Store.subscribeImmediate(atomName, (val) => {
                    if (!unsubbed) cb(val);
                }).then(u => {
                    if (unsubbed) u();
                    else innerUnsub = u;
                });
                return () => { unsubbed = true; innerUnsub?.(); };
            });
        });

        if (listContainer.children.length === 0) {
            listContainer.innerHTML = '<div style="text-align:center; padding: 40px; opacity: 0.5;">No matches found for "' + filter + '"</div>';
        }
    };

    // Initial render
    renderList();

    // Cleanup when component is removed
    (container as any).destroy = () => {
        activeSubscriptions.forEach(unsub => unsub());
    };

    return container;
}
