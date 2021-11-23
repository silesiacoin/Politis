import React, { ReactElement, useContext } from 'react';
import { Context } from '../../Context';

export default function PanelUp(): ReactElement {
  const { universalProfileJSON } = useContext(Context);
  return (
    <div className='panelUP'>
      {universalProfileJSON &&
        <div className='panelUP__background'
          style={universalProfileJSON?.backgroundImage ? { backgroundImage: 'url("' + universalProfileJSON?.backgroundImage[0].url + '")' } : {}}>
          {universalProfileJSON?.profileImage &&
            <div className='avatar'>
              <div className='avatar__image'
                style={{ backgroundImage: 'url("' + universalProfileJSON?.profileImage[0].url + '")' }}>
              </div>
            </div>
          }
          <h1 className='panelUP__background__description'>{universalProfileJSON.name}</h1>
          <h5 className='panelUP__background__description'>{universalProfileJSON?.description}</h5>
        </div>
      }
    </div>
  );
}
