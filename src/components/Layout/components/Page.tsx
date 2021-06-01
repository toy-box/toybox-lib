import React, { CSSProperties, FC, ReactNode } from 'react';
import LayoutContainter from './LayoutContainer';

export interface PageProps {
  style?: CSSProperties;
  className?: string;
}

const Page: FC<PageProps> = ({ style, className, children }) => {
  return (
    <LayoutContainter type="page" style={style} className={className}>
      {children}
    </LayoutContainter>
  );
};

export default Page;
