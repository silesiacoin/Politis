import React, {
  useState,
  ReactElement,
  FormEvent,
  useRef,
  useContext,
} from 'react';
import { LSP3ProfileImage, LSP3ProfileLink } from '@lukso/lsp-factory.js';
import { Context } from '../../App';
import { deployUP } from '../../functions/lspFactory';
import InputString from '../atoms/inputString';
import Label from '../atoms/label';
import Submit from '../atoms/submit';
import Button from '../atoms/button';
import LinkList from '../molecules/linkList';

export default function UpForm(): ReactElement {
  const { publicAddress } = useContext(Context);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [profileImage, setProfileImage] = useState<
    File | LSP3ProfileImage[] | undefined
  >(undefined);
  const [backgroundImage, setBackgroundImage] = useState<
    File | LSP3ProfileImage[] | undefined
  >(undefined);
  const [tags, setTags] = useState<string[]>([]);
  const [linkTitle, setLinkTitle] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [links, setLinks] = useState<LSP3ProfileLink[]>([]);

  const profileImageRef = useRef<HTMLInputElement>(null);
  const backgroundImageRef = useRef<HTMLInputElement>(null);

  const handleAddLink = () => {
    setLinks([...links, { title: linkTitle, url: linkUrl }]);
    setLinkTitle('');
    setLinkUrl('');
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      profileImageRef.current !== null &&
      profileImageRef.current.files !== null
    )
      setProfileImage(profileImageRef.current.files[0]);

    if (
      backgroundImageRef.current !== null &&
      backgroundImageRef.current.files !== null
    )
      setBackgroundImage(backgroundImageRef.current.files[0]);

    const profileData = {
      name,
      description,
      profileImage,
      backgroundImage,
      tags,
      links: [{ title: 'My Website', url: 'www.my-website.com' }],
    };

    if (publicAddress) deployUP(publicAddress, profileData);
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      <h4>Profile data:</h4>
      <Label>
        Name:
        <InputString
          value={name}
          onChange={(event) =>
            setName((event.target as HTMLTextAreaElement).value)
          }
        />
      </Label>
      <Label>
        Description:
        <InputString
          value={description}
          onChange={(event) =>
            setDescription((event.target as HTMLTextAreaElement).value)
          }
        />
      </Label>
      <Label>
        Profile picture:
        <input type='file' ref={profileImageRef} />
      </Label>
      <Label>
        Backround picture:
        <input type='file' ref={backgroundImageRef} />
      </Label>
      <Label>
        Tags:
        <InputString
          value={tags.join(', ')}
          onChange={(event) =>
            setTags((event.target as HTMLTextAreaElement).value.split(', '))
          }
        />
      </Label>
      <h4>Profile links:</h4>
      <Label>
        Link title:
        <InputString
          value={linkTitle}
          onChange={(event) =>
            setLinkTitle((event.target as HTMLTextAreaElement).value)
          }
        />
      </Label>
      <Label>
        Link url:
        <InputString
          value={linkUrl}
          onChange={(event) =>
            setLinkUrl((event.target as HTMLTextAreaElement).value)
          }
        />
      </Label>
      <Button onClick={handleAddLink}>Add to list</Button>
      <h4>Links:</h4>
      <LinkList links={links} />
      <Submit value='Create profile' />
    </form>
  );
}
