import React, { ReactElement, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Container({
  children,
  className,
}: Props): ReactElement {
  return <div className={className}>{children}</div>;
}
