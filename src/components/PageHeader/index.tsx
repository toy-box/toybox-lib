import React, { FC } from 'react';
import { PageHeader as AntPageHeader } from 'antd';
import { PageHeaderProps as AntPageHeaderProps } from 'antd/lib/page-header';
import { MetaRoute } from '../../types/interface';
import useMetaRoute from '../../hooks/useMetaRoute';

export type PageHeaderProps = AntPageHeaderProps & {
  metaRoutes?: MetaRoute[];
}

const PageHeader: FC<PageHeaderProps> = ({ metaRoutes, title, ...other }) => {
  const routes = useMetaRoute(metaRoutes);
  return title ? <AntPageHeader breadcrumb={routes ? { routes } : undefined} title={title} {...other} /> : null;
}

export default PageHeader;
