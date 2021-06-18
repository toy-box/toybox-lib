import FieldDate from './Date';
import FieldString from './String';
import FieldText from './Text';
import FieldNumber from './Number';
import FieldSelect from './Select';
import FieldRate from './Rate';
import FieldCheckGroup from './CheckGroup';
import FieldPercent from './Percent';
import FieldBoolean from './Boolean';
import FieldBusinessObject from './BusinessObject';
import FieldTreeSelect from './TreeSelect';
import { FieldMap, FieldMode } from './interface';

export { FieldMode, FieldMap };

export const defaultFieldMap: FieldMap = {
  string: FieldString,
  text: FieldText,
  number: FieldNumber,
  date: FieldDate,
  datetime: FieldDate,
  singleOption: FieldSelect,
  boolean: FieldBoolean,
  businessObject: FieldBusinessObject,
  object: FieldBusinessObject,
};

export const defaultFormMap: FieldMap = {
  string: FieldString,
  text: FieldText,
  number: FieldNumber,
  date: FieldDate,
  datetime: FieldDate,
  singleOption: FieldSelect,
  boolean: FieldBoolean,
  businessObject: FieldBusinessObject,
  object: FieldBusinessObject,
};

export const defaultFormFieldMap = {
  string: FieldString,
  text: FieldText,
  number: FieldNumber,
  date: FieldDate,
  datetime: FieldDate,
  singleOption: FieldSelect,
  boolean: FieldBoolean,
  businessObject: FieldSelect,
  object: FieldSelect,
};

const Fields = {
  FieldDate,
  FieldString,
  FieldText,
  FieldNumber,
  FieldSelect,
  FieldRate,
  FieldCheckGroup,
  FieldPercent,
  FieldBoolean,
  FieldBusinessObject,
  FieldTreeSelect,
};

export default Fields;
