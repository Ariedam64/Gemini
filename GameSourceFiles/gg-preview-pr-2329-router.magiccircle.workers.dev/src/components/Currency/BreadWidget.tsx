import { useSetAtom } from 'jotai';
import { playSfx } from '@/audio/useQuinoaAudio';
import { breadWidgetGrantTypes } from '@/common/types/currencies';
import MagicWidget from '@/components/ui/MagicWidget';
import useBreadModal from '@/components/useBreadModal';
import { isBreadToasterWindowOpenAtom } from '@/store/store';
import { useUnclaimedGrantsAmount, useUser } from '@/user';
import BreadIcon from './BreadIcon.webp';

const BreadWidget: React.FC = () => {
  const { user } = useUser();
  const { totalAmountUnclaimed } = useUnclaimedGrantsAmount(
    breadWidgetGrantTypes
  );
  const breadModal = useBreadModal();
  const setIsToasterWindowOpen = useSetAtom(isBreadToasterWindowOpenAtom);

  const currencyBalance = user?.currencyBalance ?? 0;
  const hasUnclaimed = totalAmountUnclaimed > 0;

  const onClickBread = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (hasUnclaimed) {
      playSfx('Bread_YouveGotBread');
      setIsToasterWindowOpen(true);
    } else {
      void breadModal();
    }
  };

  return (
    <MagicWidget
      onClick={onClickBread}
      iconProps={{ src: BreadIcon, boxSize: '45px' }}
      buttonProps={{ variant: 'blank', id: 'bread-counter-widget', zIndex: 1 }}
      value={currencyBalance}
      isAlertActive={hasUnclaimed}
    />
  );
};

export default BreadWidget;
