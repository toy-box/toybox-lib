import React, {
  FC,
  CSSProperties,
  ReactNode,
  useCallback,
  useState,
} from 'react';
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import collapseMotion from 'antd/es/_util/motion';

import './style.less';

export interface IFieldSegmentProps {
  title: ReactNode;
  className?: string;
  style?: CSSProperties;
  extend?: ReactNode;
}

const FieldSegment: FC<IFieldSegmentProps> = ({
  title,
  className,
  style,
  extend,
  children,
}) => {
  const [collapse, setCollapse] = useState(false);
  const handleCollapse = useCallback(() => setCollapse(!collapse), [
    collapse,
    setCollapse,
  ]);
  const prefixCls = 'tbox-field-segment';

  return (
    <div className={classNames(prefixCls, className)} style={style}>
      <div className={`${prefixCls}-header`}>
        <div className={`${prefixCls}-header__title`} onClick={handleCollapse}>
          {title}
        </div>
        <div className={`${prefixCls}-header__extend`}>{extend}</div>
      </div>
      <CSSMotion
        visible={!collapse}
        removeOnLeave={false}
        leavedClassName={`${prefixCls}-content--hidden`}
        motionAppear={false}
        {...collapseMotion}
      >
        {({ className, style }, ref) => (
          <div
            ref={ref}
            className={classNames(`${prefixCls}-content`, className)}
            style={style}
          >
            {children}
          </div>
        )}
      </CSSMotion>
    </div>
  );
};

export default FieldSegment;
