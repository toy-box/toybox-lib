import React, { FC, ReactNode } from 'react';
import LayoutContainter from './LayoutContainer';

export interface LeftMainPageProps {
  leftContent?: ReactNode;
  mainContent?: ReactNode;
}

const LeftMainPage: FC<LeftMainPageProps> = ({ leftContent, mainContent }) => {
  return (
    <LayoutContainter type="page">
      <LayoutContainter type="body">
        <LayoutContainter type="leftSide">{leftContent}</LayoutContainter>
        <LayoutContainter type="main">{mainContent}</LayoutContainter>
      </LayoutContainter>
    </LayoutContainter>
  );
};

export default LeftMainPage;
