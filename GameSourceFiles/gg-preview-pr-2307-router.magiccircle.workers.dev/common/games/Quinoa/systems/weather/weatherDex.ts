import { WeatherId } from './WeatherId';
import { WeatherBlueprint } from './weather-blueprints';

export const weatherDex = {
  Rain: {
    durationMinutes: 5,
    type: 'primary',
    iconSpriteKey: 'sprite/ui/RainIcon',
    name: 'Rain',
    mutator: {
      mutation: 'Wet',
      chancePerMinutePerCrop: 7, // ~30% chance in 5 minutes
    },
    randomTimeSlots: {
      minFrequencyMinutes: 20,
      maxFrequencyMinutes: 35,
    },
    possibleEvolutions: [
      {
        weatherId: WeatherId.Frost,
        chance: 0.25,
      },
    ],
  },
  Frost: {
    type: 'secondary',
    iconSpriteKey: 'sprite/ui/FrostIcon',
    name: 'Frost',
    mutator: {
      mutation: 'Chilled',
      chancePerMinutePerCrop: 7, // ~30% chance in 5 minutes
    },
  },
  Dawn: {
    durationMinutes: 10,
    type: 'primary',
    name: 'Dawn',
    iconSpriteKey: 'sprite/ui/DawnIcon',
    mutator: {
      mutation: 'Dawnlit',
      chancePerMinutePerCrop: 1, // ~10% chance in 10 minutes
    },
    fixedTimeSlots: [0, 48, 96, 144, 192, 240], // midnight, 4am, 8am, noon, 4pm, 8pm
    possibleEvolutions: [
      {
        weatherId: WeatherId.AmberMoon,
        chance: 0.33,
      },
    ],
  },
  AmberMoon: {
    type: 'secondary',
    name: 'Amber Moon',
    iconSpriteKey: 'sprite/ui/AmberMoonIcon',
    mutator: {
      mutation: 'Ambershine',
      chancePerMinutePerCrop: 1, // ~10% chance in 10 minutes
    },
  },
} as const satisfies Record<WeatherId, WeatherBlueprint>;
