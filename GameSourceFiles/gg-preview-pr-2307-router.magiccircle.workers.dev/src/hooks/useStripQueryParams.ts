import { useCallback } from 'react';
import { usePlayerId, useQueryParameters } from '@/store/store';

/**
 * Removes query parameters from the current URL to prettify it.
 * Note: It keeps a copy of the queryParams that were there,
 * in case you need to use them later, in queryParametersAtom.
 * See: store.ts for more details.
 */
function stripQueryParams() {
  window.history.replaceState({}, document.title, window.location.pathname);
}

function useStripQueryParams() {
  const queryParams = useQueryParameters();
  const playerId = usePlayerId();

  const handleStripQueryParams = useCallback(() => {
    stripQueryParams();
  }, [queryParams, playerId]);

  return handleStripQueryParams;
}

export default useStripQueryParams;
