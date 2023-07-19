import { myFormation421, opponendFormation421 } from "@/data/421";
import { myDeck, opponentDeck } from "@/data/cards";
import { emitter } from "@/emitter";
import { FilledPitchPlayerData, Goal } from "@/types";
import {
  delay,
  getFormationStatistcs,
  getForwardsPrecision,
  getGKPrecision,
  randomElement,
  randomIntFromInterval,
} from "@/utils";

class GameLoop {
  private myDeck = [...myDeck];
  private myFormationTemplate = [...myFormation421];

  private opponentDeck = [...opponentDeck];
  private opponentFormationTemplate = [...opponendFormation421];

  private myFormation: FilledPitchPlayerData[] = [];
  private opponentFormation: FilledPitchPlayerData[] = [];

  private myStats = { atk: 0, def: 0 };
  private opponentStats = { atk: 0, def: 0 };

  private myGoals: Goal[] = [];
  private opponentGoals: Goal[] = [];

  public init() {
    emitter.on("init", () => this.startMatch());
  }

  private async startMatch() {
    emitter.emit("start_match", {
      myDeck: this.myDeck,
      myFormationTemplate: this.myFormationTemplate,
      opponentFormationTemplate: this.opponentFormationTemplate,
    });

    await delay(3000);

    emitter.emit("my_turn");

    emitter.on("my_turn_end", async (newPlayerEntry) => {
      this.myFormation.push(newPlayerEntry);

      this.emitUpdateMyScore();

      const { randomCard, randomPitchPlayer } = this.pickACardForOpponent();

      const { atk: opponentAtk, def: opponentDef } = getFormationStatistcs(
        this.opponentFormation
      );

      this.opponentStats.atk = opponentAtk;
      this.opponentStats.def = opponentDef;

      emitter.emit("opponent_turn", {
        card: randomCard,
        pitchPlayerId: randomPitchPlayer.id,
        opponentAtk,
        opponentDef,
      });

      if (this.myFormation.length === 8) {
        await delay(1000);
        this.computeMyAtkPhase();
        await delay(5000);
        this.computeMyDefPhase();
        await delay(4000);
        this.computeFirstHalf();
      } else {
        emitter.emit("opponent_turn_end", {
          card: randomCard,
          pitchPlayerId: randomPitchPlayer.id,
        });

        await delay(2000);

        emitter.emit("my_turn");
      }
    });
  }

  private emitUpdateMyScore() {
    const { atk: myAtk, def: myDef } = getFormationStatistcs(this.myFormation);

    this.myStats.atk = myAtk;
    this.myStats.def = myDef;

    emitter.emit("update_my_score", { myAtk, myDef });
  }

  private computeFirstHalf() {
    const myScore = this.myGoals.filter((g) => g.isGoal).length;
    const opponentScore = this.opponentGoals.filter((g) => g.isGoal).length;

    emitter.emit("first_half", { myScore, opponentScore });
  }

  private computeMyDefPhase() {
    const penetration = this.opponentStats.atk - this.myStats.def;
    const myPrecision = getGKPrecision(this.myFormation);
    const opponentPrecision = getForwardsPrecision(this.opponentFormation);
    const goals = [];

    let numberOfGoalsChance = 0;

    if (penetration <= 0) {
      numberOfGoalsChance = 1;
    } else {
      //TBD
      numberOfGoalsChance = 2;
    }

    for (let i = 0; i < numberOfGoalsChance; i++) {
      const goalPercentage = (10 * (i + 1) * opponentPrecision) / myPrecision;
      const random = randomIntFromInterval(1, 100);
      const isGoal = goalPercentage > random;

      goals.push({
        goalPercentage,
        random,
        isGoal,
      });

      console.log(["[Computing Goal Percentage for Opponent: "], {
        goalPercentage,
        random,
        isGoal,
        goals,
        myPrecision,
        opponentPrecision,
      });
    }

    this.opponentGoals = goals;
    emitter.emit("compute_my_def_phase", {
      myDef: this.myStats.def,
      opponentAtk: this.opponentStats.atk,
      goals,
    });
  }

  private computeMyAtkPhase() {
    console.log("[Formation full]: Time to compute");

    const penetration = this.myStats.atk - this.opponentStats.def;
    const myPrecision = getForwardsPrecision(this.myFormation);
    const opponentPrecision = getGKPrecision(this.opponentFormation);
    const goals = [];

    let numberOfGoalsChance = 0;

    if (penetration <= 0) {
      numberOfGoalsChance = 1;
    } else {
      //TBD
      numberOfGoalsChance = 2;
    }

    for (let i = 0; i < numberOfGoalsChance; i++) {
      const goalPercentage = (10 * (i + 1) * myPrecision) / opponentPrecision;
      const random = randomIntFromInterval(1, 100);
      const isGoal = goalPercentage > random;

      goals.push({
        goalPercentage,
        random,
        isGoal,
      });

      console.log(["[Computing Goal Percentage: "], {
        goalPercentage,
        random,
        isGoal,
        goals,
        myPrecision,
        opponentPrecision,
      });
    }

    this.myGoals = goals;

    emitter.emit("compute_my_atk_phase", {
      myAtk: this.myStats.atk,
      opponentDef: this.opponentStats.def,
      goals,
    });
  }

  private pickACardForOpponent() {
    const randomCard = randomElement(this.opponentDeck);
    const randomPitchPlayer = randomElement(this.opponentFormationTemplate);

    this.opponentDeck = this.opponentDeck.filter((c) => c.id !== randomCard.id);

    this.opponentFormationTemplate = this.opponentFormationTemplate.filter(
      (ft) => ft.id !== randomPitchPlayer.id
    );

    this.opponentFormation.push({
      ...randomPitchPlayer,
      player: randomCard,
    });

    return { randomCard, randomPitchPlayer };
  }
}

export const gameLoop = new GameLoop();
