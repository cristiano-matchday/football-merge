import { Container, Sprite, Texture } from "pixi.js";
import { emitter } from "@/emitter";
import { PitchPlayerData } from "@/types";
import { PitchPlayer } from "./PitchPlayer";
import { logicalHeight, logicalWidth } from "@/scenes/Scene";

export class SoccerBoard extends Container {
  private myFormation = new Container();
  private opponentFormation = new Container();
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

  public drawMyFormation(formation: PitchPlayerData[]) {
    this.myFormation.removeChildren();
    this.myFormation.removeAllListeners();

    formation.forEach((pitchPlayerData) => {
      const pitchPlayer = new PitchPlayer(pitchPlayerData, true);
      pitchPlayer.enableClick();
      this.myFormation.addChild(pitchPlayer);
    });

    this.myFormation.addEventListener("pointerdown", (e) => {
      const pitchPlayer = e.target as PitchPlayer;
      this.lastClickedPitchPlayer = pitchPlayer;
      emitter.emit("show_my_hand");
    });

    this.disableMyBoard();
  }

  public drawOpponentFormation(formation: PitchPlayerData[]) {
    this.opponentFormation.removeChildren();
    this.opponeFormationMap.clear();

    formation.forEach((pitchPlayerData) => {
      const pitchPlayer = new PitchPlayer(pitchPlayerData, false);
      this.opponentFormation.addChild(pitchPlayer);

      this.opponeFormationMap.set(pitchPlayerData.id, pitchPlayer);
    });
  }

  public enableMyBoard() {
    this.myFormation.eventMode = "dynamic";
  }

  public disableMyBoard() {
    this.myFormation.eventMode = "none";
    this.myFormation.cursor = "not-allowed";
  }

  public getOpponentPitchPlayer(id: number) {
    return this.opponeFormationMap.get(id);
  }
}
