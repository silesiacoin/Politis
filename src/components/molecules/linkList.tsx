import { LSP3ProfileLink } from '@lukso/lsp-factory.js';
import React, { ReactElement } from 'react';
import Button from '../atoms/button';

const LinkList = ({
  links,
  handleRemoveLink,
}: {
  links: LSP3ProfileLink[];
  handleRemoveLink: (title: string) => void;
}): ReactElement => (
  <ul className='links'>
    {links.map((link, index) => (
      <li className='links__item' key={`link-${index}`}>
        <a href={link.url}>{link.title}</a>
        <Button classes='button--small' onClick={() => handleRemoveLink(link.title)}>
          X
        </Button>
      </li>
    ))}
  </ul>
);

export default LinkList;
