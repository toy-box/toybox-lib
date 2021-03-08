import React from 'react';
import { SelectItem } from '../SortableSelect/interface';

export interface IndexViewContext {
  visibleColumnSet?: boolean;
  columns: SelectItem[];
  setColumns: (columns: SelectItem[]) => void;
  visibleKeys: string[];
  setVisibleKeys: (keys: string[]) => void;
}

const IndexViewContext = React.createContext<Partial<IndexViewContext>>({});

export default IndexViewContext;
