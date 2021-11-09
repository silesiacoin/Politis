import React, { ReactElement } from 'react';
import LogoIcon from '../atoms/logoIcon';
import UserNameDiv from '../atoms/userNameDiv';

type Props = {
  publicAddress: string | null;
};

export default function CurrUserData({ publicAddress }: Props): ReactElement {
  return (
    <div className='header__user'>
      {!publicAddress ? (
        <UserNameDiv classes='user__name'>
          You must connect to your wallet
        </UserNameDiv>
      ) : (
        <UserNameDiv classes='user__name'>{publicAddress}</UserNameDiv>
      )}
    </div>
  );
}
