import React, {
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
import { ItemSize } from '../interface';

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
}

const fixWidth = 318 + 24 + 200 - 15;

const LayoutFrame: ForwardRefRenderFunction<any, LayoutFrameProps> = (
  { src, className, frameWidth, style },
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
  const scroll = useScroll(previewWrapRef);
  const size = useSize(previewWrapRef);
  // const [layoutCache, setLayoutCache] = useState<LayoutItem[]>([]);
  // const [iframePosX, setIframePosX] = useState<number | undefined>();
  // const [iframePosY, setIframePosY] = useState<number | undefined>();

  // message handle
  useEffect(() => {
    if (context.messager) {
      context.messager.on('ready', () => {
        setReady(true);
      });
      context.messager.on('setAll', (layout: LayoutItem[]) =>
        context.change(layout),
      );
      context.messager.on('itemSize', (itemSize: ItemSize) => console.log);
    }
  }, [context.messager]);

  const addPalaceholder = useCallback(
    (type: string, pos: { x: number; y: number }) => {
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
      const x =
        (event.clientX || 0) +
        scroll.left -
        ((size.width || 0) - 375) / 2 -
        fixWidth;
      const y = (event.clientY || 0) + scroll.top;
      console.log('move mask', x, y);
      if (x > 0 && y > 0) {
        addPalaceholder('card', { x, y });
      }
    },
    [scroll],
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
      />
    ) : null;
  }, [context.draging]);

  return (
    <div
      className={classNames(`${prefixCls}-wrap`, className)}
      style={style}
      ref={previewWrapRef}
    >
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
      </div>
      {mask}
    </div>
  );
};

export default React.forwardRef(LayoutFrame);
