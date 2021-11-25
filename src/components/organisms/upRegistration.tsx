import React, { Fragment, Dispatch, ReactElement, SetStateAction, useContext } from 'react';
import { DEPLOYING } from '../../constants/status';
import { Context } from '../../Context';
import Button from '../atoms/button';
import Loader from '../atoms/loader';
import UpRegistrationForm from './upRegistrationForm';

interface Props {
  setShouldRenderRegistration: Dispatch<SetStateAction<boolean>>;
}

const UpRegistration = ({ setShouldRenderRegistration }: Props): ReactElement => {
  const { universalProfileAddress } = useContext(Context);

  return (
    <Fragment>
      {universalProfileAddress === DEPLOYING ? (
        <>
          <div>
            <Loader info={'Creating account'} />
            <p>Your universal profile is currently being deployed. This may take a while. Wait until the process is over.</p>
            <p>The process requires (8) approvals in metamask.</p>
            <p>When the UP is created you will receive your address.</p>
          </div>
          <Button classes='button--margin' onClick={() => setShouldRenderRegistration(false)}>Cancel the creation process</Button>
        </>
      ) : !universalProfileAddress ? (
        <>
          <UpRegistrationForm />
          <Button classes='button--margin' onClick={() => setShouldRenderRegistration(false)}>Cancel</Button>
        </>
      ) : (
        <>
          <p>Your deployed universal profile address: {universalProfileAddress}</p>
          <Button classes='button--margin' onClick={() => setShouldRenderRegistration(false)}>Next</Button>
        </>
      )}
    </Fragment>
  );
};

export default UpRegistration;
