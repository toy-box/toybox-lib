import React, { FC, ReactNode, useMemo, useCallback, useContext } from 'react';
import GridLayout from 'react-grid-layout';
import { FreeGirdContext } from '../context';

export interface FreeGirdItemProps {
  itemProps?: Record<string, any>;
  itemRender: (itemProps?: Record<string, any>) => ReactNode;
  layout: GridLayout.Layout;
}

export const FreeGridItem: FC<FreeGirdItemProps> = ({
  itemProps,
  itemRender,
  layout,
}) => {
  const actions = useContext(FreeGirdContext);

  const handleRemove = useCallback(() => {
    typeof actions.removeItem === 'function' && actions.removeItem(layout.i);
  }, [actions, layout.i]);

  const girdContent = useMemo(() => {
    return (
      <div className="free-grid-item--content">{itemRender(itemProps)}</div>
    );
  }, [itemProps]);

  return (
    <React.Fragment>
      <div className="free-grid-item">
        {girdContent}
        <div className="free-grid-item--panel">
          <div className="resize-handler left top"></div>
          <div className="resize-handler left bottom"></div>
          <div className="resize-handler right top"></div>
          <div className="resize-handler right bottom"></div>
        </div>
      </div>
    </React.Fragment>
  );
};
