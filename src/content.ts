import { messagesTypes } from "./constants";
import { CustomMediaStream } from "./customMediaStream";
import { ExtensionMessage } from "./types/messages.type";
import videoEffectsController from "./videoEffectsController";

// Patches media stream
const originalGetUserMedia = navigator.mediaDevices.getUserMedia.bind(
  navigator.mediaDevices
);
MediaDevices.prototype.getUserMedia = async (constraints) =>
  constraints && constraints.video && !constraints.audio
    ? new CustomMediaStream(await originalGetUserMedia(constraints))
    : originalGetUserMedia(constraints);

window.addEventListener("message", (event: MessageEvent<ExtensionMessage>) => {
  switch (event.data.type) {
    case messagesTypes.ENABLE_EFFECT:
      videoEffectsController.applyConfig(event.data.payload);
      break;
    case messagesTypes.DISABLE_EFFECT:
      videoEffectsController.applyConfig(null);
      break;
  }
});
