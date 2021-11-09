import React, { ReactElement } from 'react';

type Props = {
  onClick?: () => void;
  classes?: string;
  children: string;
};

const Button = ({ onClick, classes, children }: Props): ReactElement => (
  <button className={`button ${classes}`} onClick={onClick}>
    {children}
  </button>
);

export default Button;
