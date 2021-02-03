import React, { FC, ReactNode, useCallback, useContext, useMemo } from 'react';
import classNames from 'classnames';
import { MenuLine, CheckLine } from '@airclass/icons';
import { SelectItem } from '../interface';
import SortableSelectContext from '../context';

export type SelectOptionItemProps = SelectItem;

const SelectOptionItem: FC<SelectOptionItemProps> = ({
  label,
  value,
  disabled,
}) => {
  const context = useContext(SortableSelectContext);
  const checked = useMemo(() => {
    if (Array.isArray(context.value)) {
      return context.value.some(v => v === value);
    }
    return value === context.value;
  }, [context.value]);

  const handleCheck = useCallback(() => {
    context.checkValue && context.checkValue(value, !checked);
  }, [context.checkValue]);
  const HandleIcon = MenuLine;
  return (
    <li
      className={classNames('select-item', checked, disabled)}
      onClick={handleCheck}
    >
      <HandleIcon className="drag-handle" />
      <div className="select-item__label">{label}</div>
      <CheckLine className="check" />
    </li>
  );
};

export default SelectOptionItem;
