import useMyPetEffects from '@/Quinoa/components/QuinoaWorld/useMyPetEffects';

/**
 * Since useMyPetEffects causes React to re-render multiple times a second,
 * we are temporarily moving it here so that it doesn't cause the entire component tree to re-render.
 *
 * TODO: Remove this once we have a better way to handle pet effects.
 */

const HACKYPetManager: React.FC = () => {
  useMyPetEffects();
  return null;
};

export default HACKYPetManager;
