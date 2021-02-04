import { ReactNode } from 'react';

export interface SelectItem {
  label: ReactNode;
  value: string;
  disabled?: boolean;
}

export type ValueType = string | string[] | undefined;
