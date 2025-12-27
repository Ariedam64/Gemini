import { useEffect } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  creditsBalanceAtom,
  lastTimeCreditsBalanceWasSetAtom,
} from '@/store/store';
import { useCreditsBalance } from '@/user';

const HACKYHookToAtomCreditsManager: React.FC = () => {
  const { availableCredits, mutateCreditsBalance } = useCreditsBalance();

  const setCreditsBalance = useSetAtom(creditsBalanceAtom);
  const lastTimeCreditsBalanceWasSet = useAtomValue(
    lastTimeCreditsBalanceWasSetAtom
  );
  useEffect(() => {
    setCreditsBalance(availableCredits);
  }, [availableCredits, setCreditsBalance]);

  useEffect(() => {
    void mutateCreditsBalance();
  }, [lastTimeCreditsBalanceWasSet, mutateCreditsBalance]);
  return null;
};

export default HACKYHookToAtomCreditsManager;
