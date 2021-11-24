import React, { ReactElement } from 'react';

interface Props {
  info: string;
}

const Loader = ({ info }: Props): ReactElement => (
  <div className='loader'>
    <div className='lds-default'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    <div>
      {info}
    </div>
  </div>
);

export default Loader;
