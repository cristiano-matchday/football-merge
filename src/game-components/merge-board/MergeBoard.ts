import { Container, Sprite, Texture } from "pixi.js";
import { BoardCell } from "./BoardCell";
import { MergeAction, MergeItem, OnSetMergeEntity } from "@/types";

export class MergeBoard extends Container {
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
        console.log(element);

        const singleCell = new BoardCell(
          cellSize,
          element.name,
          element.currentLevel
        );

        singleCell.position.x = cellSize * xIndex;
        singleCell.position.y = cellSize * yIndex;

        cellsContainer.addChild(singleCell);
      });
    });
  }
}
