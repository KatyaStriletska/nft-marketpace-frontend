import React, { useState, useEffect } from 'react';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
} from '@headlessui/react';
//import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import LogIn from './LogIn';
import './navigationBar.css';
import { AuthClient } from '@dfinity/auth-client';
import { Principal } from '@dfinity/principal';

// Define the navigation type
interface NavItem {
  name: string;
  href: string;
}

const navigation: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'All NFTs', href: '/nfts' },
  { name: 'Mint NFT', href: '/mint' },
  { name: 'Sell NFT', href: '/sell' },
  // { name: 'Profile', href: '/profile' },
];

const NavigationBar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userPrincipal, setUserPrincipal] = useState<Principal | null>(null);
  
  useEffect(() => {
    const storedPrincipal = localStorage.getItem("userPrincipal");
    console.log("Stored Principal:", storedPrincipal);
    if (storedPrincipal) {
      setIsLoggedIn(true);
    }
  }
  , []);

      useEffect(() => {
        checkLoginStatus();
      }, []);
    
      const checkLoginStatus = async () => {
        const authClient = await AuthClient.create();
        if (await authClient.isAuthenticated()) {
          const identity = authClient.getIdentity();
          const principal = identity.getPrincipal().toString();
          localStorage.setItem("userPrincipal", principal);
    
          setUserPrincipal(identity.getPrincipal());
        }
      };
  const navigate = useNavigate();
  const handleClick = (ref: string) => {
    navigate(ref);
};
return (
    <nav className="navbar navbar-light" style={{ backgroundColor: 'rgb(0 0 0 / 36%)' }}>
      <a className="navbar-brand px-4 fw-bold fs-2 text-uppercase" href="/" style={{ color: 'white' }}>
        NFT-Marketplace
      </a>

      <div className="d-flex justify-content-center flex-grow-1">
        {navigation.map((item) => (
          <button
            key={item.name}
            onClick={() => handleClick(item.href)}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="ms-auto">
        {userPrincipal ? 
        <Link to="/profile">
          <img 
            className="rounded-circle w-25" 
            alt="avatar1" 
            src="https://mdbcdn.b-cdn.net/img/new/avatars/9.webp" 
          />
        </Link>
        : <LogIn/>
        }
      </div>

    </nav>
   
  );
};

export default NavigationBar;

