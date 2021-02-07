import React, { FC, useMemo } from 'react';
import { Tooltip } from 'antd';
import { MoreFill } from '@airclass/icons';
import Avatar from '..';

import '../style.less';

export interface AvatarGroupProps {
  /**
   * @description  头像组数据
   * @default []
   */
  dataSource: AvatarData[];
  onClickMore?: () => void;
  /**
   * @description  最大显示数
   * @default 4
   */
  maxCount?: number;
}

export interface AvatarData {
  name: string;
  img?: string;
  id?: string | number;
}

const DEFAULT_MAX_COUNT = 4;

const AvatarGroup: FC<AvatarGroupProps> = ({
  dataSource,
  onClickMore,
  maxCount = DEFAULT_MAX_COUNT,
}) => {
  const more = useMemo(() => {
    if (dataSource.length > maxCount) {
      return (
        <i className="ant-avatar avatar-group-more" onClick={onClickMore}>
          <MoreFill />
        </i>
      );
    }
  }, [onClickMore]);
  return (
    <div className="tbox-avatar-group">
      {dataSource.map(
        (avatar, idx) =>
          idx <= maxCount - 1 && (
            <Avatar
              name={avatar.name}
              img={avatar.img}
              size="xs"
              key={idx}
              tooltip
            />
          ),
      )}
      {more}
    </div>
  );
};

export default AvatarGroup;
