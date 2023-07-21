import { Container, Sprite, Texture } from "pixi.js";
import { BoardCell } from "./BoardCell";
import { MergeAction, MergeItem, OnSetMergeEntity } from "@/types";
import { DraggableItem } from "./DraggableItem";

export class MergeBoard extends Container {
  private target: DraggableItem | null = null;
  private dataMatrix: OnSetMergeEntity<MergeAction | MergeItem>[][] = [
    [
      {
        name: "Dribble",
        currentLevel: 0,
      },
      {
        name: "Dribble",
        currentLevel: 0,
      },
      {
        name: "Dribble",
        currentLevel: 0,
      },
      {
        name: "Dribble",
        currentLevel: 0,
      },
      {
        name: "Dribble",
        currentLevel: 0,
      },
    ],
    [
      {
        name: "Dribble",
        currentLevel: 0,
      },
      {
        name: "Dribble",
        currentLevel: 0,
      },
      {
        name: "Dribble",
        currentLevel: 0,
      },
      {
        name: "Dribble",
        currentLevel: 0,
      },
      {
        name: "Dribble",
        currentLevel: 0,
      },
    ],
    [
      {
        name: "Dribble",
        currentLevel: 0,
      },
      {
        name: "Dribble",
        currentLevel: 0,
      },
      {
        name: "Dribble",
        currentLevel: 0,
      },
      {
        name: "Dribble",
        currentLevel: 0,
      },
      {
        name: "Dribble",
        currentLevel: 0,
      },
    ],
    [
      {
        name: "Dribble",
        currentLevel: 0,
      },
      {
        name: "Dribble",
        currentLevel: 0,
      },
      {
        name: "Dribble",
        currentLevel: 0,
      },
      {
        name: "Dribble",
        currentLevel: 0,
      },
      {
        name: "Dribble",
        currentLevel: 0,
      },
    ],
    [
      {
        name: "Dribble",
        currentLevel: 0,
      },
      {
        name: "Dribble",
        currentLevel: 0,
      },
      {
        name: "Dribble",
        currentLevel: 0,
      },
      {
        name: "Dribble",
        currentLevel: 0,
      },
      {
        name: "Dribble",
        currentLevel: 0,
      },
    ],
  ];

  constructor() {
    super();

    const background = new Sprite(Texture.WHITE);
    background.width = 400;
    background.height = 400;

    const cellsContainer = new Container();

    this.addChild(background, cellsContainer);

    const cellSize = 80;

    this.dataMatrix.forEach((row, yIndex) => {
      row.forEach((element, xIndex) => {
        const boardCell = new BoardCell(
          cellSize,
          element.name,
          element.currentLevel
        );

        boardCell.position.x = cellSize * xIndex;
        boardCell.position.y = cellSize * yIndex;
        element.position = boardCell.position;

        const draggableItem = new DraggableItem(
          `${element.name}\nLvl:${element.currentLevel}`,
          `text-${yIndex}-${xIndex}`
        );

        draggableItem.position = boardCell.position;
        draggableItem.interactive = true;

        draggableItem.on("pointermove", () => {
          console.log("up", { yIndex, xIndex });
        });

        cellsContainer.addChild(boardCell, draggableItem);
      });
    });

    cellsContainer.sortableChildren = true;
    cellsContainer.interactive = true;

    cellsContainer.addEventListener("pointerdown", (e) => {
      if (!(e.target instanceof DraggableItem)) return;
      this.target = e.target;
      this.target.data = e;
    });

    cellsContainer.addEventListener("pointermove", () => {
      if (this.target) {
        const newPosition = this.target.data!.getLocalPosition(
          this.target.parent
        );
        this.target.position.x = newPosition.x;
        this.target.position.y = newPosition.y;
        this.target.zIndex = 9999;
        this.target.interactive = false;
      }
    });

    cellsContainer.addEventListener("pointerup", (e) => {
      // @ts-ignore
      console.log(e.target.name);
      console.log(this.target?.position, this.dataMatrix[0]);
      this.target!.interactive = true;
      this.target = null;
    });
  }
}
