import React, { FC, ReactNode } from 'react';
import Cell from './Cell';

export interface HeaderProps {
  headerWidth?: number;
  title?: ReactNode;
}

const Header: FC<HeaderProps> = ({ headerWidth, title }) => {
  return (
    <Cell
      className="tbox-vertical-table-thead"
      width={headerWidth}
      fixLeft={0}
      firstFixLeft
    >
      {title}
    </Cell>
  );
};

export default Header;
