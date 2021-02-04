import React, { FC, ReactNode, useMemo, useState } from 'react';
import { Tabs } from 'antd';
import classNames from 'classnames';
import {
  RenderFunction,
  getRenderPropValue,
} from 'antd/lib/_util/getRenderPropValue';

const { TabPane } = Tabs;

export interface ContentItem {
  key: string;
  title: ReactNode | RenderFunction;
  content: ReactNode | RenderFunction;
  disabled?: boolean;
}

export interface ContainerProps {
  contents: ContentItem[];
  className?: string;
  activeKey?: string;
  extraContent: ReactNode | RenderFunction;
  centered?: boolean;
}

const Container: FC<ContainerProps> = ({
  contents,
  className,
  activeKey,
  extraContent,
  centered,
}) => {
  const [tabKey, setTabKey] = useState(activeKey || contents[0].key);
  const activeItem = useMemo(() => {
    return contents.find(c => c.key === tabKey);
  }, [tabKey, contents]);

  return (
    <div className={classNames('tbox-container', className)}>
      <div className="tbox-container-nav">
        <Tabs
          defaultActiveKey={activeKey}
          tabBarExtraContent={extraContent}
          onChange={setTabKey}
          centered={centered}
        >
          {contents.map((item, index) => (
            <TabPane tab={item.title} disabled={item.disabled} key={item.key} />
          ))}
        </Tabs>
      </div>
      <div className="tbox-container-content">
        {activeItem != null ? getRenderPropValue(activeItem.content) : null}
      </div>
    </div>
  );
};

export default Container;
