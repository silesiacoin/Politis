import React, { Fragment, Dispatch, ReactElement, SetStateAction } from 'react';
import Button from '../atoms/button';
import UpLoginForm from './upLoginForm';

interface Props {
  setShouldRenderRegistration: Dispatch<SetStateAction<boolean>>;
}

const upLogin = ({ setShouldRenderRegistration }: Props): ReactElement => {
  return (
    <Fragment>
      <h2>Connect your Universal Profile</h2>
      <UpLoginForm />
      <Button classes='button--margin' onClick={() => setShouldRenderRegistration(true)}>
        I don&lsquo;t have a Universal Profile
      </Button>
    </Fragment>
  );
};

export default upLogin;
