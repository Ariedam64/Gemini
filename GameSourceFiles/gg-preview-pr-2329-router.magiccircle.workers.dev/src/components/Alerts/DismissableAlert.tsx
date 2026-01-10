import {
  Alert,
  AlertDescription,
  AlertTitle,
  type ToastProps,
} from '@chakra-ui/react';
import { X as CloseIcon } from 'react-feather';
import McFlex from '@/components/McFlex/McFlex';

export default function DismissableAlert({
  description,
  onClose,
  isClosable,
  variant,
  children,
  title,
  status,
  icon,
}: ToastProps) {
  return (
    <Alert
      className="DismissableAlert"
      size="md"
      backgroundColor={status === 'error' ? 'Red.Magic' : undefined}
      color={status === 'error' ? 'MagicWhite' : undefined}
      variant={variant ?? 'DismissableAlert'}
    >
      {children ? (
        children
      ) : (
        <McFlex alignItems="flex-start">
          <McFlex col alignItems="flex-start" gap="10px">
            <McFlex gap="10px" justifyContent="space-between">
              {icon}
              {title && <AlertTitle>{title}</AlertTitle>}
            </McFlex>
            {description && <AlertDescription>{description}</AlertDescription>}
          </McFlex>
        </McFlex>
      )}
      {isClosable && (
        <CloseIcon
          onClick={onClose}
          size="28px"
          strokeWidth="2.5px"
          pointerEvents="all"
        />
      )}
    </Alert>
  );
}
