import React from 'react';
import Messager from './components/Messager';
import { LayoutItem } from './components/simpleLayout';
import { ItemType } from './interface';

export interface LayoutType<LayoutItemType> {
  items: LayoutItemType[];
  [key: string]: any;
}

export interface LayoutEditContext<LayoutItemType> {
  layout: LayoutType<LayoutItemType>;
  change: (layout: unknown) => void;
  active?: string;
  setActive: (key: string) => void;
  palaceholder?: (type: string, index: number) => void;
  draging?: ItemType;
  setDraging?: (draging?: ItemType) => void;
  messager?: Messager;
}

const LayoutEditContext = React.createContext<LayoutEditContext<LayoutItem>>({
  layout: { items: [] },
  change: (layout: unknown) => console.log(layout),
  setActive: (key: string) => console.log(key),
  palaceholder: (type: string, index: number) =>
    console.log('placeholder', type, index),
});

export default LayoutEditContext;
