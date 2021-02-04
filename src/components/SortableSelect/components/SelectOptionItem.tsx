import React, { FC, useCallback, useContext, useMemo } from 'react';
import classNames from 'classnames';
import { MenuLine, CheckLine } from '@airclass/icons';
import { Draggable } from 'react-beautiful-dnd';
import { SelectItem } from '../interface';
import SortableSelectContext from '../context';

export type SelectOptionItemProps = SelectItem & {
  index: number;
};

const SelectOptionItem: FC<SelectOptionItemProps> = ({
  label,
  value,
  disabled,
  index,
}) => {
  const context = useContext(SortableSelectContext);
  const checked = useMemo(() => {
    if (Array.isArray(context.value)) {
      return context.value.some(v => v === value);
    }
    return value === context.value;
  }, [context.value]);

  const handleCheck = useCallback(() => {
    if (!disabled) {
      context.checkValue && context.checkValue(value);
    }
  }, [context.checkValue]);

  return (
    <Draggable draggableId={value.toString()} index={index}>
      {provided => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={classNames('tbox-sortable-select--item', { disabled })}
          onClick={handleCheck}
        >
          <MenuLine {...provided.dragHandleProps} className="drag-handle" />
          <div className="select-item__label">{label}</div>
          <CheckLine className={classNames('selec-item__check', { checked })} />
        </li>
      )}
    </Draggable>
  );
};

export default SelectOptionItem;
