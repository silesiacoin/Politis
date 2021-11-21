import React, { ReactElement } from 'react';
import Navbar from '../molecules/navbar';

export default function Header(): ReactElement {
  return (
    <header className='header'>
      <h1>Politis</h1>
      <Navbar />
    </header>
  );
}
