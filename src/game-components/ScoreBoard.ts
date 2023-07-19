import { getTeamColor } from "@/utils";
import { Container, Text } from "pixi.js";

export class ScoreBoard extends Container {
  private myScore = {
    atk: 0,
    def: 0,
  };

  private opponendScore = {
    atk: 0,
    def: 0,
  };

  private myAtkLabel = new Text("", { fill: getTeamColor(true) });
  private myDefLabel = new Text("", { fill: getTeamColor(true) });

  private opponentAtkLabel = new Text("", { fill: getTeamColor(false) });
  private opponentDefLabel = new Text("", { fill: getTeamColor(false) });

  constructor() {
    super();

    this.addChild(
      this.myAtkLabel,
      this.myDefLabel,
      this.opponentAtkLabel,
      this.opponentDefLabel
    );

    this.position.set(10, 15);
    this.myDefLabel.y = this.myAtkLabel.height;

    this.opponentAtkLabel.x = 330;
    this.opponentDefLabel.x = this.opponentAtkLabel.x;
    this.opponentDefLabel.y = this.myAtkLabel.height;

    this.updateMyScore(0, 0);
    this.updateOpponentScore(0, 0);
  }

  public updateMyScore(atk: number, def: number) {
    this.myScore.atk = atk;
    this.myScore.def = def;

    this.myAtkLabel.text = `Atk: ${this.myScore.atk}`;
    this.myDefLabel.text = `Def: ${this.myScore.def}`;
  }

  public updateOpponentScore(atk: number, def: number) {
    this.opponendScore.atk = atk;
    this.opponendScore.def = def;

    this.opponentAtkLabel.text = `Atk: ${this.opponendScore.atk}`;
    this.opponentDefLabel.text = `Def: ${this.opponendScore.def}`;
  }
}
