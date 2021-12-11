import React from 'react';
import { auth } from '@/firebase';
import Link from 'next/link';

const UserMenu = () => {
  return (
    <>
      <ul className="flex">
        <li className="mr-6">
          <Link href="/notes/new">
            <div className="text-white hover:text-red-200">投稿</div>
          </Link>
        </li>
        <li
          className="mr-6"
          onClick={() => {
            auth.signOut();
          }}
        >
          <div className="text-white hover:text-red-200">Logout</div>
        </li>
      </ul>
    </>
  );
};

export default UserMenu;
