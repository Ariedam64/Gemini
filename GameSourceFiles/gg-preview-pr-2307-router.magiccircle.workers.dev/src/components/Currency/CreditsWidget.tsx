import MagicWidget from '@/components/ui/MagicWidget';
import { useCreditsBalance } from '@/user';
import { useCreditsModal } from '../Credits/useCreditsModal';
import DonutIcon from './DonutIcon.webp';

const CreditsWidget: React.FC = () => {
  const creditsModal = useCreditsModal();
  const { availableCredits } = useCreditsBalance();

  const onClickCredits = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    creditsModal.open();
  };

  return (
    <MagicWidget
      onClick={onClickCredits}
      iconProps={{ src: DonutIcon, boxSize: '45px' }}
      buttonProps={{ variant: 'blank', id: 'credits-counter-widget' }}
      value={availableCredits}
    />
  );
};

export default CreditsWidget;
