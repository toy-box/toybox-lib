import { ReactNode } from 'react';

type ContentRender = (props: ItemTypeBase) => ReactNode;

export interface ItemTypeBase {
  title: string;
  key: string;
  type: string;
}

export type NumPerRowType = 1 | 2 | 3 | 4 | 5;
export interface ItemType extends ItemTypeBase {
  props?: Record<string, unknown>;
  content?: ContentRender | ReactNode;
}

export interface GroupType {
  title: string;
  items: ItemType[];
}

export declare interface Size {
  top: number;
  left: number;
  width: number;
  height: number;
}

export declare interface ItemSize {
  key: string;
  size: Size;
}
