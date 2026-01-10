import type { StrokedTextProps } from '@/components/StrokedText/StrokedTextProps';

const strokedTextSizeConfigs = {
  xs: {
    fontSize: '12px',
    gap: '1px',
    strokeWidth: 3,
  },
  sm: {
    fontSize: '14px',
    gap: '2px',
    strokeWidth: 3,
  },
  md: {
    fontSize: '20px',
    gap: '3px',
    strokeWidth: 3,
  },
  lg: {
    fontSize: '32px',
    gap: 1,
    strokeWidth: 4,
  },
  xl: {
    fontSize: '40px',
    gap: 1,
    strokeWidth: 5,
  },
} as const satisfies Record<string, Omit<StrokedTextProps, 'children'>>;

export default strokedTextSizeConfigs;
