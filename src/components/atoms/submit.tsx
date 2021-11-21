import React, { ReactElement } from 'react';

const Submit = ({ value, disabled = false }: { value: string; disabled?: boolean }): ReactElement => (
  <input className='button button--margin' type='submit' value={value} disabled={disabled} />
);

export default Submit;
