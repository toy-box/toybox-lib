import React from 'react';
import { ValueType } from './interface';

export interface SortableSelectContext {
  value: string | number | (string | number)[];
}

const SortableSelectContext = React.createContext<{
  value?: ValueType;
  checkValue?: (val: string | number, checked: boolean) => void;
}>({});

export default SortableSelectContext;
