import { Button, type ButtonProps } from '@chakra-ui/react';
import { Trans, useLingui } from '@lingui/react/macro';
import { useEffect, useRef, useState } from 'react';
import { playSfx } from '@/audio/useQuinoaAudio';
import { shopRestockInfo } from '@/common/games/Quinoa/constants';
import { ShopType } from '@/common/games/Quinoa/user-json-schema/current';
import { useCreditsModal } from '@/components/Credits/useCreditsModal';
import McFlex from '@/components/McFlex/McFlex';
import { MotionBox } from '@/components/Motion';
import StrokedText from '@/components/StrokedText/StrokedText';
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen';
import { openActivityLogModal } from '@/Quinoa/atoms/modalAtom';
import { sendQuinoaToast } from '@/Quinoa/atoms/toastAtoms';
import QuinoaCreditsLabel from '@/Quinoa/components/currency/QuinoaCreditsLabel';
import { PRESS_AND_HOLD_ACTION_SECONDS } from '@/Quinoa/data/action/constants/constants';
import { quinoaRpc } from '@/Quinoa/utils/quinoaRpc';
import { useCreditsBalance } from '@/user';

interface RestockButtonProps extends ButtonProps {
  shopType: ShopType;
}

const shopConfigs = {
  seed: {
    rpcMethod: 'RestockSeedsWithCredits' as const,
    icon: 'sprite/ui/SeedsRestocked',
    nameKey: 'seeds',
  },
  egg: {
    rpcMethod: 'RestockEggsWithCredits' as const,
    icon: 'sprite/ui/EggsRestocked',
    nameKey: 'eggs',
  },
  tool: {
    rpcMethod: 'RestockToolsWithCredits' as const,
    icon: 'sprite/ui/ToolsRestocked',
    nameKey: 'tools',
  },
  decor: {
    rpcMethod: 'RestockDecorsWithCredits' as const,
    icon: 'sprite/ui/DecorRestocked',
    nameKey: 'decor',
  },
} as const;

const RestockButton: React.FC<RestockButtonProps> = ({
  shopType,
  ...props
}) => {
  const [isLoadingCreditPurchase, setIsLoadingCreditPurchase] = useState(false);
  const { availableCredits, mutateCreditsBalance } = useCreditsBalance();
  const { open: openCreditsModal } = useCreditsModal();
  const { t } = useLingui();
  const creditPrice = shopRestockInfo[shopType].creditPrice;
  const [isHolding, setIsHolding] = useState(false);
  const config = shopConfigs[shopType];
  const isSmallScreen = useIsSmallScreen();
  const holdingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleRestockWithCredits = async () => {
    // Prevent double-clicks
    if (isLoadingCreditPurchase) {
      return;
    }
    if (availableCredits < creditPrice) {
      openCreditsModal();
      return;
    }
    setIsLoadingCreditPurchase(true);

    try {
      await quinoaRpc({
        method: config.rpcMethod,
      });
      // Revalidate credits balance after successful purchase
      await mutateCreditsBalance();
      playSfx('SeedShopRestocked');
      sendQuinoaToast({
        icon: 'icon' in config ? config.icon : undefined,
        title: t`Purchase successful`,
        description: (() => {
          switch (shopType) {
            case ShopType.Seed:
              return t`You restocked the Seed Shop.`;
            case ShopType.Egg:
              return t`You restocked the Egg Shop.`;
            case ShopType.Tool:
              return t`You restocked the Tool Shop.`;
            case ShopType.Decor:
              return t`You restocked the Decor Shop.`;
            default: {
              const _exhaustiveCheck: never = shopType;
              return _exhaustiveCheck;
            }
          }
        })(),
        onClick: openActivityLogModal,
        variant: 'success',
      });
    } catch (error) {
      sendQuinoaToast({
        icon: 'icon' in config ? config.icon : undefined,
        title: t`Purchase failed`,
        description:
          error instanceof Error
            ? error.message
            : t`Something went wrong. Please try again.`,
        variant: 'error',
      });
    } finally {
      setIsLoadingCreditPurchase(false);
    }
  };

  useEffect(() => {
    if (isHolding) {
      holdingTimeoutRef.current = setTimeout(() => {
        setIsHolding(false);
        void handleRestockWithCredits();
      }, PRESS_AND_HOLD_ACTION_SECONDS * 1000);

      return () => {
        if (holdingTimeoutRef.current !== null) {
          clearTimeout(holdingTimeoutRef.current);
          holdingTimeoutRef.current = null;
        }
      };
    }
  }, [isHolding]);

  return (
    <McFlex col maxW="210px">
      <StrokedText
        color="white"
        fontWeight="bold"
        fontSize={{ base: '10px', md: '12px', lg: '14px' }}
      >
        <Trans>Press & Hold</Trans>
      </StrokedText>
      <Button
        py={isSmallScreen ? 0 : 1}
        position="relative"
        bg="Yellow.Dark"
        borderRadius="10px"
        size="sm"
        color="MagicBlack"
        gap={isSmallScreen ? 0.5 : 1}
        textTransform="none"
        whiteSpace="normal"
        lineHeight="1"
        fontSize={{ base: '11px', md: '14px', lg: '16px' }}
        onPointerDown={() => setIsHolding(true)}
        onPointerUp={() => setIsHolding(false)}
        onPointerLeave={() => setIsHolding(false)}
        isLoading={isLoadingCreditPurchase}
        overflow="hidden"
        width="100%"
        borderBottom="3px solid rgba(0,0,0,0.4)"
        _active={{
          borderBottomWidth: '1px',
          borderBottomColor: 'rgba(0,0,0,0.2)',
          boxShadow: 'inset 0 3px 2px rgba(0,0,0,0.2)',
        }}
        transition="transform 0.2s ease"
        {...props}
      >
        <MotionBox
          key={`${isHolding}`}
          w="100%"
          h="100%"
          bg="rgba(255, 255, 255, 0.4)"
          position="absolute"
          initial={{ scaleX: 0 }}
          animate={{
            scaleX: isHolding ? 1 : 0,
          }}
          transition={{
            duration: isHolding ? PRESS_AND_HOLD_ACTION_SECONDS : 0,
          }}
          transformOrigin="left"
        />
        {shopType === 'seed' && <Trans>Restock seeds</Trans>}
        {shopType === 'egg' && <Trans>Restock eggs</Trans>}
        {shopType === 'tool' && <Trans>Restock tools</Trans>}
        {shopType === 'decor' && <Trans>Restock decor</Trans>}
        <QuinoaCreditsLabel
          amount={creditPrice}
          size="sm"
          strokedTextProps={{
            color: 'MagicBlack',
            strokeColor: 'MagicBlack',
            strokeWidth: 0.5,
          }}
          showTooltip={false}
        />
      </Button>
    </McFlex>
  );
};

export default RestockButton;
