import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import Button from '../atoms/button';
import Container from '../atoms/container';
import UpLoginForm from './upLoginForm';

interface Props {
  setShouldRenderRegistration: Dispatch<SetStateAction<boolean>>;
}

const upLogin = ({ setShouldRenderRegistration }: Props): ReactElement => {
  return (
    <Container>
      <h4>Log into your universal profile</h4>
      <UpLoginForm />
      <Button onClick={() => setShouldRenderRegistration(true)}>
        I don&lsquo;t have a universal profile
      </Button>
    </Container>
  );
};

export default upLogin;
