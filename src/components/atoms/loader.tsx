import React, { ReactElement } from 'react';

interface Props {
  info: string;
  classes?: string;
}

const Loader = ({ info, classes }: Props): ReactElement => (
  <div className={'loader ' + (classes ? classes : '')}>
    <div className='lds-default'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    <div>
      {info}
    </div>
  </div>
);

export default Loader;
