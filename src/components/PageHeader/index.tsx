import React, { FC, ReactNode } from 'react';
import { PageHeader as AntPageHeader } from 'antd';
import { ArrowLeftSLine, ArrowRightSLine } from '@airclass/icons';
import { default as Button } from '../Button';
import { PageHeaderProps as AntPageHeaderProps } from 'antd/lib/page-header';
import {
  ConfigConsumer,
  ConfigConsumerProps,
  DirectionType,
} from 'antd/lib/config-provider';
import { MetaRoute } from '../../types/interface';
import useMetaRoute from '../../hooks/useMetaRoute';

export type PageHeaderProps = AntPageHeaderProps & {
  metaRoutes?: MetaRoute[];
};

const getBackIcon = (
  backIcon?: ReactNode,
  direction: DirectionType = 'ltr',
) => {
  if (backIcon != null) {
    return backIcon;
  }
  return (
    <Button
      icon={direction === 'rtl' ? <ArrowRightSLine /> : <ArrowLeftSLine />}
    />
  );
};

const PageHeader: FC<PageHeaderProps> = ({
  metaRoutes,
  backIcon,
  ...other
}) => {
  const routes = useMetaRoute(metaRoutes);
  return (
    <ConfigConsumer>
      {({ direction }: ConfigConsumerProps) => {
        return (
          <AntPageHeader
            breadcrumb={routes ? { routes } : undefined}
            backIcon={getBackIcon(backIcon, direction)}
            {...other}
          />
        );
      }}
    </ConfigConsumer>
  );
};

export default PageHeader;
