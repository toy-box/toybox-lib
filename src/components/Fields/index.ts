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
import type { FieldMap } from './interface';

export type { FieldMode, FieldMap } from './interface';

export const defaultFieldMap: FieldMap = {
  string: FieldString,
  text: FieldText,
  number: FieldNumber,
  date: FieldDate,
  datetime: FieldDate,
  singleOption: FieldSelect,
  boolean: FieldBoolean,
  businessObject: FieldBusinessObject,
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
  FieldBusinessObject
}

export default Fields;
