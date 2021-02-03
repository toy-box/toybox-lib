import React, { FC, useCallback } from 'react';
import { SelectItem, ValueType } from './interface';
import SelectOptionItem from './components/SelectOptionItem';

export interface SortableSelectProps {
  options: SelectItem[];
  value: ValueType;
  multiple?: boolean;
  onChange: (value: ValueType) => void;
}

const SortableSelectContext = React.createContext<{
  value?: ValueType;
  checkValue?: (val: string | number, checked: boolean) => void;
}>({});

const SortableSelect: FC<SortableSelectProps> = ({
  options,
  value,
  multiple,
  onChange,
}) => {
  const checkValue = useCallback(
    (val: string | number, checked: boolean) => {
      if (multiple) {
        if (value == null) {
          if (checked) {
            return onChange([val]);
          }
          return onChange([]);
        }
        if (Array.isArray(value)) {
          if (checked) {
            return onChange([...value, val]);
          }
          return onChange(value.filter(v => v !== val));
        }
        if (value === val) {
          return onChange(checked ? [val] : []);
        }
        return onChange(checked ? [value, val] : [value]);
      }
    },
    [multiple],
  );
  return (
    <SortableSelectContext.Provider value={{ value, checkValue }}>
      <div className="tbox-sortable-select">
        {options.map(opt => (
          <SelectOptionItem {...opt} />
        ))}
      </div>
    </SortableSelectContext.Provider>
  );
};

export default SortableSelect;
