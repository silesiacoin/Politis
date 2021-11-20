import React, { ReactElement } from 'react';
import { Tile } from '../../functions/createTiles';
import Button from '../atoms/button';

interface Props {
  selected: Tile | null;
  isOn: boolean;
  onFunction: (value: boolean) => void;
}

export default function Modal(props: Props): ReactElement {
  return (
    <div className={'background-for-modal'} style={{
      display: props.isOn ? 'block' : 'none'
    }}>
      <div className={'modal'}>
        <div className={'modal__header'}>
          <div className={'modal__header__title'}>
            Do you want to buy a tile?
          </div>
        </div>
        <div className={'modal__body'}>
          <div className={'modal__body__info'}>
            id: {props.selected?.id}
            <br />
            owner: {props.selected?.owner}
            <br />
            price: {props.selected?.price}
            <br />
            polygon: {props.selected?.polygon[0][0]} {props.selected?.polygon[1][0]} {props.selected?.polygon[0][1]} {props.selected?.polygon[1][1]}
          </div>
        </div>
        <div className={'modal__buttons'}>
          <Button onClick={(): void => {
            props.onFunction(false);
          }}>
            Yes
          </Button>
          <Button classes={'modal-button--right'} onClick={(): void => props.onFunction(false)}>
            No
          </Button>
        </div>
      </div>
    </div>
  );
}
