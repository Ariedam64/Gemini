import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { useConfig } from '@/config';
import Presentables from '@/presentables/Presentables';
import { arePresentablesEnabledAtom } from '@/Quinoa/atoms/taskAtoms';

// Delay before showing presentables after tutorial completion
// We hide presentables for players currently in the tutorial, and upon tutorial completion,
// we don't want to immediately render the presentables
const NEW_PLAYER_DELAY = 6 * 1000; // 6 seconds
// We still have a small delay for existing players to allow any streak increased animations to complete
const EXISTING_PLAYER_DELAY = 2 * 1000; // 1 second
// Note: this allows us to only render the presentables if the user has loaded
// their quinoa slot. This makes it possible for e.g. the news server-side
// endpoints to be able to assume that a user's quinoa data has been migrated so
// they can parse their user data json.
const HACKYPresentables: React.FC = () => {
  const arePresentablesEnabled = useAtomValue(arePresentablesEnabledAtom);
  const forceShowPresentables = useConfig().root_forceShowPresentables;
  const [shouldShowPresentables, setShouldShowPresentables] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (!hasInitialized) {
      // On first render, if presentables are already enabled, show them immediately
      if (arePresentablesEnabled) {
        timeout = setTimeout(() => {
          setShouldShowPresentables(true);
        }, EXISTING_PLAYER_DELAY);
      }
      setHasInitialized(true);
    } else if (arePresentablesEnabled && !shouldShowPresentables) {
      timeout = setTimeout(() => {
        setShouldShowPresentables(true);
      }, NEW_PLAYER_DELAY);
      return () => clearTimeout(timeout);
    }
  }, [arePresentablesEnabled, shouldShowPresentables, hasInitialized]);

  if (!shouldShowPresentables && !forceShowPresentables) {
    return null;
  }
  return <Presentables />;
};

export default HACKYPresentables;
