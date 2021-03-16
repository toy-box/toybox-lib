import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import LayoutEditContext from '../context';
import Messager from './Message';
import { LayoutItem } from './simpleLayout';

export interface LayoutFrameProps {
  src: string;
  style?: any;
  className?: string;
}

export const LayoutFrame: FC<LayoutFrameProps> = ({
  src,
  className,
  style,
}) => {
  const ref = useRef<any>();
  const context = useContext(LayoutEditContext);
  const [ready, setReady] = useState(false);

  const [messager, setMessager] = useState<Messager>();

  useEffect(() => {
    console.log('set messager', ref.current.contentWindow);
    setMessager(
      new Messager(ref.current.contentWindow, 'http://localhost:8080'),
    );
  }, [setMessager, ref]);

  useEffect(() => {
    if (messager) {
      messager.on('ready', () => {
        setReady(true);
      });
      messager.on('setAll', (layout: LayoutItem[]) =>
        context.change('setAll', layout),
      );
      // messager.on('mousemove', handleMouseMove);
      // messager.on('mouseup', handleMouseUp);
      return () => messager && messager.destroy();
    }
  }, [messager]);

  useEffect(() => {
    ref.current.onload = () => {
      setReady(true);
    };
  }, [ref, setReady]);

  useEffect(() => {
    if (ready && messager) {
      messager.broadcast('publish', context.layout);
    }
  }, [context.layout, messager, ready]);

  const handleMouseMove = useCallback(
    (data: any) => {
      const rect = ref.current.getBoundingClientRect();
      const pos = {
        clientX: data.clientX + rect.left,
        clientY: data.clientY + rect.top,
      };
      document.dispatchEvent(new MouseEvent('mousemove', pos));
    },
    [ref.current],
  );

  const handleMouseUp = useCallback(
    (data: any) => {
      const rect = ref.current.getBoundingClientRect();
      const pos = {
        clientX: data.clientX + rect.left,
        clientY: data.clientY + rect.top,
      };
      document.dispatchEvent(new MouseEvent('mouseup', pos));
    },
    [ref.current],
  );

  return (
    <div className={className} style={style}>
      <iframe
        src={src}
        frameBorder="0"
        allowFullScreen={false}
        width="100%"
        height={601}
        ref={ref}
      />
    </div>
  );
};
