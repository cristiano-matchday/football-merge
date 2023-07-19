import { MergeAction, MergeItem } from "@/types";
import { Container, Graphics, Text } from "pixi.js";

export class BoardCell extends Container {
  constructor(cellSize = 80, itemName: MergeAction | MergeItem, level: number) {
    super();

    const singleCell = new Graphics()
      .beginFill(0xffffff)
      .lineStyle({ width: 2, color: 0x000000 })
      .drawRect(0, 0, cellSize, cellSize)
      .endFill();

    const text = new Text(`${itemName}\nLvl:${level}`, {
      fill: 0x000000,
      fontSize: 14,
    });

    text.anchor.set(0.5);
    text.position.set(cellSize / 2);

    this.addChild(singleCell, text);
  }
}
