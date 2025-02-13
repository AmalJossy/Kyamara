import { messagesTypes } from "../constants";
import { EffectConfig } from "./effects.type";

type EnableEffectMessage = {
  type: typeof messagesTypes.ENABLE_EFFECT;
  payload: EffectConfig;
};

type DisableEffectMessage = {
  type: typeof messagesTypes.DISABLE_EFFECT;
};

export type ExtensionMessage = EnableEffectMessage | DisableEffectMessage;
