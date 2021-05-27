import { ReactNode } from 'react';
import { FieldMeta } from './interface';

export type CompareOP = Toybox.Meta.Types.CompareOP;

export type DateCompareOP = Toybox.Meta.Types.DateCompareOP;

export type UniteCompareOP = Toybox.Meta.Types.UniteCompareOP;

export enum BusinessFieldType {
  INTEGER = 'integer',
  NUMBER = 'number',
  STRING = 'string',
  TEXT = 'text',
  DATE = 'date',
  DATETIME = 'datetime',
  BOOLEAN = 'boolean',
  ARRAY = 'array',
  OBJECT_ID = 'objectId',
  BUSINESS_OBJECT = 'businessObject',
  SINGLE_OPTION = 'singleOption',
  DOCUMENT = 'document',
  PERCENT = 'percent',
  OBJECT = 'object',
  SEARCH_ICON = 'searchIcon',
}

export type ILogicFilter = Toybox.Meta.Types.ILogicFilter;

export interface IUncheckLogicFilter {
  logic: LogicOP;
  compares: Partial<ICompareOperation>[];
}

export type ICompareOperation = Toybox.Meta.Types.ICompareOperation;

export type LogicOP = Toybox.Meta.Types.LogicOP;

declare interface OptionValueType {
  label: ReactNode;
  title?: string;
  value: string | number;
}

export interface FieldService extends FieldMeta {
  findOptions: (key: string, name: string) => Promise<OptionValueType[]>;
  findOfValues: (
    key: string,
    value: (string | number)[],
  ) => Promise<OptionValueType[]>;
  findDataTrees: (key: string, parentId: string | number) => Promise<void>;
  findOtherData: (field: FieldMeta) => Promise<void>;
}
