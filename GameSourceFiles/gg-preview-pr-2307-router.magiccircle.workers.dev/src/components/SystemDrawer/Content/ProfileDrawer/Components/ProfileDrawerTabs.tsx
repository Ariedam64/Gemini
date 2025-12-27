import {
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { useLingui } from '@lingui/react/macro';
import {
  type CosmeticColor,
  cosmeticColors,
} from '@/common/resources/cosmetic-colors';
import {
  avatarSections,
  type CosmeticItem_MaybeLocked,
  cosmeticTypes,
} from '@/common/resources/cosmetics/cosmeticTypes';
import type { Avatar } from '@/common/types/player';
import McFlex from '@/components/McFlex/McFlex';
import { getDecoration } from '@/constants/decorations';
import { cosmeticRenderingDetails } from '@/cosmetics/cosmeticRenderingDetails';
import { useGroupedCosmetics } from '@/cosmetics/hooks';
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen';
import colors from '@/theme/colors';
import CosmeticButtonSection from './CosmeticButtonSection';

interface ProfileDrawerTabsProps {
  tabIdx: number;
  setTabIdx: (tabIdx: number) => void;
  color: CosmeticColor;
  setColor: (color: CosmeticColor) => void;
  avatar: Avatar;
  setAvatar: React.Dispatch<React.SetStateAction<Avatar>>;
}
const ProfileDrawerTabs: React.FC<ProfileDrawerTabsProps> = ({
  tabIdx,
  setTabIdx,
  color,
  setColor,
  avatar,
  setAvatar,
}) => {
  const groupedCosmetics = useGroupedCosmetics();
  const { primaryColor, textColor } = getDecoration(color);
  const shouldInvert = textColor === colors.MagicBlack;
  const isSmallScreen = useIsSmallScreen();
  const { t } = useLingui();

  const onClickCosmeticButton = (cosmetic: CosmeticItem_MaybeLocked) => {
    const { id, type, filename } = cosmetic;
    if (type === 'Color') {
      // TODO: More refactoring needed on combining color and avatar parts into single Cosmetics concept.
      // For now, cast the id to a CosmeticColor and use a type guard to ensure it's a valid color.
      const cosmeticColor = id as CosmeticColor;
      if (cosmeticColors.includes(cosmeticColor)) {
        setColor(cosmeticColor);
      }
    } else {
      setAvatar((prevAvatar) => {
        const sectionIndex = avatarSections.indexOf(type);
        const newAvatar = [...prevAvatar];
        newAvatar[sectionIndex] = filename;
        return newAvatar;
      });
    }
  };
  return (
    <McFlex
      col
      orient="top"
      bg="MagicBlack"
      pt="10px"
      zIndex={1}
      borderRadius="inherit"
      borderTopRadius={isSmallScreen ? '20px' : 0}
    >
      <Tabs
        variant="vertical"
        w="100%"
        index={tabIdx}
        onChange={setTabIdx}
        px="5px"
      >
        {/* using !important because chakra uses a media query to set the margin bottom on small screen which would otherwise override this prop */}
        <TabList mb="5px !important" px="5px">
          {cosmeticTypes.map((cosmeticType, idx) => (
            <Tab key={cosmeticType} _selected={{ bg: primaryColor }}>
              <McFlex
                aria-label={cosmeticType}
                cursor="pointer"
                onPointerDown={() => {
                  setTabIdx(idx);
                }}
              >
                <Image
                  src={cosmeticRenderingDetails[cosmeticType].icon}
                  height="28px"
                  filter={
                    idx === tabIdx && shouldInvert ? 'invert(1)' : undefined
                  }
                />
              </McFlex>
            </Tab>
          ))}
        </TabList>
        <TabPanels
          overflowY="auto"
          pt="10px"
          sx={{
            '&::-webkit-scrollbar': {
              width: '4px',
              height: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '3px',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.3)',
              },
            },
          }}
        >
          {cosmeticTypes.map((cosmeticType) => (
            <TabPanel key={cosmeticType}>
              <McFlex
                orient="top left"
                col
                gap="30px"
                px="10px"
                pb={`calc(var(--saib) + 5px)`}
              >
                {/* Owned */}
                <CosmeticButtonSection
                  items={groupedCosmetics[cosmeticType]['owned']}
                  avatar={avatar}
                  color={color}
                  onClickCosmeticButton={onClickCosmeticButton}
                />

                {/* Claimed */}
                <CosmeticButtonSection
                  heading={t`Special`}
                  items={groupedCosmetics[cosmeticType]['claimed']}
                  avatar={avatar}
                  color={color}
                  onClickCosmeticButton={onClickCosmeticButton}
                />

                {/* For Sale */}
                <CosmeticButtonSection
                  heading={t`For Sale`}
                  items={groupedCosmetics[cosmeticType]['forSale']}
                  avatar={avatar}
                  color={color}
                  onClickCosmeticButton={onClickCosmeticButton}
                />
              </McFlex>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </McFlex>
  );
};

export default ProfileDrawerTabs;
