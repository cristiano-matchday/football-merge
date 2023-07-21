import { Container, FederatedPointerEvent, Graphics, Text } from "pixi.js";

export class DraggableItem extends Container {
  public data: FederatedPointerEvent | null = null;

  constructor(value: string, name: string) {
    super();
    this.name = name;
    const text = new Text(value, { fontSize: 15, fill: 0x000000 });
    const graphics = new Graphics().beginFill(0xff0000).drawRect(0, 0, 80, 80);
    this.addChild(graphics, text);
  }
}
