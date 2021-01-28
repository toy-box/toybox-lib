import React, { FC, useCallback, ReactNode, useMemo, useState } from 'react';
import { Drawer, Button } from 'antd';
import { DrawerProps } from 'antd/lib/drawer';
import { useForm } from 'antd/lib/form/Form';
import { CloseLine as CloseIcon } from '@airclass/icons';
import useModal from './useModal';
import { default as MetaForm, MetaFormProps } from '../components/MetaForm';

export interface FormDrawerProps {
  title?: ReactNode;
  onFinish: (data: any) => Promise<any>;
  onCancel: () => void;
  drawerProps: Omit<DrawerProps, 'title' | 'visible' | 'footer' | 'onOk' | 'onCancel'>;
  formProps: Omit<MetaFormProps, 'onFinish'>;
}

export default ({ title, drawerProps, formProps, onFinish, onCancel }: FormDrawerProps) => {
  const [visible, setVisible] = useModal();
  const { ...other } = formProps;
  const [form] = useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = useCallback(async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);
      onFinish && await onFinish(values);
      form.setFieldsValue(formProps.initialValues);
      setVisible(false);
      setSubmitting(false);
    } catch (e) {
      setSubmitting(false);
      console.warn(e);
    }
  }, [form, formProps.initialValues, onFinish, setVisible]);

  const handleCancel = useCallback(() => {
    try {
      form.setFieldsValue(formProps.initialValues);
      onCancel && onCancel();
      setVisible(false);
    } catch (e) {
      console.warn(e);
    }
  }, [form, formProps.initialValues, onCancel, setVisible]);

  const footer = useMemo(() => {
    return (
      <div
        style={{
          textAlign: 'right',
        }}
      >
        <Button onClick={handleCancel} style={{ marginRight: 8 }} loading={submitting}>
          Cancel
              </Button>
        <Button onClick={handleSubmit} type="primary">
          Submit
        </Button>
      </div>
    )
  }, [handleCancel, handleSubmit, submitting]);

  const FormDrawer: FC = ({ children }) => {
    const { closeIcon, ...drawerOtherProps } = drawerProps;
    const drawerCloseIcon = closeIcon || <CloseIcon />
    return (
      <React.Fragment>
        <Drawer title={title} visible={visible} onClose={handleCancel} footer={footer} closeIcon={drawerCloseIcon} {...drawerOtherProps}>
          <MetaForm userForm={form} onFinish={handleSubmit} {...other} />
        </Drawer>
        {
          children && React.cloneElement(<span>{children}</span>, { onClick: () => setVisible(true) })
        }
      </React.Fragment>
    )
  }

  return [FormDrawer, visible, setVisible] as [FC, boolean, (visible: boolean) => void];
}