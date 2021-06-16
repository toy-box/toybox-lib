import React, { FC, useCallback, useMemo } from 'react';

export interface IBackgroundProps {
  width: number;
  height?: number;
  rowHeight: number;
  cols: number;
  margin?: [number, number];
  containerPadding?: [number, number];
}
export const Background: FC<IBackgroundProps> = ({
  width,
  height = 0,
  rowHeight,
  cols,
  margin = [10, 10],
  containerPadding,
}) => {
  const innerPadding = useMemo(() => containerPadding || margin, [
    containerPadding,
    margin,
  ]);
  const cellWidth = useMemo(
    () => (width - innerPadding[0] * 2 + margin[0]) / cols - margin[0],
    [innerPadding],
  );
  const patternHeight = useMemo(() => (rowHeight + margin[1]) / height, [
    rowHeight,
    margin,
    height,
  ]);
  const RenderBlock = useCallback(
    (props: { index: number }) => {
      const x = margin[0] * (props.index + 1) + cellWidth * props.index;
      const y = margin[1];
      return (
        <rect
          x={x}
          y={y}
          width={cellWidth}
          height={rowHeight}
          fill="hsl(210, 44%, 91%)"
        ></rect>
      );
    },
    [cellWidth, innerPadding],
  );

  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
    >
      <defs>
        <pattern id="pattern2" x="0" y="0" width="1" height={patternHeight}>
          {Array(cols)
            .fill(1)
            .map((k, index) => (
              <RenderBlock key={index} index={index} />
            ))}
        </pattern>
      </defs>
      <rect
        fill="url(#pattern2)"
        x="0"
        y="0"
        width={width}
        height={height}
      ></rect>
    </svg>
  );
};
