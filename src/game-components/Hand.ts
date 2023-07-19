import { Container, Graphics, Text } from "pixi.js";
import { logicalHeight, logicalWidth } from "../scenes/Scene";
import { Card } from "./Card";
import { PlayerData } from "../types";
import { gsap } from "gsap";
import { emitter } from "../emitter";

export class Hand extends Container {
  private playersData: PlayerData[] = [];
  private cardsContainer = new Container();

  constructor() {
    super();

    const background = new Graphics()
      .beginFill(0x000000)
      .drawRect(0, 0, logicalWidth, logicalHeight)
      .endFill();

    const closeButton = new Graphics()
      .beginFill(0x000000)
      .lineStyle({ width: 1, color: 0xffffff })
      .drawRoundedRect(0, 0, 200, 80, 10)
      .endFill();

    const label = new Text("Close", { fontSize: 15, fill: 0xffffff });
    closeButton.addChild(label);
    label.position.set(
      closeButton.width / 2 - label.width / 2,
      closeButton.height / 2 - label.height / 2
    );
    closeButton.position.set(logicalWidth / 2 - closeButton.width / 2, 700);
    closeButton.eventMode = "dynamic";
    closeButton.cursor = "pointer";

    closeButton.addEventListener("pointerdown", () => {
      emitter.emit("hide_my_hand");
    });

    this.addChild(background, this.cardsContainer, closeButton);

    this.alpha = 0;
    this.visible = false;
  }

  public initHand(playersData: PlayerData[]) {
    this.playersData = playersData;
    this.populateHand(this.playersData);
  }

  private populateHand(playersData: PlayerData[]) {
    this.cardsContainer.removeChildren();
    let y = 0;
    let x = 0;
    playersData.forEach((cardData, i) => {
      const card = new Card(cardData);

      if (i % 4 === 0) {
        y++;
        x = 0;
      }

      card.position.x = card.width * x;
      card.position.y = card.height * y - card.height;

      this.cardsContainer.addChild(card);
      x++;
    });
  }

  public show() {
    gsap.to(this, {
      alpha: 1,
      duration: 0.2,
      ease: "power1.inOut",
      onStart: () => {
        this.visible = true;
        this.eventMode = "dynamic";
      },
    });
  }

  public hide(card?: PlayerData) {
    gsap.to(this, {
      alpha: 0,
      onComplete: () => {
        this.visible = false;
        this.eventMode = "none";
        if (card) {
          this.removeCard(card);
        }
      },
    });
  }

  public removeCard(playerData: PlayerData) {
    this.playersData = this.playersData.filter(
      (cData) => cData.id !== playerData.id
    );
    this.populateHand(this.playersData);
  }
}
