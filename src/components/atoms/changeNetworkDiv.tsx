import React, { ReactElement } from 'react';

const ChangeNetworkDiv = (): ReactElement => {
  return (
    <div className='float-left'>
      You need to change your current network to{' '}
      <a href='https://docs.lukso.tech/networks/l14-testnet/' target='_blank' rel='noreferrer'>lukso testnet</a>{' '}
      and refresh the page (Ctrl+Shift+R).
    </div>
  );
};

export default ChangeNetworkDiv;
