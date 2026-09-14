import { useState } from 'react';

export function useDebouncedValue<T>(value: T, _delayMs = 300): T {
  // Foundation hook: no debounce timer yet to keep it simple; returns value directly.
  const [v] = useState(value);
  return value ?? v;
}
