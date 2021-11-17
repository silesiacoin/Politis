import React, { ReactElement, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Label = ({ children }: Props): ReactElement => <label>{children}</label>;

export default Label;
