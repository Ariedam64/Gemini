import * as v from 'valibot';
import { TaskId } from './TaskId';
import { TaskBlueprint } from './tasks-blueprint';

export const tasksDex: Record<TaskId, TaskBlueprint> = {
  firstPlayerMove: {
    name: 'First Move',
    description: 'Move around your garden for the first time',
    trigger: 'move',
  },
  firstItemSelect: {
    name: 'First Item Select',
    description: 'Select your first item from inventory',
    trigger: 'pickupObject',
  },
  firstSeedPlant: {
    name: 'First Plant',
    description: 'Plant your first seed in your garden',
    trigger: 'plantSeed',
    prerequisites: [TaskId.firstItemSelect],
  },
  firstCropHarvest: {
    name: 'First Harvest',
    description: 'Harvest your first crop from your garden',
    trigger: 'harvest',
    prerequisites: [TaskId.firstSeedPlant],
  },
  firstCropSell: {
    name: 'First Sale',
    description: 'Sell your first crop',
    trigger: 'sellAllCrops',
    prerequisites: [TaskId.firstCropHarvest],
  },
  firstSeedPurchase: {
    name: 'First Seed Purchase',
    description: 'Purchase your first seed from the shop',
    trigger: 'purchaseSeed',
    prerequisites: [TaskId.firstCropSell],
  },
  secondSeedPurchase: {
    name: 'Second Seed Purchase',
    description: 'Purchase your second seed from the shop',
    trigger: 'purchaseSeed',
    prerequisites: [TaskId.firstSeedPurchase],
  },
  secondSeedPlant: {
    name: 'Second Plant',
    description: 'Plant your second seed in your garden',
    trigger: 'plantSeed',
    prerequisites: [TaskId.secondSeedPurchase],
  },
  thirdSeedPlant: {
    name: 'Third Plant',
    description: 'Plant your third seed in your garden',
    trigger: 'plantSeed',
    prerequisites: [TaskId.secondSeedPlant],
  },
  weatherIntroduction: {
    name: 'Weather Introduction',
    description: 'Learn about the weather',
    trigger: 'checkWeatherStatus',
    prerequisites: [TaskId.thirdSeedPlant],
  },
};

export const taskIds = Object.values(TaskId);
export const TaskIdSchema = v.picklist(taskIds);
export const taskEntries = Object.entries(tasksDex) as Array<
  [TaskId, TaskBlueprint]
>;
