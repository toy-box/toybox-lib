import React, { FC, ReactNode } from 'react';
import Cell from './Cell';

export interface HeaderProps {
  headWidth?: number;
  title?: ReactNode;
}

const Header: FC<HeaderProps> = ({ headWidth, title }) => {
  return (
    <Cell
      className="tbox-vertical-table-thead"
      width={headWidth}
      fixLeft={1}
      firstFixLeft
    >
      {title}
    </Cell>
  );
};

export default Header;
