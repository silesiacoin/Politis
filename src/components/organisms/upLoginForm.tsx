import React, { useState, useContext, FormEvent, ReactElement } from 'react';
import { Context } from '../../Context';
import Label from '../atoms/label';
import InputString from '../atoms/inputString';
import fetchUniversalProfile from '../../functions/fetchUniversalProfile';
import Submit from '../atoms/submit';

const UpLoginForm = (): ReactElement => {
  const [upAddress, setUpAddress] = useState('');
  const [isValidAddress, setIsValidAddress] = useState(true);

  const { publicAddress, setUniversalProfileJSON } = useContext(Context);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const fetchUPResponse = await fetchUniversalProfile(upAddress, publicAddress);
    if (fetchUPResponse instanceof Error) {
      setIsValidAddress(false);
    } else {
      setIsValidAddress(true);
      setUniversalProfileJSON(fetchUPResponse);
    }
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      <Label>
        Universal Profile address:
        <InputString
          value={upAddress}
          onChange={(event) => setUpAddress((event.target as HTMLTextAreaElement).value)}
          required
        />
      </Label>
      {!isValidAddress && <p>Provided invalid address</p>}
      {upAddress ? (
        <Submit value='Log into your Universal Profile' />
      ) : (
        <Submit value='Log into your Universal Profile' disabled />
      )}
    </form>
  );
};

export default UpLoginForm;
