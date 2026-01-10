import { WeatherId } from '@/common/games/Quinoa/systems/weather';
import { mutationColors } from '@/Quinoa/constants/colors';

/**
 * Maps WeatherId to its corresponding mutation color for ability borders.
 * Returns the mutation color that should be used as a border when an ability
 * requires specific weather and that weather is active.
 */
export function getWeatherBorderColor(weatherId: WeatherId): string {
  switch (weatherId) {
    case WeatherId.Rain:
      return mutationColors.Wet;
    case WeatherId.Frost:
      return mutationColors.Frozen;
    case WeatherId.Dawn:
      return mutationColors.Dawnlit;
    case WeatherId.AmberMoon:
      return mutationColors.Ambershine;
    default: {
      const exhaustiveCheck: never = weatherId;
      return exhaustiveCheck;
    }
  }
}
