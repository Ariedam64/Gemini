import { atom } from 'jotai';
import { TaskId } from '@/common/games/Quinoa/systems/tasks/TaskId';
import { isVirtualDPadActiveAtom } from '@/Quinoa/components/QuinoaCanvas/systems/input/TouchDPad';
import { type ActionType, actionAtom } from '@/Quinoa/data/action/actionAtom';
import { activeModalAtom } from './modalAtom';
import {
  isInMyGardenAtom,
  isTutorialCompleteAtom,
  myActiveTasksAtom,
  myCompletedTasksAtom,
  myOwnCurrentDirtTileIndexAtom,
  myOwnCurrentGardenObjectAtom,
  myValidatedSelectedItemIndexAtom,
} from './myAtoms';

export const isWelcomeToastVisibleAtom = atom((get) => {
  const activeTasks = get(myActiveTasksAtom);
  return activeTasks.includes(TaskId.firstPlayerMove);
});

export const shouldCloseWelcomeToastAtom = atom((get) => {
  const activeTasks = get(myActiveTasksAtom);
  const currentDirtTileIndex = get(myOwnCurrentDirtTileIndexAtom);
  return (
    activeTasks.includes(TaskId.firstItemSelect) &&
    currentDirtTileIndex !== null
  );
});

export const isInitialMoveToDirtPatchToastVisibleAtom = atom((get) => {
  const completedTasks = get(myCompletedTasksAtom);
  const isEmptyDirtTileHighlighted = get(isEmptyDirtTileHighlightedAtom);
  return (
    !completedTasks.includes(TaskId.firstSeedPlant) &&
    isEmptyDirtTileHighlighted
  );
});

export const isFirstPlantSeedActiveAtom = atom((get) => {
  const activeTasks = get(myActiveTasksAtom);
  return activeTasks.includes(TaskId.firstSeedPlant);
});

export const isThirdSeedPlantActiveAtom = atom((get) => {
  const activeTasks = get(myActiveTasksAtom);
  return activeTasks.includes(TaskId.thirdSeedPlant);
});

export const isThirdSeedPlantCompletedAtom = atom((get) => {
  const completedTasks = get(myCompletedTasksAtom);
  return completedTasks.includes(TaskId.thirdSeedPlant);
});

export const isDemoTouchpadVisibleAtom = atom((get) => {
  const isVirtualDPadActive = get(isVirtualDPadActiveAtom);
  const activeTasks = get(myActiveTasksAtom);
  return activeTasks.includes(TaskId.firstPlayerMove) && !isVirtualDPadActive;
});

export const areShopAnnouncersEnabledAtom = atom((get) => {
  const isTutorialComplete = get(isTutorialCompleteAtom);
  return isTutorialComplete;
});

export const arePresentablesEnabledAtom = atom((get) => {
  const isTutorialComplete = get(isTutorialCompleteAtom);
  return isTutorialComplete;
});

export const isEmptyDirtTileHighlightedAtom = atom((get) => {
  const activeTasks = get(myActiveTasksAtom);
  const currentDirtTileIndex = get(myOwnCurrentDirtTileIndexAtom);
  const currentGardenObject = get(myOwnCurrentGardenObjectAtom);
  return (
    activeTasks.includes(TaskId.firstPlayerMove) ||
    ((activeTasks.includes(TaskId.firstItemSelect) ||
      activeTasks.includes(TaskId.firstSeedPlant) ||
      activeTasks.includes(TaskId.secondSeedPlant) ||
      activeTasks.includes(TaskId.thirdSeedPlant)) &&
      (currentDirtTileIndex === null || !!currentGardenObject))
  );
});

export const isPlantTileHighlightedAtom = atom((get) => {
  const isFirstCropHarvestActive = get(isFirstCropHarvestActiveAtom);
  const currentGardenObject = get(myOwnCurrentGardenObjectAtom);
  return isFirstCropHarvestActive && !currentGardenObject;
});

export const isItemHiglightedInHotbarAtom = atom((get) => {
  const activeTasks = get(myActiveTasksAtom);
  const activeModal = get(activeModalAtom);
  const currentDirtTileIndex = get(myOwnCurrentDirtTileIndexAtom);
  const selectedItemIndex = get(myValidatedSelectedItemIndexAtom);
  const currentGardenObject = get(myOwnCurrentGardenObjectAtom);
  return (
    (activeTasks.includes(TaskId.firstItemSelect) ||
      activeTasks.includes(TaskId.firstSeedPlant) ||
      activeTasks.includes(TaskId.secondSeedPlant) ||
      activeTasks.includes(TaskId.thirdSeedPlant)) &&
    !activeModal &&
    currentDirtTileIndex !== null &&
    selectedItemIndex === null &&
    !currentGardenObject
  );
});

export const isItemHighlightedInModalAtom = atom((get) => {
  const activeTasks = get(myActiveTasksAtom);
  const currentDirtTileIndex = get(myOwnCurrentDirtTileIndexAtom);
  const selectedItemIndex = get(myValidatedSelectedItemIndexAtom);
  const currentGardenObject = get(myOwnCurrentGardenObjectAtom);
  return (
    (activeTasks.includes(TaskId.firstItemSelect) ||
      activeTasks.includes(TaskId.firstSeedPlant) ||
      activeTasks.includes(TaskId.secondSeedPlant) ||
      activeTasks.includes(TaskId.thirdSeedPlant)) &&
    currentDirtTileIndex !== null &&
    selectedItemIndex === null &&
    !currentGardenObject
  );
});

export const isMyGardenButtonHighlightedAtom = atom((get) => {
  const activeTasks = get(myActiveTasksAtom);
  const isInMyGarden = get(isInMyGardenAtom);
  return (
    (activeTasks.includes(TaskId.firstItemSelect) ||
      activeTasks.includes(TaskId.firstSeedPlant) ||
      activeTasks.includes(TaskId.firstCropHarvest) ||
      activeTasks.includes(TaskId.secondSeedPlant)) &&
    !isInMyGarden
  );
});

export const isSellButtonHighlightedAtom = atom((get) => {
  const activeTasks = get(myActiveTasksAtom);
  const action = get(actionAtom);
  return (
    activeTasks.includes(TaskId.firstCropSell) && action !== 'sellAllCrops'
  );
});

export const isShopButtonHighlightedAtom = atom((get) => {
  const activeTasks = get(myActiveTasksAtom);
  const action = get(actionAtom);
  const activeModal = get(activeModalAtom);
  return (
    activeTasks.includes(TaskId.firstSeedPurchase) &&
    action !== 'seedShop' &&
    activeModal !== 'seedShop'
  );
});

export const isInstaGrowButtonHiddenAtom = atom((get) => {
  const completedTasks = get(myCompletedTasksAtom);
  return !completedTasks.includes(TaskId.thirdSeedPlant);
});

export const isActionButtonHighlightedAtom = atom((get) => {
  const tutorialTasksByAction: Partial<Record<ActionType, TaskId[]>> = {
    plantSeed: [
      TaskId.firstSeedPlant,
      TaskId.secondSeedPlant,
      TaskId.thirdSeedPlant,
    ],
    harvest: [TaskId.firstCropHarvest],
    sellAllCrops: [TaskId.firstCropSell],
    purchaseSeed: [TaskId.firstSeedPurchase, TaskId.secondSeedPurchase],
    seedShop: [TaskId.firstSeedPurchase, TaskId.secondSeedPurchase],
  };
  const activeTasks = get(myActiveTasksAtom);
  const action = get(actionAtom);
  return (
    tutorialTasksByAction[action]?.some((taskId) =>
      activeTasks.some((task) => task === taskId)
    ) ?? false
  );
});

export const isGardenItemInfoCardHiddenAtom = atom((get) => {
  const isFirstCropHarvestActive = get(isFirstCropHarvestActiveAtom);
  return isFirstCropHarvestActive;
});

export const isSeedPurchaseButtonHighlightedAtom = atom((get) => {
  const activeTasks = get(myActiveTasksAtom);
  return (
    activeTasks.includes(TaskId.firstSeedPurchase) ||
    activeTasks.includes(TaskId.secondSeedPurchase)
  );
});

export const isFirstSeedPurchaseActiveAtom = atom((get) => {
  const activeTasks = get(myActiveTasksAtom);
  return activeTasks.includes(TaskId.firstSeedPurchase);
});

export const isFirstCropHarvestActiveAtom = atom((get) => {
  const activeTasks = get(myActiveTasksAtom);
  return activeTasks.includes(TaskId.firstCropHarvest);
});

export const isWeatherStatusHighlightedAtom = atom((get) => {
  const activeTasks = get(myActiveTasksAtom);
  return activeTasks.includes(TaskId.weatherIntroduction);
});
