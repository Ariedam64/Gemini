import { element } from '../../styles/helpers';
import { Badge } from '../../components/Badge/Badge';
import { Button } from '../../components/Button/Button';
import { Switch } from '../../components/Switch/Switch';
import { Input } from '../../components/Input/Input';
import { Select } from '../../components/Select/Select';
import { Slider } from '../../components/Slider/Slider';
import { Range as UIRange } from '../../components/Range/Range';
import { Label } from '../../components/Label/Label';
import { Divider } from '../../components/Divider/Divider';
import { StatRow } from '../../components/StatRow/StatRow';
import { Card } from '../../components/Card/Card';
import { MGSprite } from '../../../modules/sprite';

export type ComponentItemType = 'Badge' | 'Button' | 'Switch' | 'Input' | 'Select' | 'Slider' | 'Range' | 'Label' | 'Divider' | 'StatRow' | 'Card' | 'Sprite';

export interface ComponentItem {
    id: string;
    type: ComponentItemType;
    label: string;
    config: Record<string, any>;
}

export interface ComponentPaletteOptions {
    onDragStart?: (item: ComponentItem, e: DragEvent) => void;
    onItemClick?: (item: ComponentItem) => void;
}

const AVAILABLE_COMPONENTS: ComponentItem[] = [
    // Badges
    { id: 'badge-success', type: 'Badge', label: 'Success Badge', config: { label: 'SUCCESS', type: 'success' } },
    { id: 'badge-warning', type: 'Badge', label: 'Warning Badge', config: { label: 'WARNING', type: 'warning' } },
    { id: 'badge-danger', type: 'Badge', label: 'Danger Badge', config: { label: 'DANGER', type: 'danger' } },
    { id: 'badge-info', type: 'Badge', label: 'Info Badge', config: { label: 'INFO', type: 'info' } },
    { id: 'badge-primary', type: 'Badge', label: 'Primary Badge', config: { label: 'NEW', type: 'primary' } },

    // Buttons
    { id: 'button-primary', type: 'Button', label: 'Primary Button', config: { label: 'Action', variant: 'primary', size: 'sm' } },
    { id: 'button-danger', type: 'Button', label: 'Danger Button', config: { label: 'Delete', variant: 'danger', size: 'sm' } },
    { id: 'button-default', type: 'Button', label: 'Default Button', config: { label: 'Cancel', variant: 'default', size: 'sm' } },

    // Inputs
    { id: 'switch-default', type: 'Switch', label: 'Toggle Switch', config: { label: 'Enabled', checked: false } },
    { id: 'input-text', type: 'Input', label: 'Text Input', config: { placeholder: 'Enter text...', value: '' } },
    { id: 'input-number', type: 'Input', label: 'Number Input', config: { placeholder: '0', mode: 'digits' } },

    // Selects & Sliders
    { id: 'select-basic', type: 'Select', label: 'Dropdown', config: { options: [{ value: 'a', label: 'Option A' }, { value: 'b', label: 'Option B' }], value: 'a' } },
    { id: 'slider-basic', type: 'Slider', label: 'Slider', config: { min: 0, max: 100, value: 50 } },
    { id: 'range-basic', type: 'Range', label: 'Range Slider', config: { label: 'Range', min: 0, max: 100, value: 50 } },

    // Static Elements
    { id: 'label-default', type: 'Label', label: 'Label', config: { text: 'Label Text', size: 'md' } },
    { id: 'divider-default', type: 'Divider', label: 'Divider', config: {} },
    { id: 'statrow-basic', type: 'StatRow', label: 'Stat Row', config: { label: 'Coins', value: '1,234' } },

    // Card
    { id: 'card-nested', type: 'Card', label: 'Nested Card', config: { title: 'Nested', padding: 'sm', variant: 'soft' } },

    // Sprite (placeholder - opens picker in Card Builder)
    { id: 'sprite-generic', type: 'Sprite', label: 'Sprite', config: { category: null, assetId: null } },
];

export function createComponent(item: ComponentItem): HTMLElement | null {
    try {
        switch (item.type) {
            case 'Badge': {
                const badge = Badge(item.config as any);
                return badge.root;
            }
            case 'Button': {
                return Button(item.config as any);
            }
            case 'Switch': {
                const sw = Switch(item.config as any);
                return sw.root;
            }
            case 'Input': {
                const input = Input(item.config as any);
                return input.root;
            }
            case 'Select': {
                const select = Select(item.config as any);
                return select.root;
            }
            case 'Slider': {
                const slider = Slider(item.config as any);
                return slider.root;
            }
            case 'Range': {
                const range = UIRange(item.config as any);
                return (range as any).root ?? range;
            }
            case 'Label': {
                const label = Label(item.config as any);
                return (label as any).root ?? label;
            }
            case 'Divider': {
                const div = Divider(item.config as any);
                return (div as any).root ?? div;
            }
            case 'StatRow': {
                const sr = StatRow(item.config as any);
                return (sr as any).root ?? sr;
            }
            case 'Card': {
                const card = Card(item.config as any);
                card.appendChild(element('div', { textContent: 'Nested content', style: 'font-size: 11px; opacity: 0.7;' }));
                return card;
            }
            case 'Sprite': {
                // Only render if sprite system is ready AND we have valid config
                if (item.config.category && item.config.assetId && MGSprite.isReady()) {
                    try {
                        const canvas = MGSprite.toCanvas(item.config.category, item.config.assetId, {
                            mutations: item.config.mutations || [],
                            scale: 1.5
                        });
                        canvas.style.imageRendering = 'pixelated';
                        return canvas;
                    } catch {
                        // Fall through to placeholder
                    }
                }
                // Placeholder for unselected or unavailable sprites
                return element('div', {
                    textContent: '🌱',
                    style: 'font-size: 24px; opacity: 0.5; display: flex; align-items: center; justify-content: center;'
                });
            }
            default:
                return null;
        }
    } catch (e) {
        console.warn('[Gemini] ComponentPalette: Failed to create', item.type, e);
        return element('div', { textContent: 'Error', style: 'color: var(--color-danger);' });
    }
}


export function ComponentPalette(opts: ComponentPaletteOptions = {}): HTMLElement {
    const container = element('div', {
        className: 'component-palette',
        style: 'display: grid; grid-template-columns: repeat(auto-fill, minmax(90px, 1fr)); gap: 8px;'
    });

    AVAILABLE_COMPONENTS.forEach(item => {
        const wrapper = element('div', {
            style: `
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 4px;
                padding: 8px;
                background: rgba(255,255,255,0.03);
                border-radius: 8px;
                cursor: grab;
                transition: background 0.2s, transform 0.1s;
                text-align: center;
                min-height: 60px;
                justify-content: center;
            `
        });
        wrapper.setAttribute('draggable', 'true');

        wrapper.onmouseenter = () => {
            wrapper.style.background = 'rgba(255,255,255,0.08)';
        };
        wrapper.onmouseleave = () => {
            wrapper.style.background = 'rgba(255,255,255,0.03)';
        };

        wrapper.ondragstart = (e: DragEvent) => {
            if (e.dataTransfer) {
                e.dataTransfer.setData('application/json', JSON.stringify(item));
                e.dataTransfer.effectAllowed = 'copy';
            }
            wrapper.style.opacity = '0.5';
            opts.onDragStart?.(item, e);
        };

        wrapper.ondragend = () => {
            wrapper.style.opacity = '1';
        };

        wrapper.onclick = () => {
            opts.onItemClick?.(item);
        };

        // Preview
        const preview = createComponent({ ...item, config: { ...item.config } });
        if (preview) {
            preview.style.pointerEvents = 'none';
            preview.style.transform = 'scale(0.85)';
            preview.style.maxWidth = '100%';
            preview.style.maxHeight = '40px';
            preview.style.overflow = 'hidden';
            wrapper.appendChild(preview);
        }

        // Label
        const label = element('small', {
            textContent: item.label,
            style: 'font-size: 9px; opacity: 0.6; line-height: 1.2;'
        });
        wrapper.appendChild(label);

        container.appendChild(wrapper);
    });

    return container;
}

