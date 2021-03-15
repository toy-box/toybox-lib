import { ReactNode } from 'react';

type ContentRender = (props: ItemTypeBase) => ReactNode;

export interface ItemTypeBase {
  title: string;
  key: string;
  type: string;
}

export type NumPerRowType = 1 | 2 | 3 | 4 | 5;
export interface ItemType extends ItemTypeBase {
  defaultProps: any;
  content: ContentRender | ReactNode;
}

export interface GroupType {
  title: string;
  items: ItemType[];
}
