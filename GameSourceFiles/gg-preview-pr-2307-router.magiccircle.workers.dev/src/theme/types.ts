import {
  Pseudos,
  StyleFunctionProps,
  StyleProps,
  createMultiStyleConfigHelpers,
  defineStyleConfig,
} from '@chakra-ui/styled-system';

type Styles = StyleProps | PseudoProps;
export type PseudoProps = {
  [K in keyof Pseudos]?: Styles;
};

type Dict<T> = Record<string, T>;

/**
 * This function enhances the typesafety of Chakra's component theming. It
 * ensures that autocomplete for CSS values works against both custom values
 * defined in RoomTheme and general CSS values.
 *
 * This is intended as a drop-in replacement for Chakra's defineStyleConfig.
 */
export function defineSafeStyleConfig(
  config: Parameters<
    typeof defineStyleConfig<Styles, Dict<Styles>, Dict<Styles>>
  >[0]
) {
  return defineStyleConfig<Styles, Dict<Styles>, Dict<Styles>>(config);
}

type Anatomy = { keys: string[] };

type PartsStyleObject<Parts extends Anatomy = Anatomy> = Partial<
  Record<Parts['keys'][number], Styles>
>;

type PartsStyleFunction<Parts extends Anatomy = Anatomy> = (
  props: StyleFunctionProps
) => PartsStyleObject<Parts>;

type PartsStyleInterpolation<Parts extends Anatomy = Anatomy> =
  | PartsStyleObject<Parts>
  | PartsStyleFunction<Parts>;

/**
 * This function creates helper functions for multi-style configuration with
 * enhanced typesafety. It ensures that autocomplete for CSS values works
 * against both custom values defined in RoomTheme and general CSS values.
 *
 * This is intended as a drop-in replacement for Chakra's createMultiStyleConfigHelpers.
 */
export function createSafeMultiStyleConfigHelpers<Part extends string>(
  parts: Part[]
) {
  const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers<Part>(parts);

  const defineSafePartsStyle = definePartsStyle<
    PartsStyleInterpolation<{ keys: Part[] }>
  >;

  const defineSafeMultiStyleConfig = defineMultiStyleConfig<
    PartsStyleInterpolation<{ keys: Part[] }>,
    Dict<PartsStyleInterpolation<{ keys: Part[] }>>,
    Dict<PartsStyleInterpolation<{ keys: Part[] }>>
  >;

  return { defineSafePartsStyle, defineSafeMultiStyleConfig };
}

/**
 * `ChakraColor` is a type derived from the 'color' property of `StyleProps`. By
 * using extract, we include only those values which are compatible with
 * `string`.
 * This lets us get typesafe theme colors like "MagicBlack" and "MagicWhite".
 */
export type ChakraColor = Extract<StyleProps['color'], string>;
