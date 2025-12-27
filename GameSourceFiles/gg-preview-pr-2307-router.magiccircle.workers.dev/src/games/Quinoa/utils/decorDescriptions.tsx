import { Trans } from '@lingui/react/macro';
import type { DecorId } from '@/common/games/Quinoa/systems/decor';
import { petHutchInventoryLimit } from '@/common/games/Quinoa/utils/inventory';

export const getDecorDescription = (decorId: DecorId): React.ReactNode => {
  if (decorId === 'PetHutch') {
    return (
      <Trans>
        Stores up to {petHutchInventoryLimit} pets and can be placed in your
        garden.
      </Trans>
    );
  }
  return null;
};
