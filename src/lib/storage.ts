/**
 * Storage Utilities
 * Type-safe localStorage and sessionStorage helpers
 */

type StorageType = "local" | "session";

class StorageManager {
  private getStorage(type: StorageType): Storage {
    return type === "local" ? localStorage : sessionStorage;
  }

  /**
   * Get item from storage with type safety
   */
  get<T>(key: string, type: StorageType = "local"): T | null {
    try {
      const storage = this.getStorage(type);
      const item = storage.getItem(key);
      
      if (item === null) return null;
      
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error getting ${key} from ${type} storage:`, error);
      return null;
    }
  }

  /**
   * Set item in storage
   */
  set<T>(key: string, value: T, type: StorageType = "local"): boolean {
    try {
      const storage = this.getStorage(type);
      storage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting ${key} in ${type} storage:`, error);
      return false;
    }
  }

  /**
   * Remove item from storage
   */
  remove(key: string, type: StorageType = "local"): boolean {
    try {
      const storage = this.getStorage(type);
      storage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing ${key} from ${type} storage:`, error);
      return false;
    }
  }

  /**
   * Clear all items from storage
   */
  clear(type: StorageType = "local"): boolean {
    try {
      const storage = this.getStorage(type);
      storage.clear();
      return true;
    } catch (error) {
      console.error(`Error clearing ${type} storage:`, error);
      return false;
    }
  }

  /**
   * Check if key exists in storage
   */
  has(key: string, type: StorageType = "local"): boolean {
    const storage = this.getStorage(type);
    return storage.getItem(key) !== null;
  }
}

export const storage = new StorageManager();
