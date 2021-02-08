import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import './style.less';
export interface SingleInputGroupProps {
  value?: string[];
  size?: number;
  type?: 'number' | 'string';
  onChange?: (value: string[]) => void;
  onActive?: (value: string[]) => void;
  error?: boolean;
}

const SingleInputGroup: FC<SingleInputGroupProps> = ({
  value,
  size = 6,
  type = 'string',
  onChange,
  onActive,
  error,
}) => {
  const [refs, setRefs] = useState<any>([]);

  const values = useMemo(() => {
    const _values = new Array(size).fill('');
    if (value != null && value.length > 0) {
      for (let i = 0; i < value.length; i += 1) {
        _values[i] = value[i] != null ? value[i] : '';
      }
    }
    return _values;
  }, [value]);

  const active = useMemo(() => {
    return (
      value != null &&
      value.length === size &&
      value.every(v => v !== '' && v != null)
    );
  }, [value, size]);

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (type === 'number' && !/\d/.test(event.key)) {
        return;
      } else {
        onChange &&
          onChange(values.map((v, idx) => (idx === index ? event.key : v)));
        if (index < size - 1) {
          refs[index + 1].focus();
        }
      }
    },
    [values],
  );

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (event.keyCode === 8) {
        if (values[index] === '' && index > 0) {
          onChange &&
            onChange(values.map((v, idx) => (idx === index - 1 ? '' : v)));
          refs[index - 1].focus();
        } else {
          onChange &&
            onChange(values.map((v, idx) => (idx === index ? '' : v)));
        }
      }
    },
    [values, refs],
  );

  useEffect(() => {
    if (active && value != null) {
      onActive && onActive(value);
    }
  }, [active, value, onActive]);

  return (
    <div className="tbox-single-input-group">
      {values.map((v, index) => (
        <input
          key={`qi-${index}`}
          value={v}
          ref={input => (refs[index] = input)}
          maxLength={1}
          onKeyPress={e => handleKeyPress(e, index)}
          className={classNames({ active: v.length > 0, error })}
          onKeyUp={e => handleKeyUp(e, index)}
        />
      ))}
    </div>
  );
};

export default SingleInputGroup;
