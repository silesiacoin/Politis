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
    <div className={'background-for-modal ' + (Props.isOn === true ? 'background-for-modal--on' : 'background-for-modal--off')}>
      <div className='modal'>
        {Props.children}
        <div className='modal__buttons'>
          <Button onClick={() => {
            Props.onFunction(false);
            Props.clickYes(true);
          }}>
            Yes
          </Button>
          <Button classes='modal-button--right' onClick={() => Props.onFunction(false)}>
            No
          </Button>
        </div>
      </div>
    </div>
  );
}
