import { effectNames } from "../constants";
import { BaseEffect } from "./BaseEffect";

type Options = {
  duration: number;
};
const defaultOption: Options = {
  duration: 10000,
};

export type LoopVideoConfig = {
  effectName: typeof effectNames.LOOP_VIDEO;
  options?: Options;
};

export class LoopVideoEffect extends BaseEffect {
  private options: Options;
  private isRecording = true;
  private startTime = Date.now();
  private frames: ImageData[] = [];

  constructor(options = defaultOption) {
    super();
    this.options = options || { duration: 10000 };
  }

  draw(canvas: HTMLCanvasElement, canvasCtx: CanvasRenderingContext2D): void {
    const currentTime = Date.now();
    const elapsed = currentTime - this.startTime;
    if (elapsed >= this.options.duration) {
      this.isRecording = false;
      this.startTime = currentTime;
    }

    if (this.isRecording) {
      // Store frames during first loop
      this.frames.push(
        canvasCtx.getImageData(0, 0, canvas.width, canvas.height)
      );
    } else {
      // Playback stored frames
      const frameIndex =
        Math.floor((elapsed / this.options.duration) * this.frames.length) %
        this.frames.length;
      canvasCtx.putImageData(this.frames[frameIndex], 0, 0);
    }
  }
}
