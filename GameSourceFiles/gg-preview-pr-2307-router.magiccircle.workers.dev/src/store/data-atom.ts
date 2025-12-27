import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { isEqual } from 'lodash';
import type { IState } from '@/common/types/state';
import { findScopeInStateChain } from '@/common/utils';
import { stateAtom } from './store';

/**
 * Creates an atom that gets the `data` from state in the state chain.
 * We built this because when we replace state (ie change from Lobby to Avocado),
 * components that rely on the old state will sometimes re-render before dismounting.
 * However, their data is no longer in the state, so they throw errors.
 * This atom will return the data from the old state until the component dismounts.
 * @param scope The name of the state to get
 * @param defaultData The default data to return if the state is not found
 * @returns An atom that returns the data from the state
 */
function createDataAtom<T>(scopes: string[]) {
  let dataCache: T;

  const dataAtom = atom<T>((get) => {
    const state: IState<unknown> | null = findScopeInStateChain(
      get(stateAtom),
      scopes
    );

    if (state) {
      dataCache = { ...(state.data as T) };
    }

    if (!dataCache) {
      throw new Error(
        `createDataAtom Error: State for '${scopes.join('.')}' not found`
      );
    }

    return dataCache;
  });
  dataAtom.debugLabel = `dataAtom: ${scopes.join('.')}`;
  return dataAtom;
}

/**
 * Generates cached atoms based on the scopes passed in.
 * If the same list of scopes is passed in, the same atom will be returned.
 * @param scopes An array of scope names to get the data from
 * @returns An atom family that returns a dataAtom
 */
export const dataAtomFamily = atomFamily((scopes: string[]) => {
  return createDataAtom(scopes);
}, isEqual);
