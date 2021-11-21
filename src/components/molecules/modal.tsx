import React, { ReactElement, ReactNode } from 'react';
import { Tile } from '../../functions/createTiles';
import Button from '../atoms/button';

interface Props {
  selected: Tile | null;
  isOn: boolean;
  onFunction: (value: boolean) => void;
  children: ReactNode;
  clickYes: (value: boolean) => void;
}

export default function Modal(Props: Props): ReactElement {
  return (
    <div className={`modal ${Props.isOn && 'modal--on'}`}>
      <div className='modal__panel'>
        {Props.children}
        <div className='modal__panel__buttons'>
          <Button
            onClick={() => {
              Props.onFunction(false);
              Props.clickYes(true);
            }}>
            Yes
          </Button>
          <Button classes='modal__panel__buttons__button-right' onClick={() => Props.onFunction(false)}>
            No
          </Button>
        </div>
      </div>
    </div>
  );
}
