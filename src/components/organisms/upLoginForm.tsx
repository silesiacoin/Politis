import React, { useState, useContext, FormEvent, ReactElement } from 'react';
import { Context } from '../../Context';
import Label from '../atoms/label';
import InputString from '../atoms/inputString';
import fetchUniversalProfile from '../../utils/fetchUniversalProfile';
import Submit from '../atoms/submit';

const UpLoginForm = (): ReactElement => {
  const local = localStorage.getItem('UP');
  const [upAddress, setUpAddress] = useState<string>(local ? local : '');
  const [isValidAddress, setIsValidAddress] = useState(true);

  const { publicAddress, setUniversalProfileJSON, setUniversalProfileAddress } = useContext(Context);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const fetchUPResponse = await fetchUniversalProfile(upAddress, publicAddress);
    if (fetchUPResponse instanceof Error) {
      setIsValidAddress(false);
    } else {
      setIsValidAddress(true);
      setUniversalProfileAddress(upAddress);
      setUniversalProfileJSON(fetchUPResponse);
    }
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      <Label>
        <p>
          Your UP address must match your address (creator) in MetaMask.
        </p>
        Universal Profile address:
        <InputString
          value={upAddress}
          onChange={(event) => setUpAddress((event.target as HTMLTextAreaElement).value)}
          required
        />
      </Label>
      {!isValidAddress && <p>Provided invalid address</p>}
      {upAddress ? (
        <Submit value='Connect your Universal Profile' />
      ) : (
        <Submit value='Connect your Universal Profile' disabled />
      )}
    </form>
  );
};

export default UpLoginForm;
