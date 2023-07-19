import { MergeAction, MergeEntity, MergeItem } from "@/types";

export const actions: MergeEntity<MergeAction>[] = [
  {
    name: "Dribble",
    maxLevel: 10,
  },
  {
    name: "Tackle",
    maxLevel: 10,
  },
  {
    name: "Shoot",
    maxLevel: 10,
  },
];

export const items: MergeEntity<MergeItem>[] = [
  {
    name: "Ball",
    maxLevel: 4,
  },
  {
    name: "Shoes",
    maxLevel: 4,
  },
  {
    name: "Gloves",
    maxLevel: 4,
  },
];
