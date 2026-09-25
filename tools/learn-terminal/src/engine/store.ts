/* engine/store.ts — minimal external store for useSyncExternalStore */

export class Store<T> {
  private listeners = new Set<() => void>();
  protected snapshot: T;

  constructor(initial: T) { this.snapshot = initial; }

  subscribe = (fn: () => void) => {
    this.listeners.add(fn);
    return () => { this.listeners.delete(fn); };
  };

  getSnapshot = () => this.snapshot;

  protected set(next: T) {
    this.snapshot = next;
    this.listeners.forEach(fn => fn());
  }
}
