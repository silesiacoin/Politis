import React, { Fragment, Dispatch, ReactElement, SetStateAction, useContext, useState, useEffect } from 'react';
import { DeploymentEventBase, DeploymentEvent } from '@lukso/lsp-factory.js';
import { Context } from '../../Context';
import UpRegistrationForm from './upRegistrationForm';
import Button from '../atoms/button';
import ProgressBar from '../atoms/progressBar';
import Container from '../atoms/container';
import Loader from '../atoms/loader';

interface Props {
  setShouldRenderRegistration: Dispatch<SetStateAction<boolean>>;
}
interface DeploymentEventWithFunctionName extends DeploymentEventBase {
  functionName: string;
}

const UpRegistration = ({ setShouldRenderRegistration }: Props): ReactElement => {
  const { universalProfileAddress, setUniversalProfileAddress } = useContext(Context);

  const [eventCount, setEventCount] = useState(0);
  const [latestEvent, setLatestEvent] = useState<DeploymentEvent | null>(null);
  const [deploymentStatus, setDeploymentStatus] = useState('');
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const latestEventWithFunctionName = latestEvent as DeploymentEventWithFunctionName;
    const functionName = latestEventWithFunctionName?.functionName;
    const contractName = latestEventWithFunctionName?.contractName;
    setDeploymentStatus(
      eventCount !== 0
        ? functionName === 'setData'
          ? `setting the data of the ${contractName}`
          : functionName === 'transferOwnership'
            ? `transferring the ownership of the ${contractName}`
            : `initializing the ${contractName}`
        : ''
    );
    if (complete && latestEvent && latestEvent.receipt) {
      const address = latestEvent?.receipt.to;
      setUniversalProfileAddress(address);
      localStorage.setItem('UP', address);
    }
  }, [complete, eventCount, latestEvent, setUniversalProfileAddress]);

  const handleCancel = () => {
    setShouldRenderRegistration(false);
    setComplete(false);
    setEventCount(0);
  };

  return (
    <Fragment>
      {complete ? (
        <>
          <p>Your deployed universal profile address: {universalProfileAddress}</p>
          <Button classes='button--margin' onClick={handleCancel}>
            Next
          </Button>
        </>
      ) : eventCount ? (
        <>
          <Container>
            <Loader info={''} />
            <p>Your universal profile is currently being deployed. This may take a while. Wait until the process is over.</p>
            <p>Currently we are {deploymentStatus}</p>
            <ProgressBar currentLength={eventCount} />
          </Container>
          <Button classes='button--margin' onClick={handleCancel}>
            Cancel the creation process
          </Button>
        </>
      ) : (
        <>
          <UpRegistrationForm setEventCount={setEventCount} setLatestEvent={setLatestEvent} setComplete={setComplete} />
          <Button classes='button--margin' onClick={handleCancel}>
            Cancel
          </Button>
        </>
      )}
    </Fragment>
  );
};

export default UpRegistration;
