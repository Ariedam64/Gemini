import { Trans } from '@lingui/react/macro';
import { useOnClickStart } from '../../../room/hooks';
import GradientButton, { GradientButtonProps } from './GradientButton';

type PlayButtonProps = GradientButtonProps;

function PlayButton({ ...props }: PlayButtonProps) {
  const onClickStart = useOnClickStart();
  return (
    <GradientButton
      h="35px"
      data-testid="play-game-button"
      {...props}
      py={0}
      bg="linear-gradient(90deg, #FFE296, #DF9FF5)"
      hoverBg="linear-gradient(90deg, #FFE296 30%, #d0a9dd)"
      hoverBoxShadow="0px 4px 20px 0px #FFE29666"
      onClick={onClickStart}
    >
      <Trans>Play</Trans>
    </GradientButton>
  );
}

export default PlayButton;
