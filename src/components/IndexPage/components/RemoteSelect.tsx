import React, { useRef, useEffect, useImperativeHandle, ForwardRefRenderFunction } from 'react';
import { Select } from 'antd';
import { OptionItem } from './IndexSearch';
import useFetchOptions from '../../Fields/Select/hooks/useFetchOptions';

export interface RemoteSelectProps {
  value?: SelectValue;
  placeholder?: string;
  remote: (query: string) => Promise<OptionItem[]>;
  onChange?: (value: string | number) => void;
  style?: any;
  allowClear?: boolean;
}

type SelectValue = React.ReactText | React.ReactText[];


const RemoteSelect: ForwardRefRenderFunction<any, RemoteSelectProps> = ({ value, placeholder, style, allowClear, remote, onChange }, ref) => {
  const inputRef = useRef<any>();
  const [loading, remoteOptions, fetchData] = useFetchOptions(remote);
  useEffect(() => {
    const init = async () => {
      await fetchData('');
    };
    init();
  }, [fetchData]);

  useImperativeHandle(ref, () => ({
    ...(inputRef.current || {}),
    fetchData,
  }));

  return <Select
    ref={inputRef}
    value={value}
    style={style}
    loading={loading}
    placeholder={placeholder}
    options={remoteOptions}
    onSearch={fetchData}
    onChange={onChange}
    allowClear={allowClear}
    showSearch
  />
}

export default React.forwardRef(RemoteSelect);
