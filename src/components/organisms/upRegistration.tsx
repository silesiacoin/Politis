import React, { Fragment, Dispatch, ReactElement, SetStateAction, useContext } from 'react';
import { DEPLOYING } from '../../constants/status';
import { Context } from '../../Context';
import Button from '../atoms/button';
import UpRegistrationForm from './upRegistrationForm';

interface Props {
  setShouldRenderRegistration: Dispatch<SetStateAction<boolean>>;
}

const UpRegistration = ({ setShouldRenderRegistration }: Props): ReactElement => {
  const { universalProfileAddress } = useContext(Context);

  return (
    <Fragment>
      {universalProfileAddress === DEPLOYING ? (
        <p>Your universal profile is currently being deployed</p>
      ) : !universalProfileAddress ? (
        <UpRegistrationForm />
      ) : (
        <p>Your deployed universal profile address: {universalProfileAddress}</p>
      )}
      <Button onClick={() => setShouldRenderRegistration(false)}>Go back</Button>
    </Fragment>
  );
};

export default UpRegistration;
