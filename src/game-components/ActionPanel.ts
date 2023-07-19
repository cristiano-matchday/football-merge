import { emitter } from "@/emitter";
import { logicalHeight, logicalWidth } from "@/scenes/Scene";
import { gsap } from "gsap";
import { Container, Graphics, Sprite, Text, Texture } from "pixi.js";

export class ActionPanel extends Container {
  private actionLabel = new Text("", { fill: "white", fontSize: 22 });

  constructor() {
    super();
    const sprite = new Sprite(Texture.WHITE);
    sprite.width = logicalWidth;
    sprite.height = logicalHeight;
    sprite.tint = 0x000000;

    sprite.alpha = 0.9;

    this.actionLabel.anchor.set(0.5);
    this.actionLabel.position.set(logicalWidth / 2, 100);
    this.addChild(sprite, this.actionLabel);

    this.eventMode = "dynamic";

    this.createPlayButton();
  }

  private createPlayButton() {
    const graphics = new Graphics()
      .beginFill(0x000000)
      .lineStyle({ width: 2, color: 0xffffff })
      .drawRoundedRect(0, 0, 200, 50, 5);

    const playLabel = new Text("Play", { fontSize: 22, fill: 0xffffff });

    playLabel.anchor.set(0.5);
    playLabel.position.set(graphics.width / 2, graphics.height / 2);
    graphics.position.set(logicalWidth / 2 - graphics.width / 2, 500);
    graphics.addChild(playLabel);
    this.addChild(graphics);

    graphics.eventMode = "dynamic";
    graphics.cursor = "pointer";

    graphics.addEventListener("pointerdown", () => {
      emitter.emit("init");
      gsap.to(graphics, {
        alpha: 0,
        onComplete: () => {
          graphics.visible = false;
        },
      });
    });
  }

  public async updateLabel(label: string) {
    await gsap.to(this.actionLabel, { alpha: 0 });
    this.actionLabel.text = label;
    await gsap.to(this.actionLabel, { alpha: 1 });
  }

  public show() {
    return gsap.to(this, {
      alpha: 1,
      duration: 0.2,
      ease: "power1.inOut",
      onStart: () => {
        this.visible = true;
        this.eventMode = "dynamic";
      },
    });
  }

  public hide() {
    gsap.to(this, {
      alpha: 0,
      onComplete: () => {
        this.visible = false;
        this.eventMode = "none";
        this.actionLabel.text = "";
      },
    });
  }
}
