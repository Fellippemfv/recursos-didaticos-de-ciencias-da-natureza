import Link from 'next/link';
import { useRouter } from 'next/navigation';  // Usando useAppRouter
import { useEffect, useState } from 'react';
import { BiHome, BiHelpCircle, BiSearch } from 'react-icons/bi';
import ThemeSwitch from './ThemeSwitch';

const Navbar = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ul className="hidden sm:flex flex items-center space-x-4 leading-5 sm:space-x-6">
      <li className="nav-item">
        <Link href="/" className="relative flex items-center py-2 pr-1">
          <BiHome className="mr-2" />
          <span className="text-base leading-6 font-medium text-secondary-500">
            Início
          </span>
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/pesquisar" className="relative flex items-center py-2 pr-2">
          <BiSearch className="mr-2" />
          <span className="text-base leading-6 font-medium text-secondary-500">
            Pesquisar
          </span>
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/sobre" className="relative flex items-center py-2 pr-2">
          <BiHelpCircle className="mr-2" />
          <span className="text-base leading-6 font-medium text-secondary-500">
            Sobre
          </span>
        </Link>
      </li>
      <li className="nav-item">
      <ThemeSwitch />
      </li>

    </ul>
  );
};

export default Navbar;
