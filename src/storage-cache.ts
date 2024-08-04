class StorageCache {
  storage: Map<string, string> = new Map<string, string>();

  setItem = (key: string, val: string): void => {
    this.storage.set(key, val);
  }

  getItem = (key: string): string | null => {
    return this.storage.get(key) || null;
  }

  removeItem = (key: string): void => {
    this.storage.delete(key);
  }

  clear = (): void => {
    this.storage.clear();
  }

  key = (index: number): string | null => {
    const keys = Array.from(this.storage.keys());
    return keys[index] || null;
  }

  get length(): number {
    return this.storage.size;
  }

  get isSupported(): boolean {
    return true;
  }
}
