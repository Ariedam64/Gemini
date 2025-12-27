import type Environment from '@/common/Environment';
import type { RenderableName, Renderables } from './prop-types';

const McRasterUrls: Record<Environment, string> = {
  Local: 'http://localhost:3456',
  Preview: 'https://mcraster.magiccircle.gg',
  Production: 'https://mcraster.magiccircle.gg',
};

export function buildRenderUrl<Name extends RenderableName>(
  name: Name,
  props: Renderables[Name],
  environment: Environment,
  urlBase?: string
) {
  const url = new URL(`${name}.png`, urlBase ?? McRasterUrls[environment]);
  url.searchParams.set('props', JSON.stringify(props));
  return url.toString();
}
