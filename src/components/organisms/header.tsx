import React, { ReactElement } from 'react';
import CurrUserData from '../molecules/currUserData';
import Navbar from '../molecules/navbar';

export default function Header(): ReactElement {
  return (
    <header className='header'>
      <CurrUserData />
      <Navbar />
    </header>
  );
}
