import React, { FC } from 'react';
import { Spin } from 'antd';
import './style.less';

export interface LoadingWrapperProps {
  size?: 'small' | 'default' | 'large';
  loading: boolean;
}

const LoadingWrapper: FC<LoadingWrapperProps> = ({ size, loading, children }) => {
  return (
    <React.Fragment>
      {
        loading
          ?
          <div className="loading-wrapper">
            <Spin size={size} />
          </div>
          : children
      }
    </React.Fragment>
  );
}

export default LoadingWrapper;