import React, { FC, useCallback, useMemo, useState } from 'react';

export interface SingleInputGroupProps {
  value?: string[];
  size?: number;
  onlyNumber?: boolean;
  onChange?: (value: string[]) => void;
}

const SingleInputGroup: FC<SingleInputGroupProps> = ({
  value,
  size = 6,
  onlyNumber,
  onChange,
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

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (!/\d/.test(event.key)) {
        // values[index] = value ? value[index] : '';
        onChange &&
          onChange(values.map((v, idx) => (idx === index ? event.key : v)));
      } else {
        onChange &&
          onChange(values.map((v, idx) => (idx === index ? event.key : v)));
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

  return (
    <div className="tbox-quick-input">
      {values.map((v, index) => (
        <input
          key={`qi-${index}`}
          value={v}
          ref={input => (refs[index] = input)}
          maxLength={1}
          onKeyPress={e => handleKeyPress(e, index)}
          onKeyUp={e => handleKeyUp(e, index)}
        />
      ))}
    </div>
  );
};

export default SingleInputGroup;
