import React, {
  ReactNode,
  ForwardRefRenderFunction,
  useContext,
  useEffect,
  useMemo,
  useImperativeHandle,
  useRef,
  useState,
  useCallback,
} from 'react';
import classNames from 'classnames';
import { useScroll, useSize } from 'ahooks';
import LayoutEditContext from '../context';
import { LayoutItem } from './simpleLayout';
import { ItemSize, Size } from '../interface';

import '../styles/layoutPreview.less';

interface Pos {
  x?: number;
  y?: number;
}
export interface LayoutFrameProps {
  src: string;
  className?: string;
  frameWidth?: number;
  style?: any;
  fixWidth?: number;
  fixHeight?: number;
  previewWidth?: number;
  minHeight?: number;
  header?: ReactNode;
  footer?: ReactNode;
}

const LayoutFrame: ForwardRefRenderFunction<any, LayoutFrameProps> = (
  {
    src,
    className,
    frameWidth,
    style,
    fixWidth = 0,
    fixHeight = 0,
    previewWidth = 375,
    minHeight = 1164,
    header,
    footer,
  },
  ref,
) => {
  const prefixCls = 'tbox-layout-edit-preview';
  const previewWrapRef = useRef<any>();
  const innerRef = useRef<any>();
  useImperativeHandle(
    ref,
    () => ({
      contentWindow: innerRef.current.contentWindow,
    }),
    [innerRef.current],
  );
  const context = useContext(LayoutEditContext);
  const [ready, setReady] = useState(false);
  const [previewSize, setPreviewSize] = useState<Size>();
  const scroll = useScroll(previewWrapRef);
  const size = useSize(previewWrapRef);

  const previewHeight = useMemo(() => {
    return minHeight > (previewSize?.height || 0)
      ? minHeight
      : previewSize?.height;
  }, [previewSize]);

  // message handle
  useEffect(() => {
    if (context.messager) {
      context.messager.on('ready', () => {
        setReady(true);
      });
      context.messager.on('setAll', (layout: LayoutItem[]) =>
        context.change(layout),
      );
      context.messager.on('previewSize', (size: Size) => setPreviewSize(size));
      context.messager.on('activeItem', (key: string) =>
        context.setActive(key),
      );
    }
  }, [context.messager]);

  const addPalaceholder = useCallback(
    (type: unknown, pos: { x: number; y: number }) => {
      context.messager &&
        context.messager.broadcast('palaceholder', { type, pos });
    },
    [context.draging, context.change, context.messager],
  );

  const cancelPalaceholder = useCallback(() => {
    context.messager && context.messager.broadcast('removePalaceholder', null);
  }, [context.change, context.messager]);

  const palaceholderEnd = useCallback(() => {
    context.messager && context.messager.broadcast('palaceholderEnd', null);
  }, [context.messager]);

  const handleDargOverMask = useCallback(
    (event: React.MouseEvent) => {
      const leftFix = ((size.width || 0) - previewWidth) / 2;
      const x = (event.clientX || 0) + scroll.left - leftFix + fixWidth;
      const y = (event.clientY || 0) + scroll.top + fixHeight;
      addPalaceholder(context.draging?.type, { x, y });
    },
    [scroll, size.width, fixWidth, fixHeight, context.draging],
  );

  // iframe onload
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

  const mask = useMemo(() => {
    return context.draging ? (
      <div
        className={`${prefixCls}-drag-mask`}
        onMouseMove={handleDargOverMask}
        onMouseLeave={cancelPalaceholder}
        style={{ height: previewHeight }}
      />
    ) : null;
  }, [context.draging]);

  return (
    <div
      className={classNames(`${prefixCls}-wrap`, className)}
      style={style}
      ref={previewWrapRef}
    >
      {header}
      <div className={classNames(prefixCls, className)} style={frameStyle}>
        <iframe
          className={`${prefixCls}-iframe-wrap`}
          src={src}
          frameBorder="0"
          allowFullScreen={false}
          ref={innerRef}
          width="100%"
          height={previewHeight}
        />
      </div>
      {footer}
      {mask}
    </div>
  );
};

export default React.forwardRef(LayoutFrame);
