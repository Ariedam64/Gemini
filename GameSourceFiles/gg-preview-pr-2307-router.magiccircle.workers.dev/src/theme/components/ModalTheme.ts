import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import { createSafeMultiStyleConfigHelpers } from '../types';

const {
  defineSafePartsStyle: definePartsStyle,
  defineSafeMultiStyleConfig: defineMultiStyleConfig,
} = createSafeMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  dialog: {
    borderRadius: 'card',
    mx: '8px',
    p: '12px',
    display: 'flex',
    gap: '8px',
  },
  dialogContainer: {
    top: 'var(--sait)',
  },
  header: {
    pl: 0,
    pr: 0,
    pb: 0,
    pt: '16px',
    lineHeight: '1.2',
  },
  body: {
    fontWeight: 500,
    p: 0,
  },
  footer: {
    px: 0,
    pb: 2,
  },
  overlay: {
    backgroundColor: 'Scrim',
  },
});

export default defineMultiStyleConfig({
  baseStyle,
  variants: {
    PermissionPrompt: {
      dialog: {
        backgroundColor: 'MagicWhite',
        textColor: 'MagicBlack',
        px: '16px',
        py: '22px',
        gap: '20px',
      },
      header: {
        fontWeight: 'extrabold',
        textTransform: 'capitalize',
      },
      body: {
        fontWeight: 'demibold',
        fontSize: 'md',
      },
      footer: {
        display: 'flex',
      },
    },
    // Covers the game screen, but not the SystemHeader
    McDefault: {
      dialog: {
        bg: 'MagicWhite',
        textColor: 'MagicBlack',
        zIndex: 'StandardModal',
      },
      dialogContainer: {
        zIndex: 'StandardModal',
      },
      overlay: {
        zIndex: 'StandardModalOverlay',
      },
      closeButton: {
        color: 'MagicWhite',
      },
    },
    Ghost: {
      dialog: {
        maxWidth: 'lg',
        p: 0,
        m: 0,
      },
      dialogContainer: {
        zIndex: 'DialogModal',
      },
      overlay: {
        backgroundColor: 'ScrimDarker',
        zIndex: 'DialogOverlay',
      },
    },
    Presentable: {
      dialog: {
        maxWidth: 'lg',
        p: 0,
        m: 0,
      },
      dialogContainer: {
        zIndex: 'PresentableModal',
        overflow: 'hidden',
      },
      overlay: {
        backgroundColor: 'ScrimDarkest',
        zIndex: 'PresentableOverlay',
      },
      closeButton: {
        zIndex: 'PresentableModal',
      },
    },
    PurchaseModal: {
      dialog: {
        maxWidth: 'lg',
        p: 0,
        m: 0,
      },
      dialogContainer: {
        zIndex: 'PurchaseModal',
      },
      overlay: {
        zIndex: 'PurchaseModal',
      },
      closeButton: {
        zIndex: 'PurchaseModal',
      },
    },
    CreditsPurchaseModal: {
      dialogContainer: {
        zIndex: 'PurchaseModal',
      },
      overlay: {
        zIndex: 'PurchaseModal',
      },
      closeButton: {
        zIndex: 'PurchaseModal',
      },
    },
    ConnectionIssuesModal: {
      dialog: {
        bg: 'MagicWhite',
        color: 'MagicBlack',
        maxWidth: 'lg',
        p: '20px',
        mt: '100px',
      },
      dialogContainer: {
        zIndex: 'ConnectionIssuesModal',
      },
      overlay: {
        zIndex: 'ConnectionIssuesModal',
      },
      closeButton: {
        zIndex: 'ConnectionIssuesModal',
      },
    },
    ReportPlayerModal: {
      dialog: {
        maxWidth: 'xl',
      },
      dialogContainer: {
        zIndex: 'ReportPlayerModal',
      },
      overlay: {
        zIndex: 'ReportPlayerModal',
      },
      closeButton: {
        zIndex: 'ReportPlayerModal',
      },
    },
    QuinoaModal: {
      dialog: {
        maxWidth: 'xl',
      },
      dialogContainer: {
        zIndex: 'StandardModal',
      },
      overlay: {
        zIndex: 'StandardModal',
      },
      closeButton: {
        zIndex: 'StandardModal',
      },
    },
    CriticalError: {
      dialog: {
        bg: 'Red.Dark',
        textColor: 'MagicWhite',
        maxW: 'calc(min(80vw, 1000px))',
      },
      dialogContainer: {
        zIndex: 'CriticalErrorModal',
      },
      header: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: 'md',
        fontWeight: 'bold',
      },
      body: {
        fontSize: 'sm',
      },
      overlay: {
        zIndex: 'CriticalErrorModalOverlay',
      },
    },
    Dialog: {
      dialog: {
        bg: 'Neutral.White',
        color: 'Neutral.Black',
      },
      dialogContainer: {
        zIndex: 'DialogModal',
      },
      header: {
        fontWeight: 'bold',
      },
      overlay: {
        zIndex: 'DialogOverlay',
      },
    },
  },
  defaultProps: {
    variant: 'McDefault',
  },
});
