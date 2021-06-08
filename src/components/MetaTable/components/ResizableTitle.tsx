import React, { FC } from 'react';
import { Resizable, ResizableProps } from 'react-resizable';
export { ResizeCallbackData } from 'react-resizable';

declare type ResizableTitleProps = Pick<ResizableProps, 'onResize'> & {
  width: number;
  [key: string]: any;
};

const ResizableTitle: FC<ResizableTitleProps> = ({
  onResize,
  width,
  ...restProps
}) => {
  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="resizable-title-handle"
          onClick={e => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

export default ResizableTitle;
