export class WebGLConnector {
  private _canvas: HTMLCanvasElement | null = null;

  connect(canvas: HTMLCanvasElement | null) {
    this._canvas = canvas;
    // placeholder: setup WebGL context and rendering pipeline
  }

  disconnect() {
    this._canvas = null;
  }
}
