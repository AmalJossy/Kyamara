import videoEffectsController from "./videoEffectsController";

// Create preview video
const video = document.createElement("video");
video.setAttribute("playsinline", "");
video.setAttribute("autoplay", "");
video.setAttribute("muted", "");

// Create canvas
const canvas = document.createElement("canvas");
const canvasCtx = canvas.getContext("2d", { willReadFrequently: true });

let animationFrameId: number;
function animate() {
  if (!canvasCtx) return;

  canvasCtx.drawImage(video, 0, 0, canvas.width, canvas.height);
  videoEffectsController.draw(canvas, canvasCtx);

  animationFrameId = requestAnimationFrame(animate);
}

export class CustomMediaStream extends MediaStream {
  constructor(originalStream: MediaStream) {
    // Copy original stream settings
    super(originalStream);
    video.srcObject = originalStream; // Connect original stream to video

    const { width = 0, height = 0 } = originalStream
      .getVideoTracks()[0]
      .getSettings();
    canvas.width = width;
    canvas.height = height;

    // Start animation loop
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    animationFrameId = requestAnimationFrame(animate);

    const newStream = canvas.captureStream();
    newStream.addEventListener("inactive", () => {
      console.log("stream inactive");
      originalStream.getTracks().forEach((track) => track.stop());
      canvasCtx?.clearRect(0, 0, width, height);
      video.srcObject = null;
    });
    console.log("CustomMediaStream::constructor", "done");
    return newStream;
  }
}
