import React, { ReactElement } from 'react';

const Submit = ({ value }: { value: string }): ReactElement => {
  return <input type='submit' value={value} />;
};

export default Submit;
