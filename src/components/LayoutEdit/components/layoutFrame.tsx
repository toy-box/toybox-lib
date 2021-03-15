import React, { FC, useRef } from 'react';

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
