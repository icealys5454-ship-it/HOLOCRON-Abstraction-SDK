import { EmulatorCore, Framebuffer } from "../abstract/EmulatorCore.js";

export class CoreAbiConnector extends EmulatorCore {
  private _opened = false;

  async open(path: string): Promise<void> {
    // placeholder: real implementation should fetch & instantiate the WASM module
    this._opened = true;
    console.warn("CoreAbiConnector.open: not implemented (placeholder)");
  }

  loadRom(_rom: Uint8Array): void {
    if (!this._opened) throw new Error("Core not opened");
    // placeholder
  }

  reset(): void {
    // placeholder
  }

  runFrame(): void {
    // placeholder
  }

  getFramebuffer(): Framebuffer {
    return { width: 0, height: 0, data: new Uint8Array(0) };
  }
}
