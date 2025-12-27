import type { Operation } from 'fast-json-patch';

/**
 * Represents a segment in a route path. Segments can be:
 * - A static string (e.g. "users")
 * - An object parameter (e.g. { param: "id" })
 *
 * Example:
 *   "/users/:id" -> ["users", { param: "id" }]
 */
type RouteSegment = string | { param: string };

/**
 * Matches a patch path against a pre-compiled pattern.
 *
 * @param segments - The path segments to match
 * @param compiledPattern - The pre-compiled route structure
 * @returns Object with extracted params (all values are numbers), or null if no match.
 */
function matchPatchPath(
  segments: readonly string[],
  compiledPattern: readonly RouteSegment[]
): Record<string, number> | null {
  if (segments.length < compiledPattern.length) {
    return null;
  }

  const params: Record<string, number> = {};

  for (let i = 0; i < compiledPattern.length; i++) {
    const routeSegment = compiledPattern[i];
    const pathSegment = segments[i];

    if (typeof routeSegment === 'string') {
      // Static segment
      if (routeSegment !== pathSegment) {
        return null;
      }
    } else {
      // Param segment
      const numValue = Number(pathSegment);
      if (Number.isNaN(numValue)) return null;
      params[routeSegment.param] = numValue;
    }
  }

  return params;
}

type RouteHandler<TContext> = (
  params: Record<string, number>,
  context: TContext,
  patch: Operation
) => void;

interface Route<TContext> {
  compiledPattern: RouteSegment[];
  exact: boolean;
  handler: RouteHandler<TContext>;
}

/**
 * A declarative router for JSON Patch operations.
 * Allows registering handlers for specific paths in the state tree.
 *
 * @example
 * const router = new PatchRouter<MyState>();
 *
 * // Handle exact path changes
 * router.on('users/:userId', { exact: true }, (params, patch, state) => {
 *   console.log('User replaced:', params.userId);
 * });
 *
 * // Handle nested changes (prefix matching)
 * router.on('users/:userId/inventory', { exact: false }, (params, patch) => {
 *   console.log('Inventory changed for user:', params.userId);
 * });
 */
export class PatchRouter<TContext = void> {
  private routes: Route<TContext>[] = [];

  /**
   * Register a route handler.
   *
   * @param path - Path pattern (e.g. 'users/:id')
   * @param options.exact - If true, only matches if path length is identical.
   *                        If false, matches any path starting with this pattern.
   * @param handler - Function called when a patch matches.
   */
  on(
    path: string,
    options: { exact: boolean },
    handler: RouteHandler<TContext>
  ): void {
    // Normalize path by removing leading slash and splitting
    const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
    const rawSegments = normalizedPath.split('/');

    // Pre-compile the pattern into static/param segments
    const compiledPattern: RouteSegment[] = rawSegments.map((segment) => {
      if (segment.startsWith(':')) {
        return { param: segment.slice(1) };
      }
      return segment;
    });

    this.routes.push({
      compiledPattern,
      exact: options.exact,
      handler,
    });
  }

  /**
   * Process a list of patches and dispatch to matching handlers.
   *
   * @param patches - The JSON patches to process
   * @param context - Optional context object (e.g. full state) passed to handlers
   */
  process(patches: Operation[], context: TContext): void {
    for (const patch of patches) {
      const pathString = patch.path.startsWith('/')
        ? patch.path.slice(1)
        : patch.path;
      const segments = pathString.split('/');

      for (const route of this.routes) {
        // 1. Exact match check
        if (route.exact && segments.length !== route.compiledPattern.length) {
          continue;
        }

        // 2. Pattern match check (using pre-compiled route)
        const params = matchPatchPath(segments, route.compiledPattern);
        if (params) {
          route.handler(params, context, patch);
        }
      }
    }
  }
}
