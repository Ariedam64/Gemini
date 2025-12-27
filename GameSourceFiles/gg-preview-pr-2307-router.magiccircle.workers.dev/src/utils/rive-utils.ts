import Rive, {
  type CustomFileAssetLoader,
  type RiveCanvas as LowLevelRive,
  type File as LowLevelRiveFile,
  type ImageAsset as RiveImageAsset,
  type StateMachineInstance,
} from '@rive-app/webgl2-advanced';
import riveWASMResource from '@rive-app/webgl2-advanced/rive.wasm?url';
import { getDefaultStore } from 'jotai';
import { globalRiveFileBinaryCache, lowLevelRiveAtom } from '@/store/rive-atom';
import { fetchBinaryFile } from './fetchBinaryFile';

export async function setImageAssetFromUrl(
  rive: LowLevelRive,
  asset: RiveImageAsset,
  url: string
) {
  const buffer = await fetchBinaryFile(url);
  rive.decodeImage(new Uint8Array(buffer), (image) => {
    asset.setRenderImage(image);
    image.unref();
  });
}

/**
 * Creates a low-level RiveCanvas instance from a Rive file. Note that the RiveWASM
 * provided to this RiveCanvas is specific to the low-level
 * (@rive-app/webgl2-advanced) Rive API and is NOT interchangeable with the
 * high-level (@rive-app/canvas) Rive API.
 *
 * "RiveCanvas" is a pretty poor choice of name for this class on Rive's part,
 * since this is not a canvas at all, but rather a factory for constructing
 * RiveFiles and creating Rive renderers.
 */
export async function createLowLevelRive(): Promise<LowLevelRive> {
  const rive = await Rive({ locateFile: () => riveWASMResource });
  return rive;
}

export async function loadRiveFileWithLowLevelRive(
  rive: LowLevelRive,
  src: string,
  customAssetLoader?: CustomFileAssetLoader
): Promise<LowLevelRiveFile> {
  const riveFileBytes = await globalRiveFileBinaryCache.getOrFetch(src);
  const riveFile = await rive.load(
    new Uint8Array(riveFileBytes),
    customAssetLoader
  );
  return riveFile;
}

export function getStateMachineInputByName(
  stateMachine: StateMachineInstance,
  name: string
) {
  for (let i = 0; i < stateMachine.inputCount(); i++) {
    const input = stateMachine.input(i);
    if (input.name === name) {
      return input;
    }
  }
}

export function setStateMachineInputValue(
  rive: LowLevelRive,
  stateMachine: StateMachineInstance,
  name: string,
  value: number
) {
  const input = getStateMachineInputByName(stateMachine, name);
  if (input?.type === rive.SMIInput.number) {
    input.asNumber().value = value;
  } else if (input?.type === rive.SMIInput.trigger) {
    input.asTrigger().fire();
  } else if (input?.type === rive.SMIInput.bool) {
    input.asBool().value = value;
  } else {
    console.warn(`Input ${name} is not a number, trigger, or bool`);
  }
}

/**
 * Gets the global Rive WASM runtime instance.
 *
 * This is guaranteed to be loaded because QuinoaMain waits for lowLevelRiveAtom
 * before initializing the game. If this throws, something is fundamentally broken.
 *
 * @returns The global LowLevelRive instance
 * @throws If Rive runtime hasn't loaded (should never happen in normal flow)
 */
export function getRiveRuntime(): LowLevelRive {
  const { get } = getDefaultStore();
  const loadable = get(lowLevelRiveAtom);

  if (loadable.state !== 'hasData') {
    throw new Error(
      'Rive runtime not loaded. This should never happen - ' +
        'QuinoaMain ensures Rive loads before game initialization.'
    );
  }

  return loadable.data;
}

export type {
  Image as RiveImage,
  ImageAsset as RiveImageAsset,
} from '@rive-app/webgl2-advanced';
export type { LowLevelRive, LowLevelRiveFile };
