import React, { ReactElement } from 'react';
import './scss/main.scss';
import Header from './components/organisms/header';

export default function App(): ReactElement {
  return (
    <React.Fragment>
      <Header />
    </React.Fragment>
  );
}
