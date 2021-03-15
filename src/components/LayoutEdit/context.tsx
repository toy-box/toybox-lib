import React from 'react';

export interface LayoutEditContext<LayoutType> {
  layout: LayoutType;
  change: (action: string, state: any) => void;
  active?: string;
}

const LayoutEditContext = React.createContext<LayoutEditContext<any>>({
  layout: [],
  change: () => undefined,
  active: undefined,
});

export default LayoutEditContext;
