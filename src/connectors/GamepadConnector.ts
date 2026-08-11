import { Connector } from '../abstract/Connector.js';

interface GamepadConnectorConfig {
  deadzone?: number;
  bindings?: Record<string, number>;
}

/**
 * Gamepad input connector for hardware and browser Gamepad API.
 */
export class GamepadConnector extends Connector<GamepadConnectorConfig> {
  private gamepadIndex: number = 0;
  private pollInterval: NodeJS.Timeout | null = null;
  private onStateChange: ((buttons: Record<string, boolean>) => void) | null = null;

  constructor(config: GamepadConnectorConfig = {}) {
    super(config);
  }

  async initialize(): Promise<void> {
    // Gamepad API initialization
  }

  async dispose(): Promise<void> {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
  }

  /**
   * Start polling for gamepad input.
   */
  start(onStateChange: (buttons: Record<string, boolean>) => void): void {
    this.onStateChange = onStateChange;
    this.pollInterval = setInterval(() => this.poll(), 16);
  }

  private poll(): void {
    const gamepads = navigator.getGamepads();
    const gamepad = gamepads[this.gamepadIndex];
    if (!gamepad) return;

    const buttons: Record<string, boolean> = {};
    gamepad.buttons.forEach((button, index) => {
      buttons[`button_${index}`] = button.pressed;
    });

    if (this.onStateChange) {
      this.onStateChange(buttons);
    }
  }
}
