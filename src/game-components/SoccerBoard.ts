import { Container, Sprite, Texture } from "pixi.js";
import { FilledPitchPlayerData } from "@/types";
import { PitchPlayer } from "./PitchPlayer";
import { logicalHeight, logicalWidth } from "@/scenes/Scene";

export class SoccerBoard extends Container {
  private myFormation = new Container();
  private opponentFormation = new Container();

  private myFormationMap = new Map<number, PitchPlayer>();
  private opponeFormationMap = new Map<number, PitchPlayer>();

  public lastClickedPitchPlayer: PitchPlayer | null = null;

  constructor() {
    super();
    this.setupBackground();
  }

  private setupBackground() {
    const sprite = new Sprite(Texture.from("football-pitch"));
    sprite.width = logicalHeight;
    sprite.height = logicalWidth;
    sprite.y = sprite.width / 2;
    sprite.x = sprite.height / 2;
    sprite.anchor.set(0.5);
    sprite.angle = 90;

    this.addChild(sprite, this.myFormation, this.opponentFormation);
  }

  public drawMyFormation(formation: FilledPitchPlayerData[]) {
    this.myFormation.removeChildren();
    this.myFormation.removeAllListeners();
    this.myFormationMap.clear();

    formation.forEach((pitchPlayerData) => {
      const pitchPlayer = new PitchPlayer(pitchPlayerData, true);
      this.myFormation.addChild(pitchPlayer);
      this.myFormationMap.set(pitchPlayerData.id, pitchPlayer);
    });

    this.myFormation.addEventListener("pointerdown", (e) => {
      const pitchPlayer = e.target as PitchPlayer;
      this.lastClickedPitchPlayer = pitchPlayer;
    });
  }

  public drawOpponentFormation(formation: FilledPitchPlayerData[]) {
    this.opponentFormation.removeChildren();
    this.opponeFormationMap.clear();

    formation.forEach((pitchPlayerData) => {
      const pitchPlayer = new PitchPlayer(pitchPlayerData, false);
      this.opponentFormation.addChild(pitchPlayer);

      this.opponeFormationMap.set(pitchPlayerData.id, pitchPlayer);
    });
  }

  public getMyPitchPlayer(id: number) {
    return this.myFormationMap.get(id);
  }

  public getOpponentPitchPlayer(id: number) {
    return this.opponeFormationMap.get(id);
  }
}
