import { FilledPitchPlayerData } from "@/types";

export const getTeamColor = (isMe: boolean) => (isMe ? 0x39b0eb : 0xd92c3c);

export const getFormationStatistcs = (formation: FilledPitchPlayerData[]) => {
  const atk = formation.reduce((acc, val) => acc + val.player.atk, 0);
  const def = formation.reduce((acc, val) => acc + val.player.def, 0);

  return { atk, def };
};

export const getForwardsPrecision = (formation: FilledPitchPlayerData[]) => {
  const precision = formation.reduce(
    (acc, val) => acc + (val.player.role === "F" ? val.player.precision : 0),
    0
  );

  return precision;
};

export const getGKPrecision = (formation: FilledPitchPlayerData[]) => {
  const precision = formation.reduce(
    (acc, val) => acc + (val.player.role === "GKP" ? val.player.precision : 0),
    0
  );

  return precision;
};

export const randomElement = <T>(array: T[]) =>
  array[Math.floor(Math.random() * array.length)];

export const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(() => resolve(), ms));

export const randomIntFromInterval = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);
