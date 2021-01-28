import React, { FC, useMemo } from 'react';
import { Form } from 'antd';
import { FormProps, FormInstance } from 'antd/lib/form';
import { Store } from 'antd/lib/form/interface';
import { FieldMetaProfile } from '../../types/interface';
import Fields from '../Fields';
import { FieldMap, FieldItem, FieldItemProps } from '../MetaDescriptions/components/FieldItem';
import { fieldRules } from './rule';

const defaultFormFieldMap = {
  string: Fields.FieldString,
  text: Fields.FieldText,
  number: Fields.FieldNumber,
  date: Fields.FieldDate,
  datetime: Fields.FieldDate,
  singleOption: Fields.FieldSelect,
  boolean: Fields.FieldBoolean,
  businessObject: Fields.FieldSelect,
}
export interface MetaFormProps extends FormProps {
  fieldMetaProfiles: FieldMetaProfile[];
  fieldMap?: FieldMap;
  onFinish?: (data: Store) => Promise<void>;
  userForm?: FormInstance;
}

export type FormItemProps = FieldItemProps;

const MetaForm: FC<MetaFormProps> = ({ fieldMetaProfiles, fieldMap, onFinish, userForm, ...formProps }) => {
  const [form] = Form.useForm();
  const mergeFieldMap = useMemo(() => Object.assign({}, defaultFormFieldMap, fieldMap), [fieldMap]);
  const formItems = useMemo(() => {
    return fieldMetaProfiles.map((fieldProfile, idx) => {
      const { mode = 'edit', disabled, remote, remoteByValue, ...field } = fieldProfile;
      const rules = fieldRules(field);
      return <Form.Item key={idx} name={field.key} label={field.name} rules={rules} required={field.required}>
        <FieldItem
          field={field}
          mode={mode}
          disabled={disabled}
          fieldMap={mergeFieldMap}
          remote={remote}
          remoteByValue={remoteByValue}
        />
      </Form.Item>
    });
  }, [fieldMetaProfiles, mergeFieldMap]);
  return <Form form={userForm || form} onFinish={onFinish} {...formProps}>
    {formItems}
  </Form>;
}

export default MetaForm;
