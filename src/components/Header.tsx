import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/userSlice';
import { auth, provider } from '@/firebase';
import Logo from '@/components/Logo';
import HeaderLink from '@/components/HeaderLink';

const Header: React.FC = () => {
  const user = useSelector(selectUser);
  const signInGoogle = async () => {
    await auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-3">
        <Logo />
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          {user.uid ? (
            <ul className="flex">
              <HeaderLink type="link" linkName="投稿" href="/notes/new" />
              <HeaderLink
                type="link"
                linkName="Logout"
                href="/"
                onClickEvent={() => {
                  auth.signOut();
                }}
              />
            </ul>
          ) : (
            <ul className="flex">
              <HeaderLink
                type="clickEvent"
                linkName="Sign in with Google"
                onClickEvent={() => signInGoogle()}
              />
            </ul>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
