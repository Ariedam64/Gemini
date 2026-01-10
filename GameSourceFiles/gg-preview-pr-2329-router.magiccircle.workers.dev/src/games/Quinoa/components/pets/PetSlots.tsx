import { useAtomValue } from 'jotai';
import McFlex from '@/components/McFlex/McFlex';
import { myNonPrimitivePetSlotsAtom } from '../../atoms/myAtoms';
import PetSlotButton from './PetSlotButton';

type PetSlotsProps = {};

const PetSlots: React.FC<PetSlotsProps> = () => {
  const petSlots = useAtomValue(myNonPrimitivePetSlotsAtom);

  return (
    <McFlex autoH col orient="left" gap={1}>
      {petSlots.map((petSlot) => (
        <PetSlotButton key={petSlot.id} petSlot={petSlot} />
      ))}
    </McFlex>
  );
};

export default PetSlots;
