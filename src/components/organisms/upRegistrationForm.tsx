import React, {
  useState,
  ReactElement,
  FormEvent,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { DeploymentEvent, LSP3ProfileImage, LSP3ProfileLink } from '@lukso/lsp-factory.js';
import { getSigner } from '../../helpers/getSigner';
import LinkList from '../molecules/linkList';
import InputString from '../atoms/inputString';
import Label from '../atoms/label';
import Submit from '../atoms/submit';
import Button from '../atoms/button';
import { Context } from '../../Context';
import { deployUniversalProfile } from '../../utils/deployUniversalProfile';

interface Props {
  setEventCount: Dispatch<SetStateAction<number>>;
  setLatestEvent: Dispatch<SetStateAction<DeploymentEvent | null>>;
  setComplete: Dispatch<SetStateAction<boolean>>;
}

export default function UpRegistrationForm({ setEventCount, setLatestEvent, setComplete }: Props): ReactElement {
  const { publicAddress } = useContext(Context);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [linkTitle, setLinkTitle] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [links, setLinks] = useState<LSP3ProfileLink[]>([]);
  const [profileImageUrl, setProfilePicture] = useState('');
  const [backgroundImageUrl, setBackroundPicture] = useState('');
  const tags = ['Public profile'];

  const handleAddLink = () => {
    setLinks([...links, { title: linkTitle, url: linkUrl }]);
    setLinkTitle('');
    setLinkUrl('');
  };

  const handleRemoveLink = (title: string) => setLinks(links.filter((item) => item.title !== title));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const profileImage: LSP3ProfileImage[] = [
      {
        width: 200,
        height: 200,
        hashFunction: '',
        hash: '',
        url: profileImageUrl,
      },
    ];
    const backgroundImage: LSP3ProfileImage[] = [
      {
        width: 1344,
        height: 250,
        hashFunction: '',
        hash: '',
        url: backgroundImageUrl,
      },
    ];

    const profileData: UniversalProfile = {
      name,
      description,
      profileImage,
      backgroundImage,
      tags,
      links,
    };

    const signer = await getSigner();
    if (publicAddress && signer) {
      deployUniversalProfile(publicAddress, signer, profileData, setEventCount, setLatestEvent, setComplete);
    } else {
      console.error('Error: Metamask not connected');
    }
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      <h4>Profile data:</h4>
      <Label>
        Name:*
        <InputString value={name} onChange={(event) => setName((event.target as HTMLTextAreaElement).value)} required />
      </Label>
      <Label>
        Description:*
        <InputString
          value={description}
          onChange={(event) => setDescription((event.target as HTMLTextAreaElement).value)}
          required
        />
      </Label>
      <Label>
        Profile picture url:
        <InputString
          value={profileImageUrl}
          onChange={(event) => setProfilePicture((event.target as HTMLTextAreaElement).value)}
        />
      </Label>
      <Label>
        Backround picture url:
        <InputString
          value={backgroundImageUrl}
          onChange={(event) => setBackroundPicture((event.target as HTMLTextAreaElement).value)}
        />
      </Label>
      <h4>Profile links:</h4>
      <Label>
        Link title:
        <InputString value={linkTitle} onChange={(event) => setLinkTitle((event.target as HTMLTextAreaElement).value)} />
      </Label>
      <Label>
        Link url:
        <InputString value={linkUrl} onChange={(event) => setLinkUrl((event.target as HTMLTextAreaElement).value)} />
      </Label>
      * required
      <Button classes='button--margin' onClick={handleAddLink}>
        Add to list
      </Button>
      <LinkList links={links} handleRemoveLink={handleRemoveLink} />
      <Submit value='Create profile' />
    </form>
  );
}
