import { createContext } from 'react';

export interface FreeGridContext {
  removeItem?: (key: string) => void;
}

export const FreeGridContext = createContext<FreeGridContext>({
  removeItem: (key: string) => undefined,
});
