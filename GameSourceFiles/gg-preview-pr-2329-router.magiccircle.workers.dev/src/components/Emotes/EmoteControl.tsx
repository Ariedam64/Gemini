import { emoteControlTypes } from '@/common/types/emote';
import McFlex from '@/components/McFlex/McFlex';
import { useColor } from '@/store/store';
import EmoteButton from './EmoteButton';

type EmoteControlProps = {};

const EmoteControl: React.FC<EmoteControlProps> = () => {
  const color = useColor();

  return (
    <McFlex autoH justifyContent="space-around">
      {emoteControlTypes.map((type) => (
        <EmoteButton key={type} type={type} color={color} />
      ))}
    </McFlex>
  );
};

export default EmoteControl;
