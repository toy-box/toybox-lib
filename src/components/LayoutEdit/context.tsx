import React from 'react';

export interface LayoutEditContext<LayoutType> {
  layout: LayoutType;
  change: (state: any) => void;
  active: string;
}

export const TableContext = React.createContext<
  LayoutEditContext<any> | undefined
>(undefined);
