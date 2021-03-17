import React, {
  ForwardRefRenderFunction,
  useContext,
  useEffect,
  useMemo,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import LayoutEditContext from '../context';
import { LayoutItem } from './simpleLayout';

import '../styles/layoutPreview.less';

export interface LayoutFrameProps {
  src: string;
  className?: string;
  frameWidth?: number;
  style?: any;
}

const LayoutFrame: ForwardRefRenderFunction<any, LayoutFrameProps> = (
  { src, className, frameWidth, style },
  ref,
) => {
  const innerRef = useRef<any>();
  const prefixCls = 'tbox-layout-edit-preview';

  useImperativeHandle(
    ref,
    () => ({
      contentWindow: innerRef.current.contentWindow,
    }),
    [],
  );
  const context = useContext(LayoutEditContext);
  const [ready, setReady] = useState(false);
  const draging = useMemo(() => context.draging, [context.draging]);
  const [pos, setPos] = useState({
    clientX: 0,
    clientY: 0,
  });

  useEffect(() => {
    if (context.messager) {
      context.messager.on('ready', () => {
        setReady(true);
      });
      context.messager.on('setAll', (layout: LayoutItem[]) =>
        context.change('setAll', layout),
      );
    }
  }, [context.messager]);

  useEffect(() => {
    if (innerRef.current) {
      innerRef.current.onload = () => {
        setReady(true);
      };
    }
  }, [innerRef.current, setReady]);

  useEffect(() => {
    if (ready && context.messager) {
      context.messager.broadcast('publish', context.layout);
    }
  }, [context.layout, context.messager, ready]);

  const frameStyle = useMemo(
    () => ({
      width: frameWidth,
    }),
    [frameWidth],
  );

  return (
    <div className={classNames(`${prefixCls}-wrap`, className)} style={style}>
      <div className={classNames(prefixCls, className)} style={frameStyle}>
        <iframe
          className={`${prefixCls}-iframe-wrap`}
          src={src}
          frameBorder="0"
          allowFullScreen={false}
          ref={innerRef}
          width="100%"
          height="1164"
        />
        <div style={{ position: 'absolute', bottom: '120px' }}>
          {JSON.stringify(pos)}
        </div>
      </div>
      {true && (
        <div
          className={`${prefixCls}-drag-mask`}
          onDragOver={e =>
            setPos({
              clientX: e.clientX,
              clientY: e.clientY,
            })
          }
        />
      )}
    </div>
  );
};

export default React.forwardRef(LayoutFrame);
