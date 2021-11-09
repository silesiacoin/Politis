import React, { ReactElement } from 'react';

type Props = {
  children: string;
  classes: string;
};

export default function UserNameDiv({
  children,
  classes,
}: Props): ReactElement {
  return <div className={classes}>{children}</div>;
}
