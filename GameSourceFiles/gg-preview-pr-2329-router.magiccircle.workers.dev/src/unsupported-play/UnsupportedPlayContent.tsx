import { Box, Button, Heading, Icon } from '@chakra-ui/react';
import { AlertTriangle, ExternalLink } from 'react-feather';
import { handleDiscordExternalLink } from '@/discord-sdk/utils';
import { isRunningInsideDiscord } from '@/environment';

interface UnsupportedPlayContentProps {
  heading: React.ReactNode;
  children: React.ReactNode;
  externalLink?: {
    href: string;
    label: React.ReactNode;
  };
}

const UnsupportedPlayContent: React.FC<UnsupportedPlayContentProps> = ({
  heading,
  children,
  externalLink,
}) => {
  return (
    <>
      <Box mb={4}>
        <Icon as={AlertTriangle} boxSize="48px" />
      </Box>
      <Heading as="h1" fontSize="lg" mb={2}>
        {heading}
      </Heading>
      <Box maxW={400} w="100%" mb={externalLink ? 4 : 1}>
        {children}
      </Box>
      {externalLink && (
        <Button
          color="MagicWhite"
          bg="Blue.Magic"
          size="sm"
          onClick={() => {
            if (isRunningInsideDiscord) {
              void handleDiscordExternalLink(externalLink.href).catch(
                console.error
              );
            } else {
              window.open(externalLink.href, '_blank');
            }
          }}
        >
          {externalLink.label}
          <Icon as={ExternalLink} boxSize="1em" ml={1} />
        </Button>
      )}
    </>
  );
};

export default UnsupportedPlayContent;
