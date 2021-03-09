import { createContext } from 'react';

export interface FreeGirdContext {
  removeItem?: (key: string) => void;
}

export const FreeGirdContext = createContext<FreeGirdContext>({
  removeItem: (key: string) => undefined,
});
