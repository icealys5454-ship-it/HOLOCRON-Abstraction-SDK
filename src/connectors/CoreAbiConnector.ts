import { EmulatorCore } from "../abstract/EmulatorCore.js";

export class CoreAbiConnector extends EmulatorCore {
  async open(path: string) {
    // placeholder implementation
    void path;
  }
  loadRom(rom: Uint8Array) {
    void rom;
  }
  reset() {}
  runFrame() {}
  getFramebuffer() {
    return { width: 0, height: 0, data: new Uint8Array(0) };
  }
  getAudioBuffer() {
    return null;
  }
  saveState() {
    return new Uint8Array(0);
  }
  loadState(_state: Uint8Array) {
    void _state;
  }
}
