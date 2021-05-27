import React, { FC, ReactNode, useMemo } from 'react';
import classNames from 'classnames';
import { CheckFill } from '@airclass/icons';
import './style.less';

export interface CheckTextProps {
  text: ReactNode;
  checked?: boolean;
}

const CheckText: FC<CheckTextProps> = ({ text, checked, children }) => {
  const checkIcon = useMemo(() => (children ? children : <CheckFill />), []);
  return (
    <div className={classNames('tbox-check-text', { checked })}>
      <span className="tbox-check-text-icon">{checkIcon}</span>
      <span>{text}</span>
    </div>
  );
};

export default CheckText;
