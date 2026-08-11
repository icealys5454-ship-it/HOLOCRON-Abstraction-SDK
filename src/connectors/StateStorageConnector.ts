import { Connector } from '../abstract/Connector.js';
import { SaveState } from '../abstract/EmulatorCore.js';

interface StorageConnectorConfig {
  storageKey?: string;
}

/**
 * Storage connector for save state persistence using IndexedDB.
 */
export class StateStorageConnector extends Connector<StorageConnectorConfig> {
  private db: IDBDatabase | null = null;
  private readonly dbName = 'holocron-states';
  private readonly storeName = 'saveStates';

  constructor(config: StorageConnectorConfig = {}) {
    super(config);
  }

  async initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: 'id' });
        }
      };
    });
  }

  async dispose(): Promise<void> {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }

  /**
   * Save a state to storage.
   */
  async saveState(id: string, state: SaveState): Promise<void> {
    if (!this.db) throw new Error('Storage not initialized');
    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(this.storeName, 'readwrite');
      const store = tx.objectStore(this.storeName);
      const request = store.put({ id, ...state });
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  /**
   * Load a state from storage.
   */
  async loadState(id: string): Promise<SaveState | null> {
    if (!this.db) throw new Error('Storage not initialized');
    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(this.storeName, 'readonly');
      const store = tx.objectStore(this.storeName);
      const request = store.get(id);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const result = request.result;
        if (result) {
          const { id, ...state } = result;
          resolve(state as SaveState);
        } else {
          resolve(null);
        }
      };
    });
  }
}
