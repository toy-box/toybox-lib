import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { CheckLine } from '@airclass/icons';
import './style.less';

export interface CheckTextProps {
  text: ReactNode;
  checked?: boolean;
}

const CheckText: FC<CheckTextProps> = ({ text, checked }) => {
  return (
    <div className={classNames('tbox-check-text', { checked })}>
      {<CheckLine className="tbox-check-text-icon" />}
      <span>{text}</span>
    </div>
  );
};

export default CheckText;
