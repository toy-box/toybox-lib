import React, { FC, ReactNode } from 'react';
import { Layout } from 'antd';
import classNames from 'classnames';

export interface HeaderProps {
  classname?: string;
  theme?: string;
  style?: Record<string, string | number>,
  brand?: ReactNode;
  content?: ReactNode;
  rightRender?: ReactNode;
}

const Header: FC<HeaderProps> = ({ brand, content, rightRender, classname, style }) => {
  return <Layout.Header style={style} className={classNames('tbox-header', classname)}>
    <div className='tbox-header--brand'>{brand}</div>
    <div className='tbox-header--content'>{content}</div>
    <div className='tbox-header--right'>{rightRender}</div>
  </Layout.Header>;
}

export default Header;
