import { CopyIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Heading,
  Image,
  ListItem,
  OrderedList,
  Text,
  useClipboard,
  VStack,
} from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import McFlex from '@/components/McFlex/McFlex';
import StockDarkThemeChakraProvider from '@/components/StockDarkThemeChakraProvider';
import ReportBugButton from '@/components/ui/ReportBugButton';
import { useIsDeveloper } from '@/store/store';
import RoomTheme, { RuntimeErrorZIndex } from '@/theme/RoomTheme';
import McConfigButton from './McConfigButton';
import smokey_buggs from './smokey_buggs.webp';

interface ErrorFallbackProps {
  error: unknown;
  componentStack: string;
  resetError: () => void;
}

/**
 * Renders a single line of the stack trace.
 *
 * @param {Object} props - The component props.
 * @param {string} props.children - The content of the stack trace line.
 * @returns {JSX.Element} A Text component representing a stack trace line.
 */
const StackTraceLine: React.FC<{ children: string }> = ({ children }) => (
  <Text
    mb="2px"
    fontSize={{
      base: 'xs',
      sm: 'sm',
    }}
  >
    {children}
  </Text>
);

/**
 * Renders the container for the error message and stack trace.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered inside the container.
 * @returns {JSX.Element} A Box component styled as the error container.
 */
const ErrorContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Box
    bg="#191919"
    color="white"
    m="15px"
    p="20px"
    border="2px solid #ff8d8d"
    borderRadius="0.25rem"
    userSelect="text"
    zIndex={RuntimeErrorZIndex}
    position="fixed"
    top="0"
    left="0"
    right="0"
    bottom="0"
    overflow="auto"
  >
    {children}
  </Box>
);

/**
 * Renders the stack trace.
 *
 * @param {Object} props - The component props.
 * @param {string} props.componentStack - The component stack trace.
 * @returns {JSX.Element} A Box component containing the formatted stack trace.
 */
const StackTrace: React.FC<{ componentStack: string }> = ({
  componentStack,
}: {
  componentStack: string;
}): JSX.Element => (
  <Box as="pre" whiteSpace="pre-wrap" wordBreak="break-all" maxHeight="60vh">
    {formatStackTrace(componentStack)}
  </Box>
);

/**
 * Formats the stack trace for display in the UI.
 * This function splits the stack trace string into individual lines and removes the protocol, hostname, and port from each line.
 * It then returns an array of JSX elements representing these lines.
 *
 * @param {string} stack - The stack trace string to be formatted.
 * @returns {JSX.Element[]} An array of JSX elements representing the formatted stack trace lines.
 */
const formatStackTrace = (stack: string): JSX.Element[] => {
  const lines = stack.split('\n');
  return lines.map((line, i) => {
    const cleanedLine = line.replace(/http[s]?:\/\/[^/]*/, '');
    return <StackTraceLine key={i}>{cleanedLine}</StackTraceLine>;
  });
};

/**
 * ErrorFallback component.
 * This is a fallback UI that will be displayed when an error boundary catches an error.
 * It shows an error message, the component stack trace when the error happened, and a button to copy these details.
 *
 * @param {Object} props - The properties that define the Error and stack trace.
 * @param {Error} props.error - The error that was thrown.
 * @param {string} props.componentStack - The component stack trace from the point where the error was captured.
 * @returns {JSX.Element} The ErrorFallback component.
 *
 * @example
 * ```jsx
 * <ErrorBoundary
 *   fallback={({ error, componentStack }) => (
 *     <ErrorFallback error={error} componentStack={componentStack} />
 *   )}
 * >
 *   <App />
 * </ErrorBoundary>
 * ```
 */
const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  componentStack,
}) => {
  const errorData = `${String(error)}${componentStack}`;
  const { onCopy } = useClipboard(errorData);
  const isDeveloper = useIsDeveloper();

  return (
    <ErrorContainer>
      <VStack align="stretch" spacing={4} fontSize="md">
        <Heading size="md" color="#ff8d8d" fontSize="lg">
          <Trans>Aw snap, the game crashed :(</Trans>
        </Heading>
        <Heading size="md" color="white" maxW="600px">
          <Trans>
            BUT!!!!!!! we can fix this bug, with your help 🥺
            <br />
          </Trans>
        </Heading>
        <Text color="white">
          <OrderedList ml="20px">
            <ListItem>
              <Trans>Take a screenshot</Trans>
            </ListItem>
            <ListItem>
              <Trans>Click the button to join our Discord server</Trans>
            </ListItem>
            <ListItem>
              <Trans>
                Make a new forum post with the screenshot and a description of
                the bug
              </Trans>
            </ListItem>
          </OrderedList>
          <Trans>Thank youuuuuu</Trans>
        </Text>
        <Image
          w="25vw"
          position="absolute"
          top="25px"
          right="25px"
          alt="Smokey Buggs says: 'Only you can prevent magic circle bugs'"
          src={smokey_buggs}
          display={{
            base: 'none',
            md: 'block',
          }}
        />
        <StockDarkThemeChakraProvider theme={RoomTheme}>
          <McFlex orient="left" gap={2}>
            <ReportBugButton />
          </McFlex>
          <McFlex h="70px" orient="left" gap={2}>
            <Button
              size="sm"
              backgroundColor="rgb(50, 50, 50, 0.5)"
              leftIcon={<CopyIcon />}
              onClick={() => {
                onCopy();
              }}
            >
              <Trans>Copy Stacktrace</Trans>
            </Button>
            {isDeveloper && <McConfigButton size="sm" />}
          </McFlex>
        </StockDarkThemeChakraProvider>
        <Text size="lg" fontWeight="bold">
          {String(error)}
        </Text>
        <StackTrace componentStack={componentStack} />
      </VStack>
    </ErrorContainer>
  );
};

export default ErrorFallback;
