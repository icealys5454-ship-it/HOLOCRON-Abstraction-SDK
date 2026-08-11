export type Framebuffer = {
  width: number;
  height: number;
  data: Uint8Array; // RGBA8888
};

export abstract class EmulatorCore {
  abstract open(path: string): Promise<void>;
  abstract loadRom(rom: Uint8Array): void;
  abstract reset(): void;
  abstract runFrame(): void;
  abstract getFramebuffer(): Framebuffer;
}
