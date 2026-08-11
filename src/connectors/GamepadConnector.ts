import { Connector } from "../abstract/Connector.js";

export class GamepadConnector extends Connector<Record<string, unknown>> {
  connect(target?: unknown) {
    void target;
  }
  disconnect() {}
}
