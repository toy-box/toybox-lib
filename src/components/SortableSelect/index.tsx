import React, { FC, useCallback, ReactNode } from 'react';
import { Popover } from 'antd';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import arrayMove from 'array-move';
import { SelectItem, ValueType } from './interface';
import SelectOptionItem from './components/SelectOptionItem';
import SortableSelectContext from './context';
import './style.less';

type ActionType = 'hover' | 'click' | 'focus';

export interface SortableSelectProps {
  title: ReactNode;
  trigger?: ActionType | ActionType[];
  dataSource: SelectItem[];
  value: ValueType;
  multiple?: boolean;
  onChange: (value: ValueType) => void;
  onSortEnd: (options: SelectItem[]) => void;
}

type SelectItemCheck = SelectItem & {
  checked?: boolean;
};

const SortableSelect: FC<SortableSelectProps> = ({
  title,
  trigger = 'click',
  dataSource,
  value,
  multiple,
  onChange,
  onSortEnd,
  children,
}) => {
  const checkValue = useCallback(
    (val: string) => {
      if (multiple) {
        if (value == null) {
          return onChange([val]);
        }
        if (Array.isArray(value)) {
          if (!value.some(v => v === val)) {
            return onChange([...value, val]);
          }
          return onChange(value.filter(v => v !== val));
        }
        if (value === val) {
          return onChange([]);
        }
        return onChange([value, val]);
      }
      return onChange(val);
    },
    [multiple, value],
  );

  const handleSortEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    onSortEnd(
      arrayMove(dataSource, result.source.index, result.destination.index),
    );
  };

  const content = () => {
    return (
      <SortableSelectContext.Provider value={{ value, checkValue }}>
        <div className="tbox-sortable-select">
          <DragDropContext onDragEnd={handleSortEnd}>
            <Droppable droppableId="list">
              {provided => (
                <ul
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="select-menu"
                >
                  {dataSource.map((item, index) => (
                    <SelectOptionItem
                      {...item}
                      index={index}
                      key={`item-${item.value}`}
                    />
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </SortableSelectContext.Provider>
    );
  };

  return (
    <Popover
      title={title}
      trigger={trigger}
      overlayClassName="popover-no-padding popover-no-arrow"
      content={content}
      placement="bottom"
    >
      {children}
    </Popover>
  );
};

export default SortableSelect;
