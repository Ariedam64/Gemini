import useDecorShopAnnouncer from '@/Quinoa/hooks/useDecorShopAnnouncer';
import useEggShopAnnouncer from '@/Quinoa/hooks/useEggShopAnnouncer';
import useSeedShopAnnouncer from '@/Quinoa/hooks/useSeedShopAnnouncer';
import useToolShopAnnouncer from '@/Quinoa/hooks/useToolShopAnnouncer';

type HACKYShopAnnouncersProps = {};

const HACKYShopAnnouncers: React.FC<HACKYShopAnnouncersProps> = () => {
  useSeedShopAnnouncer();
  useEggShopAnnouncer();
  useToolShopAnnouncer();
  useDecorShopAnnouncer();
  return null;
};

export default HACKYShopAnnouncers;
