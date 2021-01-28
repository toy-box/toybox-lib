import React, { FC, useMemo } from 'react';
import { Descriptions } from 'antd';
import { DescriptionsProps } from 'antd/lib/descriptions';
import { FieldMeta } from '../../types/interface';
import { FieldItem, FieldMap } from './components/FieldItem';
import { FieldMode, defaultFieldMap } from '../Fields';

export type ItemMeta = FieldMeta &  {
  mode?: FieldMode;
}

export type MetaDescriptonsProps = DescriptionsProps & {
  fieldItemMetas: ItemMeta[];
  mode: FieldMode;
  data: Record<string, any>;
  fieldMap?: FieldMap;
}

const MetaDescriptons: FC<MetaDescriptonsProps> = ({
  fieldItemMetas,
  fieldMap,
  mode,
  data,
  ...otherProps
}) => {
  const mergeFieldMap = useMemo(() => Object.assign({}, defaultFieldMap, fieldMap), [fieldMap]);
  const fields = useMemo(() => {
    return fieldItemMetas.map(
      (field, idx) => 
        <Descriptions.Item key={idx} label={field.name}>
          <FieldItem
            mode={mode}
            field={field}
            value={data[field.key]}
            fieldMap={mergeFieldMap}
          />
        </Descriptions.Item>
    )
  }, [data, fieldItemMetas, mode, mergeFieldMap]);

  return <Descriptions {...otherProps}>
    {fields}
  </Descriptions>
}

export default MetaDescriptons;
