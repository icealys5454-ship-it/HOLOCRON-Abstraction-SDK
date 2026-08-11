export class StateStorageConnector {
  async save(key: string, data: Uint8Array): Promise<void> {
    // placeholder: e.g. IndexedDB
    console.warn("StateStorageConnector.save: not implemented", key);
  }

  async load(key: string): Promise<Uint8Array | null> {
    console.warn("StateStorageConnector.load: not implemented", key);
    return null;
  }
}
