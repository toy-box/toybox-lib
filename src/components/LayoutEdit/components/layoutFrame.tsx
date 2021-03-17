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

import '../styles/layoutFrame.less';

export interface LayoutFrameProps {
  src: string;
  style?: any;
  className?: string;
}

const LayoutFrame: ForwardRefRenderFunction<any, LayoutFrameProps> = (
  { src, className, style },
  ref,
) => {
  const innerRef = useRef<any>();
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

  return (
    <React.Fragment>
      <iframe
        className={classNames('preview-iframe-wrap', className)}
        style={style}
        src={src}
        frameBorder="0"
        allowFullScreen={false}
        width="100%"
        height={601}
        ref={innerRef}
      />
      {draging && (
        <div
          className="preview-drag-mask"
          onDragOver={e =>
            console.log('mask over', e.screenX, e.screenY, e.pageX, e.pageY)
          }
        />
      )}
    </React.Fragment>
  );
};

export default React.forwardRef(LayoutFrame);
