import { defineSafeStyleConfig } from '../types';

// export the component theme
const tooltipTheme = defineSafeStyleConfig({
  baseStyle: {
    backgroundColor: 'rgba(20, 20, 20, 0.90)',
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: 'sm',
    border: '1px solid',
    borderColor: 'Neutral.DarkGrey',
    zIndex: 'GameTooltip',
  },
});

export default tooltipTheme;
