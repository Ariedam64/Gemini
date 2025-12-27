import { forwardRef } from 'react';
import { Grid, GridProps } from '@chakra-ui/layout';

export interface McGridProps extends GridProps {
  auto?: boolean;
  autoW?: boolean;
  autoH?: boolean;
}

const McGrid = forwardRef<HTMLDivElement, McGridProps>(
  ({ children, auto, autoW, autoH, ...rest }, ref) => {
    return (
      <Grid
        ref={ref}
        className="McGrid"
        w={auto || autoW ? 'auto' : '100%'}
        h={auto || autoH ? 'auto' : '100%'}
        {...rest}
      >
        {children}
      </Grid>
    );
  }
);
McGrid.displayName = 'McGrid';

export default McGrid;
