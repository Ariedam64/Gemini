import { Trans } from '@lingui/react/macro';
import { type ToolId, toolsDex } from '@/common/games/Quinoa/systems/tools';
import MutationText from '@/Quinoa/components/MutationText';

export const getToolDescription = (toolId: ToolId): React.ReactNode => {
  const blueprint = toolsDex[toolId];
  switch (toolId) {
    case 'WateringCan':
      return <Trans>Speeds up growth of plant by 5 minutes. SINGLE USE.</Trans>;

    case 'PlanterPot':
      return (
        <Trans>
          Extract a plant to your inventory (can be replanted). SINGLE USE.
        </Trans>
      );

    case 'Shovel':
      return (
        <Trans>Remove plants and decor from your garden. UNLIMITED USES.</Trans>
      );
    case 'WetPotion':
    case 'ChilledPotion':
    case 'FrozenPotion':
    case 'DawnlitPotion':
    case 'AmberlitPotion':
    case 'GoldPotion':
    case 'RainbowPotion':
      {
        if ('grantedMutation' in blueprint) {
          return (
            <Trans>
              Adds the <MutationText mutationId={blueprint.grantedMutation} />{' '}
              mutation to a crop in your garden. SINGLE USE.
            </Trans>
          );
        } else {
          console.error(`Tool ${toolId} has no granted mutation`);
        }
      }
      break;
    default: {
      const _exhaustiveCheck: never = toolId;
      return _exhaustiveCheck;
    }
  }
};
