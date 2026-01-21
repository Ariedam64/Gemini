/**
 * Pet Card - Pet hunger alert configuration
 */

import { Card } from '../../../../components/Card/Card';
import { Label } from '../../../../components/Label/Label';
import { Switch } from '../../../../components/Switch/Switch';
import { element } from '../../../../styles/helpers';
import { MGPetHungerNotifier } from '../../../../../features/petHungerNotifier';
/**
 * Public handle for the pet card part
 */
export interface PetCardPart {
  root: HTMLElement;
  destroy(): void;
}

/**
 * Options for the pet card
 */
export interface PetCardOptions {
  defaultExpanded?: boolean;
  onExpandChange?: (expanded: boolean) => void;
}

/**
 * Create the pet card part
 */
export function createPetCard(options?: PetCardOptions): PetCardPart {
  let root: HTMLElement | null = null;
  let switchHandle: ReturnType<typeof Switch> | null = null;

  function buildCard(): HTMLElement {
    const body = element('div', { className: 'pet-card-body' });

    // Label with switch (same design as Settings > In-Game Enhancements)
    const labelContainer = element('div', { className: 'pet-card-row' });

    const label = Label({
      text: 'Hunger alert',
      hint: 'Notifies when active pets drop below 5% hunger',
      variant: 'text',
    });

    switchHandle = Switch({
      checked: MGPetHungerNotifier.isEnabled(),
      onChange: (checked) => {
        MGPetHungerNotifier.setEnabled(checked);
      },
    });

    labelContainer.appendChild(label.root);
    labelContainer.appendChild(switchHandle.root);
    body.appendChild(labelContainer);

    root = Card(
      {
        id: 'pet-hunger-card',
        title: 'Pet events',
        subtitle: 'Get notified about pet-related events',
        expandable: true,
        defaultExpanded: options?.defaultExpanded ?? true,
        stateKey: 'pet',
        variant: 'soft',
        padding: 'sm',
        divider: false,
        onExpandChange: options?.onExpandChange,
      },
      body
    );

    return root;
  }

  function destroy(): void {
    if (switchHandle) {
      switchHandle.destroy();
      switchHandle = null;
    }
    root = null;
  }

  return {
    root: buildCard(),
    destroy,
  };
}
