import Link from 'next/link';
import { useRouter } from 'next/navigation';  // Usando useAppRouter
import { useEffect, useState } from 'react';
import { BiHome, BiHelpCircle, BiSearch } from 'react-icons/bi';
import ThemeSwitch from './ThemeSwitch';
import { FcAbout, FcHome, FcInfo, FcSearch } from 'react-icons/fc';

const Navbar = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ul className="hidden sm:flex items-center space-x-4 leading-5 sm:space-x-6">
      <li className="nav-item">
        <Link href="/">
          <div className="relative flex items-center py-2 pr-2 transition-all duration-300 transform-gpu hover:shadow-md hover:border-b-2 border-primary-500">
            <FcHome className="mr-2" />
            <span className="text-base leading-6 font-medium text-secondary-500">
              Início
            </span>
          </div>
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/pesquisar">
          <div className="relative flex items-center py-2 pr-2 transition-all duration-300 transform-gpu hover:shadow-md hover:border-b-2 border-primary-500">
            <FcSearch className="mr-2" />
            <span className="text-base leading-6 font-medium text-secondary-500">
              Pesquisar
            </span>
          </div>
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/sobre">
          <div className="relative flex items-center py-2 pr-2 transition-all duration-300 transform-gpu hover:shadow-md hover:border-b-2 border-primary-500">
            <FcInfo className="mr-2" />
            <span className="text-base leading-6 font-medium text-secondary-500">
              Sobre
            </span>
          </div>
        </Link>
      </li>
    </ul>
  );
  
  
};

export default Navbar;
