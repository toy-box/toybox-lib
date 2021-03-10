import React, { FC, ReactNode, useMemo, useCallback, useContext } from 'react';
import GridLayout from 'react-grid-layout';
import classNames from 'classnames';
import { FreeGridContext } from '../context';

export interface FreeGridItemProps {
  itemProps?: Record<string, any>;
  itemRender: (props: Record<string, any>, remove: () => void) => ReactNode;
  layout: GridLayout.Layout;
  editable?: boolean;
}

export const FreeGridItem: FC<FreeGridItemProps> = ({
  itemProps = {},
  itemRender,
  layout,
  editable,
}) => {
  const actions = useContext(FreeGridContext);

  const handleRemove = useCallback(() => {
    typeof actions.removeItem === 'function' && actions.removeItem(layout.i);
  }, [actions, layout.i]);

  const girdContent = useMemo(() => {
    return (
      <div className="free-grid-item--content">
        {itemRender(itemProps, handleRemove)}
      </div>
    );
  }, [itemProps]);

  return (
    <div className={classNames('free-grid-item', { edit: editable })}>
      {girdContent}
      <div className="free-grid-item--panel">
        <div className="resize-handler left top"></div>
        <div className="resize-handler left bottom"></div>
        <div className="resize-handler right top"></div>
        <div className="resize-handler right bottom"></div>
      </div>
    </div>
  );
};
