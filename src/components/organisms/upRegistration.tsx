import React, { Fragment, ReactElement, useContext } from 'react';
import { DEPLOYING } from '../../constants/status';
import { Context } from '../../Context';
import UpRegistrationForm from './upRegistrationForm';

const UpRegistration = (): ReactElement => {
  const { universalProfileAddress } = useContext(Context);

  return (
    <Fragment>
      {universalProfileAddress === DEPLOYING ? (
        <p>Your universal profile is currently being deployed</p>
      ) : !universalProfileAddress ? (
        <UpRegistrationForm />
      ) : (
        <p>
          Your deployed universal profile address: {universalProfileAddress}
        </p>
      )}
    </Fragment>
  );
};

export default UpRegistration;
