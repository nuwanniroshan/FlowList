import { beforeAll, afterEach, afterAll } from 'vitest';

// Mock localStorage for tests
class LocalStorageMock {
  private store: Record<string, string> = {};

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = String(value);
  }

  removeItem(key: string) {
    delete this.store[key];
  }

  get length() {
    return Object.keys(this.store).length;
  }

  key(index: number) {
    const keys = Object.keys(this.store);
    return keys[index] || null;
  }
}

// Setup localStorage mock
beforeAll(() => {
  global.localStorage = new LocalStorageMock() as Storage;
});

// Clear localStorage after each test
afterEach(() => {
  global.localStorage.clear();
});

// Cleanup
afterAll(() => {
  // @ts-expect-error - localStorage is mocked for tests
  delete global.localStorage;
});
