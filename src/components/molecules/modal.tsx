import React, { ReactElement, ReactNode } from 'react';

interface Props {
  isOn: boolean;
  children: ReactNode;
}

export default function Modal(Props: Props): ReactElement {
  return (
    <div className={`modal ${Props.isOn && 'modal--on'}`}>
      <div className='modal__panel'>
        {Props.children}
      </div>
    </div>
  );
}
