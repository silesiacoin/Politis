import React, { ReactElement, useState, useEffect } from 'react';

const ProgressBar = ({ currentLength }: { currentLength: number }): ReactElement => {
  const [width, setWidth] = useState('');
  const eventsArrayLength = 14;
  useEffect(() => {
    setWidth(`${(currentLength / eventsArrayLength) * 100}%`);
  }, [currentLength]);
  return (
    <div className='progress'>
      <div className='progress__value' style={{ width: width }} />
    </div>
  );
};

export default ProgressBar;
