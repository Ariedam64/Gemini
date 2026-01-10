export const getIsPlaywrightTestClient = (): boolean => {
  const userAgent = navigator.userAgent;
  // See test/playwright.config.ts userAgent setting
  if (userAgent.toLowerCase().includes('mc-playwright-test')) {
    return true;
  }
  return false;
};
