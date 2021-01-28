import React, { FC, useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Search2Line } from '@airclass/icons';
import { Button, Input } from 'antd';
import classNames from 'classnames';
import { SearchProps } from './Search';

import '../style.less';

export interface IconSearchProps extends SearchProps {
  searchClassName?: string;
  direction?: 'ltr' | 'rtl';
  triggerTooltipProps?: string;
}

export const IconSearch: FC<IconSearchProps> = ({
  addonAfter,
  autoFocus = false,
  defaultValue,
  value,
  onChange,
  onSearch,
  onClear,
  placeholder,
  allowClear = true,
  disabled = false
}) => {
  const [focus, setFocus] = useState(autoFocus);
  const inputRef = useRef<Input>(null);

  useEffect(() => {
    autoFocus && inputRef?.current?.focus();
  }, [autoFocus])

  const innerOnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.type === 'click' && (event.target.value === '' || event.target.value == null)) {
      onClear && onClear();
    }
    onChange && onChange(event.target.value);
  }, [onChange, onClear]);

  const innerOnSearch = useCallback((event: any) => {
    onSearch && onSearch(event.target.value);
  }, [onSearch]);


  const prefix = useMemo(() => {
    return <Search2Line />
  }, []);

  const handleFocus = useCallback(() => {
    setFocus(true);
  }, []);
  const handleBlur = useCallback(() => {
    setFocus(false);
  }, []);

  const holdInput = useMemo(() => {
    return focus || (inputRef?.current?.input.value != null && inputRef?.current?.input.value !== '');
  }, [focus]);

  const notEmpty = useMemo(() => value != null && value !== '', [value]);
  const showInput = useMemo(() => notEmpty || holdInput, [holdInput, value]);

  return (
    <div className="tbox-icon-search">
      {
        showInput
          ? null
          : <Button
              className="tbox-icon-search-icon"
              type="text"
              onClick={() => inputRef.current?.focus()}
              icon={<Search2Line />}
            />
      }
      <div className={classNames('tbox-search', showInput ? 'tbox-search-hold' : 'tbox-search-fold')}>
        <Input
          className='tbox-search-input'
          ref={inputRef}
          prefix={prefix}
          defaultValue={defaultValue}
          value={value}
          placeholder={placeholder}
          onPressEnter={innerOnSearch}
          onChange={innerOnChange}
          addonAfter={addonAfter}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          allowClear={allowClear}
        />
      </div>
    </div>
  )
}
