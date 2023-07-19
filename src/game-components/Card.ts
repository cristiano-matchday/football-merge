import { PlayerData } from "@/types";
import { Container, Graphics, Sprite, Text, Texture } from "pixi.js";

export class Card extends Container {
  #playerData: PlayerData;

  public get playerData() {
    return this.#playerData;
  }

  constructor(playerdata: PlayerData) {
    super();

    this.#playerData = playerdata;
    this.setupCardTexture(playerdata.id);

    this.createAtkGrade(playerdata.atk);
    this.createDefGrade(playerdata.def);
  }

  private createAtkGrade(atk: number) {
    const graphics = new Graphics()
      .beginFill(0xe0115f)
      .lineStyle({ width: 1, color: 0xffffff })
      .drawCircle(0, 0, 15);
    const label = new Text(atk, { fontSize: 14 });
    label.anchor.set(0.5);
    graphics.addChild(label);
    graphics.position.set(20, 180);
    this.addChild(graphics);
  }

  private createDefGrade(def: number) {
    const graphics = new Graphics()
      .beginFill(0x0f52ba)
      .lineStyle({ width: 1, color: 0xffffff })
      .drawCircle(0, 0, 15);
    const label = new Text(def, { fontSize: 14 });
    label.anchor.set(0.5);
    graphics.addChild(label);
    graphics.position.set(80, 180);
    this.addChild(graphics);
  }

  private async setupCardTexture(id: number) {
    const sprite = new Sprite(Texture.from(id + ""));
    sprite.width = 100;
    sprite.height = 200;

    this.eventMode = "dynamic";
    this.cursor = "pointer";
    this.addChild(sprite);
  }
}
