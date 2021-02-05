import React, { FC, useMemo, ReactNode } from 'react';
import { Tabs } from 'antd';
import classNames from 'classnames';
import PageHeader from '../PageHeader';
import { BusinessObjectMeta } from '../../types/interface';
import MetaDescriptons from '../MetaDescriptions';
import TabContainer from '../TabContainer';
import useObjectMeta from '../../hooks/useBusinessObjectMeta';

const { TabPane } = Tabs;

export interface BusinessObjectPageProps {
  showTitle: boolean;
  businessObjectMeta: BusinessObjectMeta;
  data: Record<string, any>;
  onBack?: () => void;
  extraContent?: ExtraRender[];
  className?: string;
}

export interface ExtraRender {
  key: string;
  title: string;
  render: (
    businessObjectMeta: BusinessObjectMeta,
    data: Record<string, any>,
  ) => ReactNode;
}

const BusinessObjectPage: FC<BusinessObjectPageProps> = ({
  showTitle,
  businessObjectMeta,
  data,
  onBack,
  extraContent,
  className,
}) => {
  const objectName = useMemo(() => data[businessObjectMeta.titleKey || 'id'], [
    businessObjectMeta.titleKey,
    data,
  ]);

  const title = useMemo(
    () =>
      businessObjectMeta.name != null ? businessObjectMeta.name : objectName,
    [businessObjectMeta.name, objectName],
  );

  const subTitle = useMemo(
    () => (businessObjectMeta.name != null ? objectName : null),
    [businessObjectMeta.name, objectName],
  );

  const fieldItemsMeta = useObjectMeta(businessObjectMeta);
  const extra = useMemo(() => {
    if (extraContent != null && extraContent.length > 0) {
      const contents = extraContent.map((content, index) => ({
        key: content.key,
        title: content.title,
        content: content.render(businessObjectMeta, data),
      }));
      return <TabContainer contents={contents} />;
    }
    return null;
  }, [businessObjectMeta, data, extraContent, fieldItemsMeta]);
  return (
    <div className={classNames('tbox-page', className)}>
      {showTitle ? (
        <PageHeader title={title} subTitle={subTitle} onBack={onBack} />
      ) : null}
      {
        <MetaDescriptons
          fieldItemMetas={fieldItemsMeta}
          mode="read"
          data={data}
        />
      }
      {extra}
    </div>
  );
};

export default BusinessObjectPage;
