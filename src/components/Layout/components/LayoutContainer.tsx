import React, { CSSProperties, FC } from 'react';
import classNames from 'classnames';
import '../style.less';

export type LayoutType =
  | 'leftSide'
  | 'rightSide'
  | 'header'
  | 'bottom'
  | 'body'
  | 'main'
  | 'page';

export interface LayoutContainerProps {
  type?: LayoutType;
  className?: string;
  style?: CSSProperties;
}

const LayoutContainer: FC<LayoutContainerProps> = ({
  type = 'container',
  className,
  style,
  children,
}) => {
  return (
    <div
      className={classNames(
        'tbox-layout-containter',
        `tbox-layout-containter__${type}`,
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
};

export default LayoutContainer;
