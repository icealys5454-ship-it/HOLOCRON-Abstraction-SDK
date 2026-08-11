import { Connector } from "../abstract/Connector.js";

export class WebGLConnector extends Connector<HTMLElement | null> {
  connect(element: HTMLElement | null) {
    void element;
  }
  disconnect() {}
}
