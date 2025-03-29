import React from 'react';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
} from '@headlessui/react';
//import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './navigationBar.css';

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
  { name: 'Connect Wallet', href: '/connect-wallet' },
  // { name: 'Profile', href: '/profile' },
];

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}


const NavigationBar: React.FC = () => {
const navigate = useNavigate();

const handleClick = (ref: string) => {
  navigate(ref);
};
return (
    <nav className="navbar navbar-light" style={{ backgroundColor: 'rgb(0 0 0 / 36%)' }}>
      <a className="navbar-brand px-4 fw-bold fs-2 text-uppercase" href="/">
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
        <Link to="/profile">
          <img 
            className="rounded-circle w-25" 
            alt="avatar1" 
            src="https://mdbcdn.b-cdn.net/img/new/avatars/9.webp" 
          />
        </Link>
      </div>

    </nav>
    // <Disclosure as="nav" className="bg-[rgba(31,41,55,0.5)] backdrop-blur-md">
    //   <div className="mx-auto max-w-7xl px-2 sm:px-6">
    //     <div className="relative flex h-16 items-center justify-between">
    //       <div className="flex shrink-0 items-center">
    //         <h1 className="text-3xl font-bold text-white">NFT-marketplace</h1>
    //       </div>

    //       <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
    //         <ul className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start space-x-4">
    //           {navigation.map((item) => {
    //             const isActive = location.pathname === item.href;
    //             return (
    //               <li key={item.name}>
    //                 <Link
    //                   to={item.href}
    //                   className={classNames(
    //                     isActive
    //                       ? 'bg-gray-900 text-white'
    //                       : 'text-gray-300 hover:bg-gray-700 hover:text-white',
    //                     'rounded-md px-3 py-2 text-sm font-medium'
    //                   )}
    //                 >
    //                   {item.name}
    //                 </Link>
    //               </li>
    //             );
    //           })}
    //         </ul>
    //       </div>

    //       <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
    //         {/* Profile dropdown placeholder with avatar */}
    //         <Menu as="div" className="relative ml-3">
    //           <Link to="/profile">
    //             <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
    //               <span className="absolute -inset-1.5" />
    //               <span className="sr-only">Open user menu</span>
    //               <img
    //                 alt="User avatar"
    //                 src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    //                 className="size-8 rounded-full"
    //               />
    //             </MenuButton>
    //           </Link>
    //         </Menu>
    //       </div>
    //     </div>
    //   </div>

    //   <DisclosurePanel className="sm:hidden">
    //     <div className="space-y-1 px-2 pt-2 pb-3">
    //       {navigation.map((item) => {
    //         const isActive = location.pathname === item.href;
    //         return (
    //           <DisclosureButton
    //             key={item.name}
    //             as={Link}
    //             to={item.href}
    //             className={classNames(
    //               isActive
    //                 ? 'bg-gray-900 text-white'
    //                 : 'text-gray-300 hover:bg-gray-700 hover:text-white',
    //               'block rounded-md px-3 py-2 text-base font-medium'
    //             )}
    //           >
    //             {item.name}
    //           </DisclosureButton>
    //         );
    //       })}
    //     </div>
    //   </DisclosurePanel>
    // </Disclosure>
  );
};

export default NavigationBar;
