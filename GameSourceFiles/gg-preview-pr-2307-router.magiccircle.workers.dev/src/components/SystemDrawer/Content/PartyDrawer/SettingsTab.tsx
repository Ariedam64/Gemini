import { Heading, Select, Switch, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { Bell, Music, Wind } from 'react-feather';
import {
  isAudioDisabledDueToMemoryPressure,
  isMusicDisabledDueToMemoryPressure,
} from '@/audio/legacy/audio';
import McFlex from '@/components/McFlex/McFlex';
import { AuthenticationOptions } from '@/components/ui/authentication/AuthenticationOptions';
import { DeleteAccountButton } from '@/components/ui/authentication/DeleteAccountButton';
import { isDesktopMode, surface } from '@/environment';
import { type Locale, locales } from '@/locales';
import { useLocale } from '@/localization';
import {
  useAmbienceVolume,
  useDailyStreakReminderPreference,
  useFramesPerSecondLimit,
  useIsAmbienceMute,
  useIsDeveloper,
  useIsMusicMute,
  useIsSoundEffectsMute,
  useIsUserAuthenticated,
  useMusicVolume,
  usePlayAudioInBackground,
  useRenderScalePreference,
  useSetAmbienceVolume,
  useSetFramesPerSecondLimit,
  useSetIsAmbienceMute,
  useSetIsMusicMute,
  useSetIsSoundEffectsMute,
  useSetMusicVolume,
  useSetPlayAudioInBackground,
  useSetRenderScalePreference,
  useSetSoundEffectsVolume,
  useSoundEffectsVolume,
} from '@/store/store';
import { useRenderScaleConfig } from '@/utils/renderScale';
import VolumeButtons from './VolumeButtons';

export const SettingsTab = () => {
  const isDeveloper = useIsDeveloper();
  const musicVolume = useMusicVolume();
  const ambienceVolume = useAmbienceVolume();
  const soundEffectsVolume = useSoundEffectsVolume();
  const isAuthenticated = useIsUserAuthenticated();
  const framesPerSecondLimit = useFramesPerSecondLimit();
  const isMusicMute = useIsMusicMute();
  const isAmbienceMute = useIsAmbienceMute();
  const isSoundEffectsMute = useIsSoundEffectsMute();
  const playAudioInBackground = usePlayAudioInBackground();
  const setPlayAudioInBackground = useSetPlayAudioInBackground();
  const [isOptedOut, setIsOptedOut] = useDailyStreakReminderPreference();
  const renderScale = useRenderScalePreference();
  const setRenderScale = useSetRenderScalePreference();
  const { locale, setLocale } = useLocale();
  const { availableRenderScales, autoResolvedScale, deviceDPI } =
    useRenderScaleConfig();
  const setIsMusicMute = useSetIsMusicMute();
  const setIsAmbienceMute = useSetIsAmbienceMute();
  const setIsSoundEffectsMute = useSetIsSoundEffectsMute();
  const setMusicVolume = useSetMusicVolume();
  const setAmbienceVolume = useSetAmbienceVolume();
  const setSoundEffectsVolume = useSetSoundEffectsVolume();
  const setFramesPerSecondLimit = useSetFramesPerSecondLimit();

  return (
    <McFlex col overflow="hidden" gap={4} px={3} pb={4}>
      {(isAudioDisabledDueToMemoryPressure ||
        isMusicDisabledDueToMemoryPressure) && (
        <Text fontWeight="bold" color="Yellow.Light">
          <Trans>
            Audio is temporarily disabled on mobile for performance reasons.
          </Trans>
        </Text>
      )}
      <McFlex col orient="left" gap={1}>
        <Heading>
          <Trans>Music Volume</Trans>
        </Heading>
        <McFlex orient="left">
          <VolumeButtons
            type="Music"
            IconComponent={Music}
            count={9}
            isMute={
              isAudioDisabledDueToMemoryPressure ||
              isMusicDisabledDueToMemoryPressure ||
              isMusicMute
            }
            volume={musicVolume}
            setVolume={setMusicVolume}
            setMute={setIsMusicMute}
          />
        </McFlex>
      </McFlex>
      <McFlex col orient="left" gap={1}>
        <Heading>
          <Trans>Ambience Volume</Trans>
        </Heading>
        <McFlex orient="left">
          <VolumeButtons
            type="Ambience"
            IconComponent={Wind}
            count={9}
            isMute={
              isAudioDisabledDueToMemoryPressure ||
              isMusicDisabledDueToMemoryPressure ||
              isAmbienceMute
            }
            volume={ambienceVolume}
            setVolume={setAmbienceVolume}
            setMute={setIsAmbienceMute}
          />
        </McFlex>
      </McFlex>
      <McFlex col orient="left" gap={1}>
        <Heading>
          <Trans>SFX Volume</Trans>
        </Heading>
        <McFlex orient="left">
          <VolumeButtons
            type="SoundEffects"
            IconComponent={Bell}
            count={9}
            isMute={isAudioDisabledDueToMemoryPressure || isSoundEffectsMute}
            volume={soundEffectsVolume}
            setVolume={setSoundEffectsVolume}
            setMute={setIsSoundEffectsMute}
          />
        </McFlex>
      </McFlex>
      <McFlex col orient="left" gap={1}>
        <Heading>
          <Trans>Background Audio</Trans>
        </Heading>
        <McFlex flexDirection="row" align="top" gap={3} pt={2}>
          <McFlex col gap={0.5} orient="left" textAlign="left">
            <Text fontWeight="medium">
              <Trans>Play audio in background</Trans>
            </Text>
          </McFlex>
          <Switch
            size="md"
            isChecked={playAudioInBackground}
            onChange={(e) => setPlayAudioInBackground(e.target.checked)}
          />
        </McFlex>
      </McFlex>
      <McFlex col orient="left" gap={1}>
        <Heading>
          <Trans>Language</Trans>
        </Heading>
        <Select
          value={locale}
          onChange={(e) => setLocale(e.target.value as Locale)}
          variant="flushed"
        >
          {locales.map(({ locale, name }) => (
            <option key={locale} value={locale} style={{ color: 'black' }}>
              {name}
            </option>
          ))}
        </Select>
      </McFlex>
      <McFlex col orient="left">
        <Heading>
          <Trans>Performance</Trans>
        </Heading>
        {deviceDPI > 1 && (
          <McFlex col gap={1} orient="left" pt={2}>
            <Text fontWeight="medium">
              <Trans>Render Scale</Trans>
            </Text>
            <Select
              value={renderScale}
              size="sm"
              onChange={(e) => {
                const val = e.target.value;
                setRenderScale(val === 'auto' ? 'auto' : Number(val));
              }}
              variant="flushed"
            >
              <option value="auto" style={{ color: 'black' }}>
                Automatic ({Math.round(autoResolvedScale * 100)}%)
              </option>
              {availableRenderScales.map((scale) => (
                <option key={scale} value={scale} style={{ color: 'black' }}>
                  {Math.round(scale * 100)}%
                </option>
              ))}
            </Select>
            <Text
              pt={1}
              fontSize="xs"
              color="Neutral.Grey"
              textAlign="left"
              lineHeight="1"
            >
              <Trans>
                Adjusting this may affect performance and battery life.
              </Trans>
            </Text>
          </McFlex>
        )}
        <McFlex col gap={1} orient="left">
          <Text fontWeight="medium">
            <Trans>Frame rate</Trans>
          </Text>
          <Select
            value={framesPerSecondLimit}
            size="sm"
            onChange={(e) => setFramesPerSecondLimit(Number(e.target.value))}
            variant="flushed"
          >
            <option value={20} style={{ color: 'black' }}>
              <Trans>Low (20 FPS)</Trans>
            </option>
            <option value={30} style={{ color: 'black' }}>
              <Trans>Default (30 FPS)</Trans>
            </option>
            <option value={60} style={{ color: 'black' }}>
              <Trans>High (60 FPS)</Trans>
            </option>
            <option value={0} style={{ color: 'black' }}>
              <Trans>Uncapped (display refresh rate)</Trans>
            </option>
          </Select>
        </McFlex>
      </McFlex>
      {isAuthenticated && surface !== 'webview' && (
        <McFlex col orient="left">
          <Heading>
            <Trans>Notifications</Trans>
          </Heading>
          <McFlex flexDirection="row" align="top" gap={3} pt={2}>
            <McFlex col gap={0.5} orient="left" textAlign="left">
              <Text fontWeight="medium">
                <Trans>Daily Streak Reminders</Trans>
              </Text>
            </McFlex>
            <Switch
              size="md"
              isChecked={!isOptedOut}
              onChange={(e) => {
                void setIsOptedOut(!e.target.checked);
              }}
            />
          </McFlex>
          <Text fontSize="xs" color="Neutral.Grey" textAlign="left">
            <Trans>Receive Discord DMs about your streak.</Trans>
          </Text>
        </McFlex>
      )}
      <AuthenticationOptions />
      {isAuthenticated && (
        <McFlex
          col
          autoH
          gap={2}
          mt={2}
          mb={2}
          pt={2}
          pb={4}
          border="2px solid"
          borderColor="Red.Light"
          borderRadius="card"
        >
          <Heading
            size="sm"
            color="Red.Light"
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="wider"
            mb={1}
          >
            <Trans>Danger Zone</Trans>
          </Heading>
          <DeleteAccountButton size="xs" />
        </McFlex>
      )}
    </McFlex>
  );
};
