import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import './styles.less';

export interface BrandProps {
  brand: ReactNode;
  style?: any;
  className?: string;
}

const Brand: FC<BrandProps> = ({ brand, style, className }) => {
  return <div className={classNames('brand', className)} style={style}>
    {brand}
  </div>
}

export default Brand;
