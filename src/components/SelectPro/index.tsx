import React, {
  ForwardRefRenderFunction,
  useRef,
  useMemo,
  useContext,
  useImperativeHandle,
  useState,
  useEffect,
  useCallback,
  ReactText,
  ReactNode,
} from 'react';
import { default as Select, SelectProps } from 'antd/lib/select';
import SizeContext from 'antd/lib/config-provider/SizeContext';
import debounce from 'lodash.debounce';
import intersection from 'lodash.intersection';
import useFetchOptions from './hooks/useFetchOptions';

export interface OptionItem {
  label: React.ReactNode;
  value: React.ReactText;
}

type SelectValue = React.ReactText | React.ReactText[];

export interface SelectProProps extends Omit<SelectProps<SelectValue>, 'mode'> {
  value?: SelectValue;
  defaultValue?: SelectValue;
  placeholder?: string;
  params?: any;
  disabled?: boolean;
  options?: OptionItem[];
  mode?: 'multiple' | 'tags';
  selectProps?: any;
  style?: any;
  remote?: (key: string, params?: any) => Promise<OptionItem[]>;
  remoteByValue?: (value: ReactText | ReactText[], params?: any) => Promise<OptionItem>;
  readMode?: boolean;
}

const defaultRemote = () =>
  new Promise<OptionItem[]>(resolve => {
    resolve([]);
  });

const SelectPro: ForwardRefRenderFunction<any, SelectProProps> = (
  {
    defaultValue,
    value,
    placeholder,
    params,
    mode,
    disabled,
    options,
    selectProps,
    readMode,
    onChange,
    remote,
    remoteByValue,
  },
  ref,
) => {
  const [loading, remoteOptions, fetchData] = useFetchOptions(
    remote || defaultRemote,
    params,
  );
  const [initOptions, setInitOptions] = useState<OptionItem[]>([]);
  const [initialed, setInitialed] = useState(false);
  const inputRef = useRef<any>();
  const size = useContext(SizeContext);

  const mergeOptions = useMemo(() => {
    if (remote == null) {
      return options;
    }
    if (
      intersection(
        remoteOptions.map(o => o.value),
        (initOptions || []).map(io => io.value),
      ).length === initOptions.length
    ) {
      return remoteOptions;
    }
    if (initOptions != null && initOptions.length > 0) {
      return [...initOptions].concat(...remoteOptions);
    }
    return remoteOptions;
  }, [initOptions, options, remoteOptions, remote]);

  const innerValue = useMemo(() => {
    if (remote && !initialed) {
      return null;
    }
    return value;
  }, [initialed, remote, value]);

  const current = useMemo(
    () => {
      if (mode === 'multiple') {
        return mergeOptions ? mergeOptions.filter(opt => ((innerValue as React.ReactText[]) || []).some(v => v === opt.value)) : null;
      }
      return mergeOptions ? mergeOptions.find(opt => opt.value === innerValue) : null;
    },
    [mode, mergeOptions, innerValue],
  );

  const values = useMemo(() => {
    if (Array.isArray(current)) {
      return current.map(opt => opt.label);
    }
    return current ? current.label : null;
  }, [current])

  useImperativeHandle(ref, () => ({
    ...(inputRef.current || {}),
    values,
    fetchData,
  }));

  useEffect(() => {
    const init = async () => {
      if (value != null && current == null && !initialed && remoteByValue) {
        const options = await remoteByValue(value, params);
        if (Array.isArray(options)) {
          setInitOptions(options);
        } else {
          setInitOptions([options]);
        }
      }
      if (remote != null && !initialed) {
        await fetchData('');
      }
      setInitialed(true);
    };
    init();
  }, [current, initialed, fetchData, params, remote, remoteByValue, value]);

  const handleChange = useCallback(
    (value: React.ReactText, options: OptionItem | OptionItem[]) => {
      onChange && onChange(value, options);
    },
    [onChange],
  );

  if (readMode) {
    return <span>{Array.isArray(values) ? (values).join(', ') : values}</span>;
  }
  return <Select
    value={innerValue}
    onChange={debounce(handleChange, 500)}
    defaultValue={defaultValue}
    showSearch={remote != null}
    size={size}
    onSearch={fetchData}
    loading={loading}
    placeholder={placeholder}
    ref={inputRef}
    options={mergeOptions}
    filterOption={false}
    mode={mode}
    disabled={disabled}
    {...selectProps}
  />
};

export default React.forwardRef(SelectPro);
