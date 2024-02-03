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
    <ul className="hidden sm:flex flex items-center space-x-4 leading-5 sm:space-x-6">
      <li className="nav-item">
        <Link href="/" passHref>

        <div className="relative flex items-center py-2 pr-2 transition-all duration-300 transform-gpu hover:shadow-md">
        <FcHome className="mr-2" />
          <span className="text-base leading-6 font-medium text-secondary-500">
            Início
          </span>
        </div>
         
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/pesquisar" passHref>
        <div className="relative flex items-center py-2 pr-2 transition-all duration-300 transform-gpu hover:shadow-md">
        <FcSearch className="mr-2" />
          <span className="text-base leading-6 font-medium text-secondary-500">
            Pesquisar
          </span>
        </div>
        
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/sobre" passHref>
          <div className="relative flex items-center py-2 pr-2 transition-all duration-300 transform-gpu hover:shadow-md">
            <FcInfo className="mr-2" />
            <span className="text-base leading-6 font-medium text-secondary-500">
              Sobre
            </span>
          </div>
        </Link>
      </li>
      <li className="nav-item">
      <ThemeSwitch />
      </li>

    </ul>
  );
};

export default Navbar;
