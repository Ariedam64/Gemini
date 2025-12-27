import { forwardRef, useMemo } from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';

/**
 * @typedef {Object} McFlexProps
 * @property {React.Ref<HTMLDivElement>} [ref] - A ref to the underlying HTML div element.
 * @property {boolean} [col] - If true, sets the flex direction to column.
 * @property {boolean} [auto] - If true, sets both width and height to auto.
 * @property {boolean} [autoW] - If true, sets the width to auto.
 * @property {boolean} [autoH] - If true, sets the height to auto.
 * @property {string} [orient] - A string to determine the alignment of the flex container. You can set it to 'left', 'right', 'top', 'bottom', or use more traditional alignment props like 'space-between'.
 * @property {FlexProps} [props] - Additional props inherited from Chakra UI's Flex component.
 */

export interface McFlexProps extends FlexProps {
  ref?: React.Ref<HTMLDivElement>;
  col?: boolean;
  auto?: boolean;
  autoW?: boolean;
  autoH?: boolean;
  orient?: string;
}

const McFlex = forwardRef<HTMLDivElement, McFlexProps>(
  ({ children, col, auto, autoW, autoH, orient, ...props }, ref) => {
    const direction =
      props.flexDirection || props.flexDir || props.direction || col
        ? 'column'
        : 'row';

    const { justify, align } = useMemo(
      () => getAlignment(orient, direction),
      [orient, direction]
    );

    // When a flex container is set to wrap, we need to set alignContent instead of alignItems
    // or there will be unexpected space between the items on the wrapped lines.
    const alignContent = props.wrap === 'nowrap' ? undefined : align;

    return (
      <Flex
        ref={ref}
        className="McFlex" /* add className for easier debugging in DOM tree */
        flexDir={direction}
        justify={justify}
        align={align}
        alignContent={alignContent}
        w={auto || autoW ? 'auto' : '100%'}
        h={auto || autoH ? 'auto' : '100%'}
        {...props}
      >
        {children}
      </Flex>
    );
  }
);
McFlex.displayName = 'McFlex';

function getAlignment(orient = '', direction = 'row') {
  let justify = 'center';
  let align = 'center';

  const parsedAlignments = orient.split(' ');

  parsedAlignments.forEach((alignment) => {
    switch (alignment) {
      case 'top':
        if (direction === 'row') {
          align = 'flex-start';
        } else {
          justify = 'flex-start';
        }
        break;
      case 'bottom':
        if (direction === 'row') {
          align = 'flex-end';
        } else {
          justify = 'flex-end';
        }
        break;
      case 'left':
        if (direction === 'row') {
          justify = 'flex-start';
        } else {
          align = 'flex-start';
        }
        break;
      case 'right':
        if (direction === 'row') {
          justify = 'flex-end';
        } else {
          align = 'flex-end';
        }
        break;
      case 'space-between':
      case 'space-around':
      case 'space-evenly':
        justify = alignment;
        break;
      case 'stretch':
        align = alignment;
        break;
    }
  });

  return { justify, align };
}

export default McFlex;
