import { WatchContainer } from "../core/WatchContainer";
import { SoccerBoard } from "../game-components/SoccerBoard";
import { ScoreBoard } from "../game-components/ScoreBoard";
import { emitter } from "../emitter";
import { delay } from "../utils";
import { ActionPanel } from "@/game-components/ActionPanel";

export class GameScene extends WatchContainer {
  private soccerBoard = new SoccerBoard();
  private scoreBoard = new ScoreBoard();
  private actionPanel = new ActionPanel();

  constructor() {
    super();

    this.addPlayerBoard();
    this.addScoreBoard();
    this.addActionPanel();
    this.setupListeners();

    emitter.emit("init");
  }

  private addActionPanel() {
    this.addChild(this.actionPanel);
  }

  private addPlayerBoard() {
    this.addChild(this.soccerBoard);
  }

  private addScoreBoard() {
    this.addChild(this.scoreBoard);
  }

  private setupListeners() {
    this.handleStartMatchListener();
    this.handleMyTurnListener();
    this.handleUpdateMyScoreListener();
    this.handleOpponentTurnListener();
    this.handleOpponentTurnEndListener();
    this.handleComputeMyAtkPhase();
    this.handleComputeMyDefPhase();
    this.handleFirstHalf();
  }

  private handleFirstHalf() {
    emitter.on("first_half", async ({ myScore, opponentScore }) => {
      await this.actionPanel.show();
      this.actionPanel.updateLabel(`First half is over\n`);
      await delay(1800);
      const iWon = myScore > opponentScore;
      const iLost = myScore < opponentScore;
      const weTied = myScore === opponentScore;
      if (iWon) {
        this.actionPanel.updateLabel(
          `Current score is\n${myScore}:${opponentScore}!\nYou Won!\nThanks for playing this prototype!`
        );
        return;
      }
      if (iLost) {
        this.actionPanel.updateLabel(
          `Current score is\n${myScore}:${opponentScore}!\nYou Lost!\nBetter luck next time\nThanks for playing this prototype!`
        );
        return;
      }
      if (weTied) {
        this.actionPanel.updateLabel(
          `Current score is\n${myScore}:${opponentScore}!\nTie!\nThanks for playing this prototype!`
        );
        return;
      }
    });
  }

  private handleComputeMyDefPhase() {
    emitter.on("compute_my_atk_phase", async ({ goals }) => {
      const scoredGoals = goals.filter((g) => g.isGoal === true);

      await this.actionPanel.show();
      this.actionPanel.updateLabel(`Your forwards are attempting to score! \n`);
      await delay(1800);
      this.actionPanel.updateLabel(
        `Your team scored\n${scoredGoals.length} goals!\n`
      );
    });
  }

  private handleComputeMyAtkPhase() {
    emitter.on("compute_my_def_phase", async ({ goals }) => {
      const scoredGoals = goals.filter((g) => g.isGoal === true);

      await this.actionPanel.show();
      this.actionPanel.updateLabel(`Your opponent is dangeroulsy\napproaching`);

      await delay(1800);
      this.actionPanel.updateLabel(
        `The opponent scored\n${scoredGoals.length} goals!\n`
      );
    });
  }

  private handleOpponentTurnEndListener() {
    emitter.on("opponent_turn_end", async ({ card, pitchPlayerId }) => {
      const opponentPitchPlayer =
        this.soccerBoard.getOpponentPitchPlayer(pitchPlayerId);
      await this.actionPanel.show();
      this.actionPanel.updateLabel(
        `Your opponent played\n\n${card.name} in\n\n${opponentPitchPlayer?.pitchPlayerData.role} position`
      );

      await delay(1500);
      this.actionPanel.hide();
    });
  }

  private handleOpponentTurnListener() {
    emitter.on(
      "opponent_turn",
      ({ card, pitchPlayerId, opponentAtk, opponentDef }) => {
        // this.soccerBoard.disableMyBoard();
        const opponentPitchPlayer =
          this.soccerBoard.getOpponentPitchPlayer(pitchPlayerId);

        opponentPitchPlayer?.fillPlayerData(card);

        this.scoreBoard.updateOpponentScore(opponentAtk, opponentDef);
      }
    );
  }

  private handleUpdateMyScoreListener() {
    emitter.on("update_my_score", ({ myAtk, myDef }) => {
      this.scoreBoard.updateMyScore(myAtk, myDef);
    });
  }

  private handleMyTurnListener() {
    emitter.on("my_turn", () => {
      // this.soccerBoard.enableMyBoard();
    });
  }

  private handleStartMatchListener() {
    emitter.on(
      "start_match",
      async ({ myFormationTemplate, opponentFormationTemplate }) => {
        this.soccerBoard.drawMyFormation(myFormationTemplate);
        this.soccerBoard.drawOpponentFormation(opponentFormationTemplate);

        this.actionPanel.updateLabel(
          "You have been assigned a deck of 11 cards.\n"
        );

        await delay(1800);

        this.actionPanel.updateLabel(
          "Fill the positions considering the stats.\n"
        );

        await delay(1800);

        this.actionPanel.updateLabel(
          "On the top left and top right\nyou will see a score.\n"
        );

        await delay(1800);

        this.actionPanel.updateLabel("It's your turn!\n");

        await delay(1800);

        this.actionPanel.hide();
      }
    );
  }
}
