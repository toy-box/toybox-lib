import React, { FC, ReactNode } from 'react'
import '../style.less';
export interface PanelProps {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
}

export const Panel: FC<PanelProps> = ({ left, center, right }) => {
  return (
    <div className='tbox-panel'>
      <div className='tbox-panel--left'>{left}</div>
      <div className='tbox-panel--center'>{center}</div>
      <div className='tbox-panel--right'>{right}</div>
    </div>
  )
}
