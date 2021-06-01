import React, { CSSProperties, FC, ReactNode } from 'react';
import LayoutContainter from './LayoutContainer';

export interface PageWithHeader {
  header?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const PageWithHeader: FC<PageWithHeader> = ({
  header,
  className,
  style,
  children,
}) => {
  return (
    <LayoutContainter type="page" className={className} style={style}>
      <LayoutContainter type="header">{header}</LayoutContainter>
      <LayoutContainter type="body">
        <LayoutContainter type="main">{children}</LayoutContainter>
      </LayoutContainter>
    </LayoutContainter>
  );
};

export default PageWithHeader;
