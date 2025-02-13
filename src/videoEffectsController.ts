import { effectNames } from "./constants";
import { BaseEffect } from "./effects/BaseEffect";
import { LoopVideoEffect } from "./effects/LoopVideoEffect";
import { EffectConfig } from "./types/effects.type";

class VideoEffectsController {
  private effect: BaseEffect | null = null;

  applyConfig(config: EffectConfig | null) {
    if (config === null) {
      this.effect = null;
      console.log("effect disabled");
      return;
    }
    switch (config.effectName) {
      case effectNames.LOOP_VIDEO:
        this.effect = new LoopVideoEffect(config.options);
    }
    console.log("new config applied", config);
  }

  draw(canvas: HTMLCanvasElement, canvasCtx: CanvasRenderingContext2D): void {
    if (this.effect) this.effect.draw(canvas, canvasCtx);
  }
}

export default new VideoEffectsController();
