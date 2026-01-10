import { Code } from '@chakra-ui/react';
import { useLingui } from '@lingui/react/macro';
import { useAtomValue } from 'jotai';
import { CriticalAlertDialog } from '@/components/ui/CriticalAlertDialog';
import { authenticationFailureAtom } from '@/store/store';

export function AuthenticationFailureDialog() {
  const { t } = useLingui();
  const authenticationFailure = useAtomValue(authenticationFailureAtom);

  if (!authenticationFailure) {
    return null;
  }
  return (
    <CriticalAlertDialog isOpen title={t`Authentication Failed`}>
      <Code wordBreak="break-word" whiteSpace="pre-wrap">
        {JSON.stringify(authenticationFailure, null, 2)}
      </Code>
    </CriticalAlertDialog>
  );
}
