import { createContext } from 'react';
import { IUncheckCompares } from './components/FilterBuilder';

export interface IFilterBuilderContextProps {
  value: IUncheckCompares;
  onChange: (value: IUncheckCompares) => void;
}

export const FilterBuilderContext = createContext<IFilterBuilderContextProps>({
  value: [],
  onChange: () => undefined,
});
