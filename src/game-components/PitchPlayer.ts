import { Container, Graphics, Sprite, Text, Texture } from "pixi.js";
import { GlowFilter, OutlineFilter } from "pixi-filters";
import { FilledPitchPlayerData, PlayerData } from "@/types";
import { getTeamColor } from "@/utils";
import { gsap } from "gsap";

const myGlowFilter = new GlowFilter({ color: 0xffffff, alpha: 1 });

export class PitchPlayer extends Container {
  #pitchPlayerData: FilledPitchPlayerData;
  #playerData: PlayerData | null = null;

  public get pitchPlayerData() {
    return this.#pitchPlayerData;
  }

  private bodyGraphics = new Graphics()
    .beginFill(0xffffff)
    .drawCircle(0, 0, 20);

  private atkContainer = new Container();
  private defContainer = new Container();

  private atkLabel = new Text("", { fontSize: 12 });
  private defLabel = new Text("", { fontSize: 12 });

  public get playerData() {
    return this.#playerData;
  }

  constructor(pitchPlayerData: FilledPitchPlayerData, isMe: boolean) {
    super();

    this.#pitchPlayerData = pitchPlayerData;

    this.bodyGraphics.tint = isMe ? pitchPlayerData.color : 0x808080;

    this.bodyGraphics.filters = [new OutlineFilter(4, getTeamColor(isMe))];

    if (isMe) {
      this.filters = [myGlowFilter];
      this.animateGlow();
    }

    const text = new Text(pitchPlayerData.role, { fontSize: 15 });
    text.anchor.set(0.5);
    this.bodyGraphics.addChild(text);
    this.position.set(...pitchPlayerData.position);

    this.createAtkGrade();
    this.createDefGrade();

    this.addChild(this.bodyGraphics, this.atkContainer, this.defContainer);
    this.fillPlayerData(pitchPlayerData.player);
  }

  private createAtkGrade() {
    const graphics = new Graphics()
      .beginFill(0xe0115f)
      .lineStyle({ width: 1, color: 0xffffff })
      .drawCircle(0, 0, 10);
    this.atkLabel.anchor.set(0.5);
    graphics.addChild(this.atkLabel);
    this.atkContainer.addChild(graphics);
    this.atkContainer.position.set(-graphics.width, -this.height);

    this.atkContainer.visible = false;
  }

  private createDefGrade() {
    const graphics = new Graphics()
      .beginFill(0x0f52ba)
      .lineStyle({ width: 1, color: 0xffffff })
      .drawCircle(0, 0, 10);
    this.defLabel.anchor.set(0.5);
    graphics.addChild(this.defLabel);
    this.defContainer.addChild(graphics);
    this.defContainer.position.set(graphics.width, -this.height);

    this.defContainer.visible = false;
  }

  public fillPlayerData(player: PlayerData) {
    this.#playerData = player;

    this.atkContainer.visible = true;
    this.atkLabel.text = player.atk;
    this.defContainer.visible = true;
    this.defLabel.text = player.def;

    this.bodyGraphics.tint = 0x808080;
    const sprite = new Sprite(Texture.from(player.id + ""));
    sprite.width = this.bodyGraphics.width;
    sprite.height = this.bodyGraphics.height;
    sprite.anchor.set(0.5);
    this.bodyGraphics.addChild(sprite);
    this.filters = [];
  }

  public removePlayerData() {
    this.#playerData = null;
  }

  private animateGlow() {
    gsap.to(myGlowFilter, { alpha: 0, repeat: -1, yoyo: true, duration: 1 });
  }
}
