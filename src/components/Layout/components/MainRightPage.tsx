import React, { FC, ReactNode } from 'react';
import LayoutContainter from './LayoutContainer';

export interface MainRightPage {
  rightContent?: ReactNode;
  mainContent?: ReactNode;
}

const MainRightPage: FC<MainRightPage> = ({ rightContent, mainContent }) => {
  return (
    <LayoutContainter type="page">
      <LayoutContainter type="body">
        <LayoutContainter type="main">{mainContent}</LayoutContainter>
        <LayoutContainter type="rightSide">{rightContent}</LayoutContainter>
      </LayoutContainter>
    </LayoutContainter>
  );
};

export default MainRightPage;
