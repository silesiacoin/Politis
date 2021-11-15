import { LSP3ProfileLink } from '@lukso/lsp-factory.js';
import React, { ReactElement } from 'react';

const LinkList = ({ links }: { links: LSP3ProfileLink[] }): ReactElement => {
  return (
    <ul>
      {links.map((link) => (
        <li key={link.title}>
          <a href={link.url}>{link.title}</a>
        </li>
      ))}
    </ul>
  );
};

export default LinkList;
