import { Application, Assets, Text } from "pixi.js";
import { GameScene } from "./GameScene";

const availableAssets = import.meta.glob("@assets/*.png", {
  eager: true,
}) as Record<string, { default: string }>;

const assetsFiltered = Object.entries(availableAssets).map(
  ([sourceName, value]) => {
    const name = sourceName.replace("/public/assets/", "").replace(".png", "");
    return {
      name,
      path: value.default,
    };
  }
);

export const logicalWidth = 430;
export const logicalHeight = 932;

export class Scene extends Application<any> {
  constructor() {
    super({
      width: logicalWidth,
      height: logicalHeight,
      resolution: window.devicePixelRatio || 1,
      background: "#1099bb",
      autoDensity: true,
    });

    document.body.appendChild(this.view);
    this.view.id = "pixi-canvas";
    this.stage.name = "Root";

    window.__PIXI_APP__ = this;

    window.addEventListener("resize", () => this.resizeHandler(), false);
    this.resizeHandler();
  }

  private async loadAssets() {
    assetsFiltered.forEach((asset) => {
      Assets.add(asset.name, asset.path);
    });

    const progressLabel = new Text("Loading: 0%", {
      fontSize: 20,
      fill: 0x000000,
    });

    progressLabel.anchor.set(0.5);
    progressLabel.position.set(logicalWidth / 2, logicalHeight / 2);
    this.stage.addChild(progressLabel);
    await Assets.load(
      assetsFiltered.map((asset) => asset.name),
      (progress) => {
        progressLabel.text = `Loading: ${(progress * 100).toFixed(0)}%`;
      }
    );
  }

  public async init() {
    await this.loadAssets();
    this.stage.removeChildren();

    this.stage.addChild(new GameScene());
  }

  private resizeHandler() {
    const scaleFactor = Math.min(
      window.innerWidth / logicalWidth,
      (window.innerHeight - 70) / logicalHeight
    );

    const newWidth = Math.ceil(logicalWidth * scaleFactor);
    const newHeight = Math.ceil(logicalHeight * scaleFactor);

    this.view.style.width = `${newWidth}px`;
    this.view.style.height = `${newHeight}px`;
  }
}
