import { EmulatorCore } from "../abstract/EmulatorCore.js";

export class HolocronRuntime {
  constructor(
    private core: EmulatorCore,
    private video: unknown,
    private input: unknown
  ) {}

  start(_options?: Record<string, unknown>) {
    console.warn("HolocronRuntime.start: placeholder");
  }

  stop() {
    console.warn("HolocronRuntime.stop: placeholder");
  }
}
