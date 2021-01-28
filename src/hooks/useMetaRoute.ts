import { MetaRoute } from '../types/interface';

const useMetaRoute = (metaRoutes?: MetaRoute[]) => {
  const metaPath = (metaRoute: MetaRoute) => {
    switch (metaRoute.mode) {
      case 'list':
        return `${metaRoute.objectKey}`;
      case 'view':
        return `${metaRoute.objectKey}/${metaRoute.objectId}`;
      default:
        return '';
    }
  };

  const metaPathName = (metaRoute: MetaRoute) => {
    switch (metaRoute.mode) {
      case 'list':
        return `${metaRoute.objectName}`;
      case 'view':
        return `${metaRoute.objectName}详情`;
      default:
        return '';
    }
  };

  return metaRoutes == null ? null : metaRoutes.map(metaRoute => ({
    path: metaPath(metaRoute),
    breadcrumbName: metaPathName(metaRoute)
  }));
}

export default useMetaRoute;
