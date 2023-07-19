import {
  PlayerData,
  PitchPlayerData,
  FilledPitchPlayerData,
  Goal,
} from "@/types";
import mitt from "mitt";

type Events = {
  init: void;
  start_match: {
    myDeck: PlayerData[];
    myFormationTemplate: PitchPlayerData[];
    opponentFormationTemplate: PitchPlayerData[];
  };
  my_turn: void;
  my_turn_end: FilledPitchPlayerData;
  opponent_turn: {
    card: PlayerData;
    pitchPlayerId: number;
    opponentAtk: number;
    opponentDef: number;
  };
  opponent_turn_end: {
    card: PlayerData;
    pitchPlayerId: number;
  };
  update_my_score: { myAtk: number; myDef: number };
  compute_my_atk_phase: {
    myAtk: number;
    opponentDef: number;
    goals: Goal[];
  };
  compute_my_def_phase: {
    opponentAtk: number;
    myDef: number;
    goals: Goal[];
  };
  first_half: {
    myScore: number;
    opponentScore: number;
  };
};

export const emitter = mitt<Events>();
