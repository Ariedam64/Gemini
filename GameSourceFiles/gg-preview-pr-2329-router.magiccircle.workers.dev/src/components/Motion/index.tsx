import {
  Box,
  type BoxProps,
  Flex,
  type FlexProps,
  Heading,
  type HeadingProps,
  Text,
  type TextProps,
} from '@chakra-ui/layout';
import {
  Button,
  type ButtonProps,
  Grid,
  type GridProps,
  Image,
  type ImageProps,
} from '@chakra-ui/react';
import {
  type ForwardRefComponent,
  type MotionProps,
  motion,
} from 'framer-motion';
import McFlex, { type McFlexProps } from '@/components/McFlex/McFlex';
import McGrid, { type McGridProps } from '@/components/McGrid/McGrid';

/**
 * Helper type to omit props that conflict between Chakra and Framer Motion.
 */
type OmitConflictingProps<T> = Omit<
  T,
  | 'backgroundImage'
  | 'transition'
  | 'style'
  | 'children'
  | 'onDrag'
  | 'onDragStart'
  | 'onDragEnd'
> &
  MotionProps;

/**
 * This file contains "motion-wrapped" Chakra components.
 * We need a bit of trickery to get the types to work correctly, but the result
 * should be typesafe.
 *
 * Note: if you find yourself experiencing a type issue with the "variants" prop,
 * you might just need to ensure the object you're passing is of type `Variants`.
 * From the horses mouth: https://github.com/framer/motion/issues/1557#issuecomment-1143330259
 */

/**
 * Motion-enabled Box component using Chakra UI's Box and Framer Motion.
 *
 * This component combines Chakra UI's Box with Framer Motion's animation capabilities,
 * allowing you to use motion props (such as `initial`, `animate`, `variants`, etc.)
 * alongside all standard BoxProps (except for conflicting props, which are omitted for compatibility).
 *
 * @see https://www.framer.com/motion/
 * @see https://chakra-ui.com/docs/components/box
 *
 * @param props - All BoxProps (except for conflicting props) and Framer Motion props.
 * @param ref - React ref forwarded to the underlying DOM element.
 */
export const MotionBox = motion.create(Box) as ForwardRefComponent<
  HTMLDivElement,
  OmitConflictingProps<BoxProps>
>;
export type MotionBoxProps = React.ComponentProps<typeof MotionBox>;

/**
 * Motion-enabled Heading component using Chakra UI's Heading and Framer Motion.
 *
 * This component combines Chakra UI's Heading with Framer Motion's animation capabilities,
 * allowing you to use motion props alongside all standard HeadingProps (except for conflicting props).
 */
export const MotionHeading = motion.create(Heading) as ForwardRefComponent<
  HTMLHeadingElement,
  OmitConflictingProps<HeadingProps>
>;
export type MotionHeadingProps = React.ComponentProps<typeof MotionHeading>;

/**
 * Motion-enabled Text component using Chakra UI's Text and Framer Motion.
 *
 * This component combines Chakra UI's Text with Framer Motion's animation capabilities,
 * allowing you to use motion props alongside all standard TextProps (except for conflicting props).
 */
export const MotionText = motion.create(Text) as ForwardRefComponent<
  HTMLParagraphElement,
  OmitConflictingProps<TextProps>
>;
export type MotionTextProps = React.ComponentProps<typeof MotionText>;

/**
 * Motion-enabled Flex component using Chakra UI's Flex and Framer Motion.
 *
 * This component combines Chakra UI's Flex with Framer Motion's animation capabilities,
 * allowing you to use motion props alongside all standard FlexProps (except for conflicting props).
 */
export const MotionFlex = motion.create(Flex) as ForwardRefComponent<
  HTMLDivElement,
  OmitConflictingProps<FlexProps>
>;
export type MotionFlexProps = React.ComponentProps<typeof MotionFlex>;

/**
 * Motion-enabled Image component using Chakra UI's Image and Framer Motion.
 *
 * This component combines Chakra UI's Image with Framer Motion's animation capabilities,
 * allowing you to use motion props alongside all standard ImageProps (except for conflicting props).
 */
export const MotionImage = motion.create(Image) as ForwardRefComponent<
  HTMLImageElement,
  OmitConflictingProps<ImageProps>
>;
export type MotionImageProps = React.ComponentProps<typeof MotionImage>;

/**
 * Motion-enabled Grid component using Chakra UI's Grid and Framer Motion.
 *
 * This component combines Chakra UI's Grid with Framer Motion's animation capabilities,
 * allowing you to use motion props alongside all standard GridProps (except for conflicting props).
 */
export const MotionGrid = motion.create(Grid) as ForwardRefComponent<
  HTMLDivElement,
  OmitConflictingProps<GridProps>
>;
export type MotionGridProps = React.ComponentProps<typeof MotionGrid>;

/**
 * Motion-enabled Video component using Framer Motion.
 *
 * This component wraps a native video element with Framer Motion's animation capabilities,
 * allowing you to use motion props alongside all standard video props (except for conflicting props).
 */
export const MotionVideo = motion.create('video') as ForwardRefComponent<
  HTMLVideoElement,
  OmitConflictingProps<React.ComponentPropsWithoutRef<'video'>>
>;
export type MotionVideoProps = React.ComponentProps<typeof MotionVideo>;

/**
 * Motion-enabled Button component using Chakra UI's Button and Framer Motion.
 *
 * This component combines Chakra UI's Button with Framer Motion's animation capabilities,
 * allowing you to use motion props alongside all standard ButtonProps (except for conflicting props).
 */
export const MotionButton = motion.create(Button) as ForwardRefComponent<
  HTMLButtonElement,
  OmitConflictingProps<ButtonProps>
>;
export type MotionButtonProps = React.ComponentProps<typeof MotionButton>;

/**
 * Motion-enabled McFlex component using custom McFlex and Framer Motion.
 *
 * This component combines McFlex with Framer Motion's animation capabilities,
 * allowing you to use motion props alongside all standard McFlexProps (except for conflicting props).
 */
export const MotionMcFlex = motion.create(McFlex) as ForwardRefComponent<
  HTMLDivElement,
  OmitConflictingProps<McFlexProps>
>;
export type MotionMcFlexProps = React.ComponentProps<typeof MotionMcFlex>;

/**
 * Motion-enabled McGrid component using custom McGrid and Framer Motion.
 *
 * This component combines McGrid with Framer Motion's animation capabilities,
 * allowing you to use motion props alongside all standard McGridProps (except for conflicting props).
 */
export const MotionMcGrid = motion.create(McGrid) as ForwardRefComponent<
  HTMLDivElement,
  OmitConflictingProps<McGridProps>
>;
export type MotionMcGridProps = React.ComponentProps<typeof MotionMcGrid>;
