import { useContext } from 'react';
import { ScopesContext } from '@/hooks/ScopesContext';

/**
 * The Scope component allows you to define a new "scope" that will be
 * made available to its children through the ScopesContext.
 *
 * @param props The props for the Scope component.
 * @example
 * <Scope scope="_1_Avocado">
 *   <Component />
 * </Scope>
 */
function Scope(props: { children: React.ReactNode; scope: string }) {
  const { children, scope } = props;
  const parentScopes = useContext(ScopesContext);

  // Create the full scope, including all parent scopes.
  const scopes = parentScopes ? [...parentScopes, scope] : [scope];

  // Provide the new scope to child components.
  return (
    <ScopesContext.Provider value={scopes}>{children}</ScopesContext.Provider>
  );
}

export default Scope;
