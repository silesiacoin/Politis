import React, { ReactElement } from 'react';

interface Props {
  onClick: () => void;
  classes?: string;
  disabled?: boolean;
  children: string;
}

const Button = ({ onClick, classes, disabled, children }: Props): ReactElement => (
  <button type='button' className={classes ? `button ${classes}` : 'button'} onClick={onClick} disabled={disabled}>
    {children}
  </button>
);

export default Button;
