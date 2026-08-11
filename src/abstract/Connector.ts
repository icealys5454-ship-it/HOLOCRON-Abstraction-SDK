export abstract class Connector<TConfig = unknown> {
  /** Optional id or name for the connector */
  id?: string;

  abstract connect(target?: TConfig): Promise<void>;
  abstract disconnect(): Promise<void>;
}
