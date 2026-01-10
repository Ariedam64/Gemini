import { sendQuinoaMessage } from '@/games/Quinoa/utils/sendQuinoaMessage';

export function checkWeatherStatus() {
  sendQuinoaMessage({
    type: 'CheckWeatherStatus',
  });
}
