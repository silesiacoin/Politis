import React, { ReactElement } from 'react';

interface Props {
  onClick: () => void;
  classes?: string;
  children: string;
}

const Button = ({ onClick, classes, children }: Props): ReactElement => (
  <button
    className={classes ? `button ${classes}` : 'button'}
    onClick={onClick}>
    {children}
  </button>
);

export default Button;
