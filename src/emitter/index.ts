import { FilledPitchPlayerData, Goal, Stats } from "@/types";
import mitt from "mitt";

type Events = {
  init: void;
  start_match: {
    myFormationTemplate: FilledPitchPlayerData[];
    opponentFormationTemplate: FilledPitchPlayerData[];
    myStats: Stats;
    opponentStats: Stats;
  };
  my_turn: void;
  my_turn_end: void;
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
