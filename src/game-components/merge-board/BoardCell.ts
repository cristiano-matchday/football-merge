import { MergeAction, MergeItem } from "@/types";
import { Container, Graphics, Text } from "pixi.js";

export class BoardCell extends Container {
  private isDragging = false;

  constructor(cellSize = 80, itemName: MergeAction | MergeItem, level: number) {
    super();

    const singleCell = new Graphics()
      .beginFill(0xffffff)
      .lineStyle({ width: 2, color: 0x000000 })
      .drawRect(0, 0, cellSize, cellSize)
      .endFill();

    this.addChild(singleCell);
  }
}
