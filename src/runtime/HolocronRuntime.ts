import { EmulatorCore } from "../abstract/EmulatorCore.js";
import { Connector } from "../abstract/Connector.js";

export class HolocronRuntime {
  constructor(public core: EmulatorCore, public video: Connector<any>, public input: Connector<any>) {}

  start(_opts?: any) {
    void _opts;
  }

  stop() {}
}
