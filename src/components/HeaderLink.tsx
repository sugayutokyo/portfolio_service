import React, { MouseEventHandler } from 'react';
import Link from 'next/link';

type Props = {
  type: string;
  linkName: string;
  onClickEvent?: MouseEventHandler<HTMLElement>;
  href?: string;
};

const HeaderLink: React.FC<Props> = ({ type, linkName, onClickEvent, href }) => {
  let result;
  const linkStyle = 'text-white hover:text-red-200';
  switch (type) {
    case 'clickEvent':
      result = (
        <li className="mr-6" onClick={onClickEvent}>
          <div className={linkStyle}>{linkName}</div>
        </li>
      );
      break;
    case 'link':
      result = (
        <li className="mr-6">
          <Link href={href}>
            <div className={linkStyle} onClick={onClickEvent}>
              {linkName}
            </div>
          </Link>
        </li>
      );
      break;
    default:
      break;
  }

  return result;
};

export default HeaderLink;
