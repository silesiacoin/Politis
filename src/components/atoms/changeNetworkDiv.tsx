import React, { ReactElement } from 'react';

const ChangeNetworkDiv = (): ReactElement => {
  return (
    <div>
      You need to change your current network to{' '}
      <a href='https://docs.lukso.tech/networks/l14-testnet/'>lukso testnet</a>{' '}
      and refresh the page
    </div>
  );
};

export default ChangeNetworkDiv;
