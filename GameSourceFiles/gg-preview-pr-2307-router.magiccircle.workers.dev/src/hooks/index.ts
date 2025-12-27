import { type Atom, useAtomValue } from 'jotai';
import { selectAtom } from 'jotai/utils';
import identity from 'lodash/identity';
import isEqual from 'lodash/isEqual';
import { useCallback, useContext, useRef } from 'react';
import { dataAtomFamily } from 'src/store/data-atom';
import type { RoomData } from '@/common/games/Room/types';
import type { IState } from '@/common/types/state';
import { findScopeInStateChain } from '@/common/utils';
import { stateAtom, useGameState } from '@/store/store';
import { ScopesContext } from './ScopesContext';

/**
 * Returns the current scopes as determined based on the first time the hook is
 * run. If scopes change later, useScopes will not return a different value.
 * Usually, this is the behavior you want. This is because most components do
 * not expect scopes to change out from under them after they're rendered, e.g.
 * due to routers changing things above them.
 * However, if you do really want to react to changes in the scope context (e.g.
 * McChakraProvider), use useDynamicScopes instead.
 *
 * @returns {string[]} The initial scopes when the hook was first run.
 * @throws {Error} When useScopes() is used outside of a ScopeContext.
 */
export function useScopes(): string[] {
  const scopesContext = useContext(ScopesContext);
  const scopesRef = useRef(scopesContext);
  const initialScopes = scopesRef.current;
  if (initialScopes.length === 0) {
    throw new Error('useScopes() must be used within a ScopeContext');
  }
  return initialScopes;
}

/**
 * Returns the dynamic scopes as determined based on the current context.
 * Unlike useScopes, useDynamicScopes will return a different value if scopes change later.
 * This is useful when you want to react to changes in the scope context.
 *
 * @returns {string[]} The current scopes based on the context.
 * @throws {Error} When useDynamicScopes() is used outside of a ScopeContext.
 */
export function useDynamicScopes(): string[] {
  const scopesContext = useContext(ScopesContext);
  if (scopesContext.length === 0) {
    throw new Error('useScopes() must be used within a ScopeContext');
  }
  return scopesContext;
}

/**
 * Returns the full chain of scopes regardless where the hook is called.
 * Unlike useScopes that gives you a list of scopes based on the context of the component it's called in,
 * useFullScopes will give you the full list of scopes in the state chain.
 *
 * @returns {string[]} The full list of scopes in the state chain.
 */
export function useFullScopes(): string[] {
  let state: IState<unknown> | null = useGameState();
  const scopes = [];
  while (state) {
    scopes.push(state.scope);
    state = state.child;
  }
  return scopes;
}

/**
 * Returns the scope name of the child of the current IState.
 *
 * @returns {string} The scope name of the child of the current IState.
 */
export function useChildScopeName(): string | undefined {
  const scopes = useScopes();

  const selector = useCallback(
    (state: IState<unknown>) => {
      const child = findScopeInStateChain(state, scopes)?.child;
      return child?.scope;
    },
    [scopes]
  );

  const childNameAtom = selectAtom(stateAtom, selector);
  const childName = useAtomValue(childNameAtom);
  return childName;
}

/**
 * useData "magically" returns the data associated with the IState for the
 * current scope.
 *
 * We say it's "magic" because:
 * 1) It will automatically update the data when the data changes
 * 2) You don't need to pass in the scope; it is determined automatically
 * based on the scope hierarchy **at the time of the first render**.
 *
 * You can also pass in a selector function to select a slice of the data.
 * This is useful as a performance optimization over useData, as it
 * will only re-render when the selected slice of data changes.
 *
 * @example
 * const selectedData = useData((data: GameData) => data.selected);
 * // In this case, selectedData will only re-render when data.selected changes.
 * // This is useful if data is a large object and you only want to re-render
 * // when a small part of it changes.
 *
 * @example
 * // You can use any selector function you want, not just one that selects a
 * // single slice of data. For example, you could use a selectorFn that
 * // computes a boolean based on the data, and then use useData to only re-render when
 * // that boolean changes.
 * const isUnanimous = useData((data: GameData) => data.votes.every(vote => vote === 'aye'));
 *
 * Don't do this:
 * const counter = useData<GameData>().counter;
 *
 * While this works, it will cause the component to re-render every time
 * ANY part of GameData changes, even if it's not the counter.
 *
 * Instead, do this (pass a selector):
 * const counter = useData((data: GameData) => data.counter);
 *
 * Note that, if you pass a selector, you need to explicitly type the data
 * parameter to the selector function, but you're then free to omit the type
 * parameter to useData.
 *
 * @param {string[]} customScopes - If you want to use a different scope than the current
 * one, you can pass it here. ex: ['Room', 'Avocado', '10_ReadyScreen']
 * @returns {Slice} The slice of data selected by the selector function.
 */
export function useData<Data, Slice = Data>(
  selector: (data: Data) => Slice = identity,
  customScopes?: string[]
): Slice {
  const scopes = useScopes();
  const dataAtom = dataAtomFamily(customScopes ?? scopes) as Atom<Data>;

  const cachedSelector = useCallback(selector, []);
  const selectedAtom = selectAtom<Data, Slice>(
    dataAtom,
    cachedSelector,
    isEqual
  );
  return useAtomValue(selectedAtom);
}

export function useRoomData<Data, Slice = Data>(
  selector: (data: RoomData) => Slice = identity
) {
  return useData(selector, ['Room']);
}

export { useSendMessage, useSendRoomMessage } from '@/connection/hooks';
export { useSendFeedback } from './feedback';
