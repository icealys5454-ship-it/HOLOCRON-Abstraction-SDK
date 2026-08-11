/**
 * Abstract base class for emulator connectors.
 * Defines the contract for connecting peripheral systems to the emulator core.
 */
export abstract class Connector<TConfig = Record<string, unknown>> {
  protected config: TConfig;

  constructor(config: TConfig) {
    this.config = config;
  }

  /**
   * Initialize the connector with the given configuration.
   */
  abstract initialize(): Promise<void>;

  /**
   * Cleanup and release resources.
   */
  abstract dispose(): Promise<void>;
}
