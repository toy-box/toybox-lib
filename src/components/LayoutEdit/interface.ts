import { ReactNode } from 'react';

type ContentRender = (props: ItemTypeBase) => ReactNode;

export interface ItemTypeBase {
  title: string;
  key: string;
  type: string;
}

export interface ItemType extends ItemTypeBase {
  defaultProps: any;
  content: ContentRender | ReactNode;
}

export interface GroupType {
  title: string;
  items: ItemType[];
}
