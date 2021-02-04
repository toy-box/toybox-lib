import React from 'react';
import { ValueType } from './interface';

export interface SortableSelectContext {
  value: string | string[];
}

const SortableSelectContext = React.createContext<{
  value?: ValueType;
  checkValue?: (val: string) => void;
}>({});

export default SortableSelectContext;
