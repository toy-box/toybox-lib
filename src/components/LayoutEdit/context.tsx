import React from 'react';
import Messager from './components/Messager';

export interface LayoutEditContext<LayoutType> {
  layout: LayoutType;
  change: (action: string, state: any) => void;
  active?: string;
  messager?: Messager;
  draging?: boolean;
  setDraging?: (draging: boolean) => void;
}

const LayoutEditContext = React.createContext<LayoutEditContext<any>>({
  layout: [],
  change: () => undefined,
});

export default LayoutEditContext;
