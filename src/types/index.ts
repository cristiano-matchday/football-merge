type PitchPlayerData = {
  id: number;
  role: string;
  position: [number, number];
  color: number;
};

export interface FilledPitchPlayerData extends PitchPlayerData {
  player: PlayerData;
}

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

export type Goal = {
  goalPercentage: number;
  random: number;
  isGoal: boolean;
};

export type Stats = {
  atk: number;
  def: number;
};
