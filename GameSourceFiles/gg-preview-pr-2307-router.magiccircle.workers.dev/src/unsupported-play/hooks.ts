import { atom, getDefaultStore, useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { isRunningInsideDiscord } from '@/environment';
import { isDiscordHardwareAccelerationEnabledAtom } from '@/store/store';
import { checkWebGLSupport } from '@/utils/webgl-support';
import { probeWebpSupportAsync } from '@/utils/webp-support';

const { sub, get, set } = getDefaultStore();

export type UnsupportedReason = 'webp' | 'webgl' | 'hardware_acceleration';

export const unsupportedReasonAtom = atom<UnsupportedReason | null | undefined>(
  undefined
);

export const useUnsupportedReason = () => {
  return useAtomValue(unsupportedReasonAtom);
};

const setUnsupportedReason = (reason: UnsupportedReason | null) => {
  set(unsupportedReasonAtom, reason);
};

const checkWebSupport = () => {
  // Check WebGL support first (synchronous)
  const isWebGLSupported = checkWebGLSupport();
  if (!isWebGLSupported) {
    setUnsupportedReason('webgl');
    return;
  }
  // Then check WebP support (asynchronous)
  probeWebpSupportAsync(['lossy', 'alpha'])
    .then((isSupported) => {
      setUnsupportedReason(isSupported ? null : 'webp');
    })
    .catch((e) => {
      console.error('Error checking WebP support', e);
      setUnsupportedReason('webp');
    });
};

// For Discord: check for hardware acceleration first, then web support
const checkHardwareAccelerationThenWebSupport = () => {
  const isHardwareAccelerationEnabled = get(
    isDiscordHardwareAccelerationEnabledAtom
  );
  if (isHardwareAccelerationEnabled === null) {
    return;
  }
  if (!isHardwareAccelerationEnabled) {
    setUnsupportedReason('hardware_acceleration');
    return;
  }
  checkWebSupport();
};

export const useUnsupportedReasonEffects = () => {
  useEffect(() => {
    if (!isRunningInsideDiscord) {
      // For non-Discord: immediately check browser capabilities
      checkWebSupport();
      return;
    }
    const unsubscribe = sub(
      isDiscordHardwareAccelerationEnabledAtom,
      checkHardwareAccelerationThenWebSupport
    );
    return unsubscribe;
  }, [isRunningInsideDiscord]);
};
