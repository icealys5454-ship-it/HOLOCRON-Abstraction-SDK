export abstract class Connector<TConfig = unknown> {
  abstract connect(target: unknown, config?: TConfig): Promise<void> | void;
  abstract disconnect(): Promise<void> | void;
}
