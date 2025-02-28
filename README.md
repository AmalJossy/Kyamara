# Video Effects Chrome Extension

A Chrome extension that applies real-time video effects to your webcam feed. This extension allows you to enhance your video calls and recordings with various visual effects.

## Features

Currently implemented effects:

- **Loop Video**: Records a short video clip and plays it back in a loop, creating a seamless repeating effect. Customizable duration.

## Installation

### Development Mode

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Build the extension:
   ```
   npm run build
   ```
4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top-right corner
   - Click "Load unpacked" and select the root of this project

### From Chrome Web Store

_Coming soon_

## Usage

1. Click on the extension icon in your browser toolbar
2. Select an effect from the dropdown menu
3. Adjust effect settings as needed
4. The effect will be applied to your webcam feed in real-time

## Development

### Project Structure

- `src/`: Source code
  - `effects/`: Video effect implementations
  - `ui/`: React components for the extension popup
  - `types/`: TypeScript type definitions
  - `content.ts`: Content script injected into web pages, this modifies the browser apis to apply the effect
  - `videoEffectsController.ts`: Main controller for applying effects

### Building

The project uses webpack for building:

```
npm run build
```

This will generate the extension files in the `dist` directory.

### Adding New Effects

To add a new video effect:

1. Create a new effect class in the `src/effects/` directory that extends `BaseEffect`:

```typescript
import { BaseEffect } from "./BaseEffect";

type Options = {
  // Define your effect options here
  option1: string;
  option2: number;
};

const defaultOption: Options = {
  option1: "default",
  option2: 100,
};

export type YourEffectConfig = {
  effectName: typeof effectNames.YOUR_EFFECT;
  options?: Options;
};

export class YourEffect extends BaseEffect {
  private options: Options;

  constructor(options = defaultOption) {
    super();
    this.options = options || defaultOption;
  }

  draw(canvas: HTMLCanvasElement, canvasCtx: CanvasRenderingContext2D): void {
    // Implement your effect's drawing logic here
    // This method is called on each frame
  }
}
```

2. Add your effect name to `src/constants.ts`:

```typescript
export const effectNames = {
  // ... existing effects
  YOUR_EFFECT: "YOUR_EFFECT" as const,
};
```

3. Register your effect in `src/videoEffectsController.ts`:

```typescript
// Import your effect
import { YourEffect } from "./effects/YourEffect";

// Add to the switch statement in applyConfig method
switch (config.effectName) {
  case effectNames.LOOP_VIDEO:
    this.effect = new LoopVideoEffect(config.options);
    break;
  case effectNames.YOUR_EFFECT:
    this.effect = new YourEffect(config.options);
    break;
}
```

4. Add UI controls for your effect in the popup interface

## Browser Compatibility

This extension is designed for Chromium-based browsers:

- Google Chrome
- Microsoft Edge
- Brave
- Opera

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
