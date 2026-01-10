export function debugLogger(isActive: boolean) {
  return (...args: unknown[]) => {
    if (isActive) {
      console.log('DEBUG LOG: ', ...args);
    }
  };
}
