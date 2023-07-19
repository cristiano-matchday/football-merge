import { WatchContainer } from "../core/WatchContainer";
import { SoccerBoard } from "../game-components/SoccerBoard";
import { ScoreBoard } from "../game-components/ScoreBoard";
import { emitter } from "../emitter";
import { ActionPanel } from "@/game-components/ActionPanel";
import { MergeBoard } from "@/game-components/merge-board/MergeBoard";

export class GameScene extends WatchContainer {
  private soccerBoard = new SoccerBoard();
  private scoreBoard = new ScoreBoard();
  private actionPanel = new ActionPanel();
  private mergeBoard = new MergeBoard();

  constructor() {
    super();

    this.addPlayerBoard();
    this.addScoreBoard();
    this.addMergeBoard();
    this.addActionPanel();
    this.setupListeners();

    this.actionPanel.visible = false;
    emitter.emit("init");
  }

  private addMergeBoard() {
    this.mergeBoard.position.set(15, 200);
    this.addChild(this.mergeBoard);
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
  }

  private handleMyTurnListener() {
    emitter.on("my_turn", () => {
      // this.soccerBoard.enableMyBoard();
    });
  }

  private handleStartMatchListener() {
    emitter.on(
      "start_match",
      async ({
        myFormationTemplate,
        opponentFormationTemplate,
        myStats,
        opponentStats,
      }) => {
        this.soccerBoard.drawMyFormation(myFormationTemplate);
        this.soccerBoard.drawOpponentFormation(opponentFormationTemplate);
        this.scoreBoard.updateMyScore(myStats);
        this.scoreBoard.updateOpponentScore(opponentStats);
      }
    );
  }
}
