import React, { FC, ReactNode } from 'react';
import './style.less';

export interface ToolbarProps {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
}

const Toolbar = ({ left, center, right }: ToolbarProps) => {
  return (
    <div className="tbox-toolbar">
      <div className="tbox-toolbar__left">{left}</div>
      <div className="tbox-toolbar__center">{center}</div>
      <div className="tbox-toolbar__right">{right}</div>
    </div>
  );
};

export default Toolbar;
