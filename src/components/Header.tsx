import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/userSlice';
import UserMenu from '@/components/UserMenu';
import AuthModal from '@/components/AuthModal';
import Logo from '@/components/Logo';

const Header: React.FC = () => {
  const user = useSelector(selectUser);
  const [isAuthScreen, setIsAuthScreen] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-3">
        <Logo />
        {/* ハンバーガメニュー */}
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          {user.uid ? (
            <UserMenu />
          ) : (
            <ul className="flex">
              <li className="mr-6">
                <a className="text-white hover:text-red-200" onClick={() => setIsAuthScreen(true)}>
                  Login
                </a>
              </li>
            </ul>
          )}
        </div>
      </nav>
      <AuthModal
        isOpen={isAuthScreen}
        setOpenModal={(isOpen: boolean) => setIsAuthScreen(isOpen)}
      />
    </>
  );
};

export default Header;
