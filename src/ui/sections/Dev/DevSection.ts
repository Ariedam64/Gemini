import { BaseSection } from '../core/Section';
import { element } from '../../styles/helpers';
import { createNavTabs } from '../../components/NavTabs/NavTabs';
import { AtomInspector } from './AtomInspector';
import { WSLogger } from './WSLogger';
import { UIGallery } from './UIGallery';
import { PixiInspector } from './PixiInspector';
// Per .claude/rules/core.md: use unified storage wrapper
import { storageGet, storageSet, DEV_KEYS } from '../../../utils/storage';
import { isAllDataCaptured, tryCapture } from '../../../modules/core/data';
import { pageWindow } from '../../../utils/windowContext';

export class DevSection extends BaseSection {
    constructor() {
        super({ id: 'dev', label: 'DEV' });
    }

    protected build(container: HTMLElement): void {
        // Inject themed scrollbar styles (matching AutoFavorite)
        const styleId = 'gemini-dev-section-styles';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = `
                /* Dev Section themed scrollbars */
                .gemini-dev-section *::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                }
                .gemini-dev-section *::-webkit-scrollbar-track {
                    background: transparent;
                }
                .gemini-dev-section *::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.15);
                    border-radius: 3px;
                    transition: background 0.2s;
                }
                .gemini-dev-section *::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.25);
                }
                .gemini-dev-section *::-webkit-scrollbar-corner {
                    background: transparent;
                }
                /* Smooth scrolling for all containers */
                .gemini-dev-section .atom-inspector,
                .gemini-dev-section .pixi-inspector,
                .gemini-dev-section .ws-logger,
                .gemini-dev-section .ui-gallery {
                    scroll-behavior: smooth;
                }
            `;
            document.head.appendChild(style);
        }

        const devWrapper = element('div', {
            className: 'gemini-dev-section',
            style: 'height: 100%; display: flex; flex-direction: column;'
        });


        // Sync & Reload Controls
        const syncBar = element('div', {
            style: 'padding: 6px 12px; background: rgba(0,0,0,0.3); border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; font-size: 11px;'
        });

        const isAutoReloadSet = storageGet<boolean>(DEV_KEYS.AUTO_RELOAD, true);

        const syncLeft = element('div', { style: 'display: flex; align-items: center; gap: 12px;' });
        const autoReloadToggle = element('input', { type: 'checkbox', checked: isAutoReloadSet });
        const autoReloadLabel = element('label', { style: 'display: flex; align-items: center; gap: 4px; cursor: pointer;' });
        autoReloadLabel.appendChild(autoReloadToggle);
        autoReloadLabel.appendChild(document.createTextNode('Auto-Reload on Save'));
        syncLeft.appendChild(autoReloadLabel);

        const syncRight = element('div', { style: 'display: flex; align-items: center; gap: 8px;' });
        const reloadBtn = element('button', {
            textContent: 'Reload Script',
            style: 'background: var(--color-primary); color: #fff; border: none; padding: 3px 8px; border-radius: 4px; cursor: pointer; font-weight: bold; display: none;'
        });
        const statusText = element('span', { textContent: 'Vite Connected', style: 'opacity: 0.5;' });
        syncRight.appendChild(statusText);
        syncRight.appendChild(reloadBtn);

        syncBar.appendChild(syncLeft);
        syncBar.appendChild(syncRight);

        // HMR Logic
        if ((import.meta as any).hot) {
            const hot = (import.meta as any).hot;

            // Send initial state to server
            hot.send('gemini:toggle-manual-hmr', { enabled: !autoReloadToggle.checked });

            // Initialize button visibility based on saved preference
            if (!isAutoReloadSet) {
                reloadBtn.style.display = 'block';
                statusText.textContent = 'Manual Reload Mode';
            }

            hot.on('gemini:update-pending', () => {
                statusText.textContent = 'Update Pending...';
                statusText.style.color = 'var(--color-warning)';
                reloadBtn.style.boxShadow = '0 0 10px var(--color-primary)';
            });

            autoReloadToggle.onchange = () => {
                const enabled = autoReloadToggle.checked;
                storageSet(DEV_KEYS.AUTO_RELOAD, enabled);
                hot.send('gemini:toggle-manual-hmr', { enabled: !enabled });

                // Show/hide button based ONLY on toggle state
                reloadBtn.style.display = enabled ? 'none' : 'block';
                if (enabled) {
                    statusText.textContent = 'Vite Connected';
                    statusText.style.color = '';
                } else {
                    statusText.textContent = 'Manual Reload Mode';
                }
            };

            reloadBtn.onclick = () => {
                hot.send('gemini:force-reload');
            };
        }

        const contentArea = element('div', {
            style: 'flex: 1; min-height: 0; display: flex; flex-direction: column; padding: 12px; overflow: hidden;'
        });

        const tabs = [
            { id: 'atoms', label: 'Atoms', content: AtomInspector() },
            { id: 'ws', label: 'WS Trace', content: WSLogger() },
            { id: 'pixi', label: 'Pixi Tools', content: PixiInspector() },
            { id: 'ui', label: 'UI Gallery', content: UIGallery() }
        ];

        const nav = createNavTabs(
            tabs.map(t => ({ id: t.id, label: t.label })),
            'atoms',
            (id) => {
                contentArea.innerHTML = '';
                const tab = tabs.find(t => t.id === id);
                if (tab) contentArea.appendChild(tab.content);
            }
        );

        devWrapper.appendChild(syncBar);
        devWrapper.appendChild(nav.root);
        devWrapper.appendChild(contentArea);

        // Initial content
        contentArea.appendChild(tabs[0].content);

        container.appendChild(devWrapper);
    }
}
