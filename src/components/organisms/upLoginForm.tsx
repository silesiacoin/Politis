import React, { useState, useContext, FormEvent, ReactElement } from 'react';
import { Context } from '../../App';
import Label from '../atoms/label';
import InputString from '../atoms/inputString';
import fetchUPData from '../../functions/erc725';
import Submit from '../atoms/submit';

const UpLoginForm = (): ReactElement => {
  const [upAddress, setUpAddress] = useState('');
  const [isValidAddress, setIsValidAddress] = useState(true);
  const { setUniversalProfile } = useContext(Context);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fetchUPResponse = await fetchUPData(upAddress);
    if (fetchUPResponse instanceof Error) {
      setIsValidAddress(false);
    } else {
      setIsValidAddress(true);
      setUniversalProfile(fetchUPResponse);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Label>
        Universal Profile address:
        <InputString
          value={upAddress}
          onChange={(event) =>
            setUpAddress((event.target as HTMLTextAreaElement).value)
          }
          required
        />
      </Label>
      {!isValidAddress && <p>Provided invalid address</p>}
      <Submit value='Log into your Universal Profile' />
    </form>
  );
};

export default UpLoginForm;
