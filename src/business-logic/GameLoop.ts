import { myFormation421, opponendFormation421 } from "@/data/421";
import { emitter } from "@/emitter";
import { Stats } from "@/types";
import { delay, getFormationStatistcs } from "@/utils";

class GameLoop {
  private myFormationTemplate = [...myFormation421];

  private opponentFormationTemplate = [...opponendFormation421];

  private myStats: Stats = { atk: 0, def: 0 };
  private opponentStats: Stats = { atk: 0, def: 0 };

  public init() {
    emitter.on("init", () => this.startMatch());
  }

  private async startMatch() {
    const { atk: myAtk, def: myDef } = getFormationStatistcs(
      this.myFormationTemplate
    );

    this.myStats.atk = myAtk;
    this.myStats.def = myDef;

    const { atk: opponentAtk, def: opponentDef } = getFormationStatistcs(
      this.opponentFormationTemplate
    );

    this.opponentStats.atk = opponentAtk;
    this.opponentStats.def = opponentDef;

    emitter.emit("start_match", {
      myFormationTemplate: this.myFormationTemplate,
      opponentFormationTemplate: this.opponentFormationTemplate,
      myStats: this.myStats,
      opponentStats: this.opponentStats,
    });

    await delay(3000);

    emitter.emit("my_turn");

    emitter.on("my_turn_end", async () => {
      //
    });
  }
}

export const gameLoop = new GameLoop();
