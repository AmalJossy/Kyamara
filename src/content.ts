import { CustomMediaStream, setCustomMode } from "./customMediaStream";

const originalGetUserMedia = navigator.mediaDevices.getUserMedia.bind(
  navigator.mediaDevices
);
MediaDevices.prototype.getUserMedia = async (constraints) =>
  constraints && constraints.video && !constraints.audio
    ? new CustomMediaStream(await originalGetUserMedia(constraints))
    : originalGetUserMedia(constraints);

window.addEventListener('message', (event) => {
    if (event.data.type === MessageType.TOGGLE_FILTER) {
        setCustomMode(mode => !mode);  // Toggle the mode
    }
});
