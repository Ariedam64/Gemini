import { useEffect } from 'react';
import { Rive } from '@rive-app/canvas';

/**
 * Hook to set the state machine input for a Rive animation.
 *
 * @param {Rive | null} rive - The Rive animation instance.
 * @param {string} stateMachineName - The name of the state machine in the Rive animation.
 * @param {Record<string, number | boolean>} initialValues - The initial values to set for the state machine inputs.
 *
 * @returns {{ getInput: (inputName: string) => number | boolean | undefined, setInput: (inputName: string, value: number | boolean) => void, fireTrigger: (inputName: string) => void }} Functions to interact with the state machine inputs
 */

function useMcRiveStateMachine(
  rive: Rive | null,
  stateMachineName = 'State Machine 1',
  initialValues: Record<string, number | boolean> = {}
) {
  const findInput = (inputName: string) => {
    return rive
      ?.stateMachineInputs(stateMachineName)
      ?.find((input) => input.name === inputName);
  };

  const getInput = (inputName: string) => {
    const input = findInput(inputName);
    return input?.value;
  };

  const setInput = (inputName: string, value: number | boolean) => {
    const input = findInput(inputName);
    if (!input) {
      return;
    }

    input.value = value;
  };

  const fireTrigger = (inputName: string) => {
    const input = findInput(inputName);
    if (!input) {
      return;
    }

    input.fire();
  };

  // Initialize and keep inputs updated.
  useEffect(() => {
    if (rive) {
      Object.entries(initialValues).forEach(([inputName, value]) => {
        setInput(inputName, value);
      });
    }
  }, [rive, ...Object.values(initialValues)]);

  return { getInput, setInput, fireTrigger };
}

export default useMcRiveStateMachine;
