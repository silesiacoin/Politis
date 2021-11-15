import React, { ChangeEvent, ReactElement } from 'react';

interface Props {
  value: string;
  onChange: (event: ChangeEvent) => void;
  placeholder?: string;
  required?: boolean;
}

const InputString = ({
  value,
  onChange,
  placeholder,
  required = false,
}: Props): ReactElement => (
  <input
    type='text'
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required={required}
  />
);

export default InputString;
