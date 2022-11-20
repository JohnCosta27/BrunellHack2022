import { GiHamburgerMenu } from 'react-icons/gi';
import { slide as Menu } from 'react-burger-menu';
import Button from './desktopButtons';
import './hamburger.css';

const links = [
  {
    text: 'Home',
    url: '/',
  },
  {
    text: 'About',
    url: '/about',
  },
  {
    text: 'Contact',
    url: '/contact',
  },
];

const Header = () => (
  <header className="h-fit pt-5 pb-5 bg-gradient-to-r from-primary-400 to-primary-600 top-0 w-full text-4xl justify-right flex text-white z-10 align-middle overflow-x-hidden">
    <div className="flex justify-center text-3xl md:text-4xl items-center flex-1">
      DeadDropr
    </div>
  </header>
);

export default Header;
