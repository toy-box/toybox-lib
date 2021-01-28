import React, { ReactNode, useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { Input } from 'antd';
import classNames from 'classnames';
import { IconSearch } from './IconSearch';

import '../style.less';

export interface SearchProps {
  type?: 'normal' | 'nav-search';
  addonAfter?: ReactNode;
  autoFocus?: boolean;
  defaultValue?: string;
  value?: string | number;
  onChange?: (value: string | number) => void;
  onSearch?: (value: string | number) => void;
  onClear?: () => void;
  placeholder?: string;
  allowClear?: boolean;
  disabled?: boolean;
}

const SEARCH_ICON_NAME = 'ri-search-2-line';

const Search = ({ type = 'normal', addonAfter, autoFocus = false, defaultValue, value, onChange, onSearch, onClear, placeholder, allowClear = true, disabled = false }: SearchProps) => {
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
  },[onChange, onClear]);

  const innerOnSearch = useCallback((event: any) => {
    onSearch && onSearch(event.target.value);
  }, [onSearch]);


  const prefix = useMemo(() => {
    return type === 'normal' ? <i className={SEARCH_ICON_NAME} /> : <span />
  }, [type]);

  const searchMask = useMemo(() => {
    return type === 'nav-search' ? <div className="tbox-search-mask">
      <i className={SEARCH_ICON_NAME} />
      <span className="tbox-search-mask-text">{placeholder}</span>
    </div> : null;
  }, [type, placeholder])

  const handleFocus = useCallback(() => {
    setFocus(true);
  }, []);
  const handleBlur = useCallback(() => {
    setFocus(false);
  }, []);

  const placeholderVisible = useMemo(() => {
    if (type === 'nav-search') {
      return focus;
    }
    return true;
  }, [focus, type])

  const holdInput = useMemo(() => {
    return focus || (inputRef?.current?.input.value != null && inputRef?.current?.input.value !== '');
  }, [focus])

  return (
    <div className={classNames('tbox-search', `tbox-${type}`, { 'tbox-search-focus': holdInput })}>
      { searchMask }
      <Input
        ref={inputRef}
        prefix={prefix}
        defaultValue={defaultValue}
        value={value}
        placeholder={placeholderVisible ? placeholder : ''}
        onPressEnter={innerOnSearch}
        onChange={innerOnChange}
        addonAfter={addonAfter}
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        allowClear={allowClear}
      />
    </div>
  )
}

Search.IconSearch = IconSearch;

export default Search;
