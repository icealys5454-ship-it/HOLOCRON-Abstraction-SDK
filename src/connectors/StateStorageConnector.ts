import { Connector } from "../abstract/Connector.js";

export class StateStorageConnector extends Connector<unknown> {
  connect(target?: unknown) {
    void target;
  }
  disconnect() {}
}
