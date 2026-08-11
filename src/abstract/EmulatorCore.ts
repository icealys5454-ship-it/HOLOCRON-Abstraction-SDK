export abstract class EmulatorCore {
  abstract open(path: string): Promise<void>;
  abstract loadRom(rom: Uint8Array): void;
  abstract reset(): void;
  abstract runFrame(): void;
  abstract getFramebuffer(): { width: number; height: number; data: Uint8Array } | null;
  abstract getAudioBuffer(): Int16Array | null;
  abstract saveState(): Uint8Array;
  abstract loadState(state: Uint8Array): void;
}
