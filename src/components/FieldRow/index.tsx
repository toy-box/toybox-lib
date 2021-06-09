import React, { FC, CSSProperties } from 'react';
import classNames from 'classnames';

import './style.less';

export interface IFieldRowProps {
  className?: string;
  style?: CSSProperties;
}

const FieldRow: FC<IFieldRowProps> = ({ className, style, children }) => {
  const prefixCls = 'tbox-field-row';
  return (
    <div className={classNames(prefixCls, className)} style={style}>
      {children}
    </div>
  );
};

export default FieldRow;
