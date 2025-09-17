// myContext.tsx
import React, { ReactNode, useCallback, useEffect, useRef } from "react";
import { useSyncExternalStore } from "react";

// Global registry of stores keyed by contextKey
type Store<T> = {
  getSnapshot: () => T;
  setSnapshot: (v: T) => void;
  subscribe: (listener: () => void) => () => void;
};

const globalStores = new Map<string | symbol, Store<any>>();

// Create a new context-like pair
export function createMyContext<T>(defaultValue: T) {
  // create a unique key for this context instance
  const contextKey = Symbol("MyContext");

  function createStore(initial: T) {
    let snapshot = initial;
    const listeners = new Set<() => void>();

    const getSnapshot = () => snapshot;
    const setSnapshot = (v: T) => {
      snapshot = v;
      // notify listeners
      listeners.forEach((l) => l());
    };
    const subscribe = (listener: () => void) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    };

    return { getSnapshot, setSnapshot, subscribe };
  }

  // Provider component
  function Provider({ children, value }: { children: ReactNode; value: T }) {
    // On mount, create or update the store in the global registry
    const storeRef = useRef<Store<T> | null>(null);

    if (!storeRef.current) {
      // initialize store with default value (or provided)
      storeRef.current = createStore(value !== undefined ? value : (defaultValue as T));
      // register in global map
      globalStores.set(contextKey, storeRef.current);
    }

    // update snapshot when value prop changes
    useEffect(() => {
      if (storeRef.current) {
        storeRef.current.setSnapshot(value);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    // clean up on unmount - remove from global map if the same store
    useEffect(() => {
      return () => {
        const s = globalStores.get(contextKey);
        if (s === storeRef.current) {
          globalStores.delete(contextKey);
        }
      };
    }, []);

    // Render children as normal; no prop drilling required.
    return <>{children}</>;
  }

  // Consumer hook
  function useMyContext() {
    // find store for this contextKey
    const store = globalStores.get(contextKey);

    // If no provider exists, fallback to defaultValue
    if (!store) {
      // create a temporary store for local snapshot reading (no subscription possible)
      // but to avoid mismatch, create a read-only store:
      const temp = {
        getSnapshot: () => defaultValue,
        subscribe: (_: () => void) => () => {},
      } as Store<T>;
      return useSyncExternalStore(temp.subscribe, temp.getSnapshot);
    }

    // useSyncExternalStore ties into React's concurrent rendering model safely
    const value = useSyncExternalStore(store.subscribe, store.getSnapshot);
    return value as T;
  }

  // Also expose a setter hook if you want: useMyContextSetter
  function useMyContextSetter() {
    const store = globalStores.get(contextKey);
    if (!store) {
      throw new Error("No Provider for this context is mounted.");
    }
    // return callback to set value
    return useCallback((v: T) => store.setSnapshot(v), [store]);
  }

  return {
    Provider,
    useMyContext,
    useMyContextSetter,
    key: contextKey, // exported only in case you want to inspect it
  };
}
