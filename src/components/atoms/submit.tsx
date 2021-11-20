import React, { ReactElement } from 'react';

const Submit = ({
  value,
  disabled = false,
}: {
  value: string;
  disabled?: boolean;
}): ReactElement => <input type='submit' value={value} disabled={disabled} />;

export default Submit;
