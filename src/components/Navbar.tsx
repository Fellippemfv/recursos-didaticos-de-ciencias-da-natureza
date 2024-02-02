import Link from 'next/link';
import { useRouter } from 'next/navigation';  // Usando useAppRouter
import { useEffect, useState } from 'react';
import { BiHome, BiHelpCircle, BiSearch } from 'react-icons/bi';

const Navbar = () => {
  const router = useRouter();  // Utilizando useAppRouter
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ul className="flex items-center space-x-4 leading-5 sm:space-x-6">
      <li className="nav-item">
        <Link href="/" className="relative flex items-center py-2 pr-1 hover:text-purple-600 hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-purple-600 hover:after:content-[''] hover:after:transition-all hover:after:duration-300 focus:outline-none transition duration-300">
          <BiHome className="mr-2" />
          <span className="text-base leading-6 font-medium text-secondary-500">
            Início
          </span>
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/pesquisar" className="relative flex items-center py-2 pr-2 hover:text-purple-600 hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-purple-600 hover:after:content-[''] hover:after:transition-all hover:after:duration-300 focus:outline-none transition duration-300">
          <BiSearch className="mr-2" />
          <span className="text-base leading-6 font-medium text-secondary-500">
            Pesquisar
          </span>
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/sobre" className="relative flex items-center py-2 pr-2 hover:text-purple-600 hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-purple-600 hover:after:content-[''] hover:after:transition-all hover:after:duration-300 focus:outline-none transition duration-300">
          <BiHelpCircle className="mr-2" />
          <span className="text-base leading-6 font-medium text-secondary-500">
            Sobre
          </span>
        </Link>
      </li>
     
    </ul>
  );
};

export default Navbar;
