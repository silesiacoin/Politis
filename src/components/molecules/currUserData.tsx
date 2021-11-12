import React, { useContext, ReactElement } from 'react';
import { Context } from '../../App';
import UserNameDiv from '../atoms/userNameDiv';

export default function CurrUserData(): ReactElement {
  const { isMetamaskInstalled, publicAddress } = useContext(Context);

  return (
    <div className='header__user'>
      {isMetamaskInstalled ? (
        publicAddress ? (
          <UserNameDiv classes='user__name'>{publicAddress}</UserNameDiv>
        ) : (
          <UserNameDiv classes='user__name'>
            You must connect to your wallet
          </UserNameDiv>
        )
      ) : (
        <UserNameDiv classes='user__name'>
          Install metamask extension
        </UserNameDiv>
      )}
    </div>
  );
}
