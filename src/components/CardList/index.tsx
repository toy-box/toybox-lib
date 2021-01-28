/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { FC } from 'react';
import './style.less';

export interface CardListProps {
  dataSource: Record<string, any>[]
  card: React.FunctionComponent;
}


const CardList: FC<CardListProps> = ({ dataSource, card }) => {
  return <div className='tbox-card-list'>
      {dataSource.map((item, key) => <div className='tbox-card-container' key={key}>{card(item)}</div>)}
    </div>
} 

export default CardList;