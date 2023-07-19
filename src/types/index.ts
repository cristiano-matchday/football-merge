export type FilledPitchPlayerData = {
  id: number;
  role: string;
  position: [number, number];
  color: number;
  player: PlayerData;
};

export type FormationName = "4-2-1";

export type Role = "M" | "F" | "D" | "GKP";

export type PlayerData = {
  id: number;
  src: string;
  name: string;
  role: Role;
  atk: number;
  def: number;
  precision: number;
  stamina: number;
  nationality: string;
  club: string;
};

export type Stats = {
  atk: number;
  def: number;
};

export type MergeAction = "Dribble" | "Tackle" | "Shoot";

export type MergeItem = "Ball" | "Shoes" | "Gloves";

export type MergeEntity<T extends MergeAction | MergeItem> = {
  name: T;
  maxLevel: number;
};

export type OnSetMergeEntity<T extends MergeAction | MergeItem> = {
  name: T;
  currentLevel: number;
};
