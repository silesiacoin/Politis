import React, { ReactElement, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Label = ({ children }: Props): ReactElement => {
  return <label>{children}</label>;
};

export default Label;
