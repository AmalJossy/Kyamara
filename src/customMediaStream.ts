// Create preview video
const video = document.createElement("video");
video.setAttribute("playsinline", "");
video.setAttribute("autoplay", "");
video.setAttribute("muted", "");

// Create canvas
const canvas = document.createElement("canvas");
const canvasCtx = canvas.getContext("2d", { willReadFrequently: true });

const LOOP_DURATION = 10000; // 5 seconds in ms
let startTime = Date.now();
let frames: ImageData[] = [];
let isRecording = true;

// user config state
let isCustomMode = false;
export function setCustomMode(cb: (mode: boolean) => boolean) {
  isCustomMode = cb(isCustomMode);
  if(isCustomMode) {
    startTime = Date.now();
    isRecording = true;
    frames = [];
  } else {
    isRecording = false;
    frames = [];
  };
}


function draw(width: number, height: number) {
  if (!canvasCtx) return;

  // Draw current frame
  canvasCtx.drawImage(video, 0, 0, width, height);
  
  if (isCustomMode) {
    const currentTime = Date.now();
    const elapsed = currentTime - startTime;
    if (elapsed >= LOOP_DURATION) {
      isRecording = false;
      startTime = currentTime;
    }
    
    if (isRecording) {
      // Store frames during first loop
      frames.push(canvasCtx.getImageData(0, 0, width, height));
    } else {
      // Playback stored frames
      const frameIndex = Math.floor((elapsed / LOOP_DURATION) * frames.length) % frames.length;
      canvasCtx.putImageData(frames[frameIndex], 0, 0);

    }
    
    // Draw timestamp
    // canvasCtx.font = '20px Arial';
    // canvasCtx.fillStyle = 'red';
    // canvasCtx.fillText(`${(elapsed/1000).toFixed(1)}s`, width - 70, 30);
  } 
}

let animationFrameId: number;

function animate() {
    draw(canvas.width, canvas.height);
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
