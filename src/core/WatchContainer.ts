import { Container } from "pixi.js";
import {
  WatchStopHandle,
  watch,
  WatchCallback,
  WatchOptions,
  WatchSource,
} from "vue";

export class WatchContainer extends Container {
  protected watchHandles: WatchStopHandle[] = [];

  public watch<T>(
    someValue: WatchSource<T>,
    callback: WatchCallback<T>,
    options?: WatchOptions<boolean>
  ): void {
    const watchHandle = watch(someValue, callback, options);

    this.watchHandles.push(watchHandle);
  }

  public destroyHandles(): void {
    for (const watchStopHandle of this.watchHandles) {
      watchStopHandle();
    }
    this.watchHandles = [];
  }

  public destroy(options?: {
    texture?: boolean | undefined;
    baseTexture?: boolean | undefined;
  }): void {
    super.destroy(options);
    this.destroyHandles();
  }
}
