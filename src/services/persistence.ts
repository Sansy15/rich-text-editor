/**
 * Persistence service for editor content
 * Structured as if API calls exist, but uses localStorage for now
 */

const STORAGE_KEY = 'lexical-editor-content';

export interface PersistenceService {
  save(content: string): Promise<void>;
  load(): Promise<string | null>;
  clear(): Promise<void>;
}

class LocalStoragePersistenceService implements PersistenceService {
  async save(content: string): Promise<void> {
    try {
      localStorage.setItem(STORAGE_KEY, content);
      // In a real app, this would be:
      // return await api.saveDocument(content);
    } catch (error) {
      console.error('Failed to save content:', error);
      throw error;
    }
  }

  async load(): Promise<string | null> {
    try {
      const content = localStorage.getItem(STORAGE_KEY);
      // In a real app, this would be:
      // return await api.loadDocument();
      return content;
    } catch (error) {
      console.error('Failed to load content:', error);
      throw error;
    }
  }

  async clear(): Promise<void> {
    try {
      localStorage.removeItem(STORAGE_KEY);
      // In a real app, this would be:
      // return await api.deleteDocument();
    } catch (error) {
      console.error('Failed to clear content:', error);
      throw error;
    }
  }
}

export const persistenceService: PersistenceService = new LocalStoragePersistenceService();
