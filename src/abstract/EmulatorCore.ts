/**
 * Abstract base class for the emulator core.
 * Defines the stable ABI contract between host and WASM emulator.
 */
export interface Framebuffer {
  data: Uint8Array;
  width: number;
  height: number;
  format: 'RGBA8888';
}

export interface AudioFrame {
  left: Int16Array;
  right: Int16Array;
  sampleRate: number;
}

export interface SaveState {
  data: Uint8Array;
  timestamp: number;
}

export abstract class EmulatorCore {
  /**
   * Load a ROM into the emulator.
   */
  abstract loadRom(rom: Uint8Array): void;

  /**
   * Execute a single frame.
   */
  abstract runFrame(): void;

  /**
   * Reset the emulator to initial state.
   */
  abstract reset(): void;

  /**
   * Get the current framebuffer contents.
   */
  abstract getFramebuffer(): Framebuffer;

  /**
   * Get audio samples for the last frame.
   */
  abstract getAudioFrame(): AudioFrame;

  /**
   * Set controller input state.
   */
  abstract setControllerState(buttons: Record<string, boolean>): void;

  /**
   * Save emulator state.
   */
  abstract saveState(): SaveState;

  /**
   * Load emulator state.
   */
  abstract loadState(state: SaveState): void;
}
