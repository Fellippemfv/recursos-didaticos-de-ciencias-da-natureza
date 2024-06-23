import React, { useState, ReactNode } from 'react';
import Link from 'next/link';
import { FcHome, FcSearch, FcInfo, FcFinePrint } from 'react-icons/fc';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { FaUpload } from 'react-icons/fa';

interface NavItemProps {
  icon: ReactNode; // Tipo ReactNode para aceitar qualquer elemento React (como ícones)
  text: string; // Tipo string para o texto do item de navegação
  path: string; // Tipo string para a rota do item de navegação
}

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <ul className="hidden sm:flex items-center space-x-4 leading-5 sm:space-x-6">
      <NavItem icon={<FcHome />} text="Início" path="/" />
      <NavItem icon={<FcSearch />} text="Pesquisar" path="/pesquisar" />
      <div className="relative ml-auto">
        <div
          className="flex items-center cursor-pointer py-2 pr-2 pl-1 border-b-2 border-transparent hover:border-gray-300"
          onClick={toggleMenu}
        >
          <span className="text-base leading-6 font-medium text-secondary-500">Mais</span>
          {menuOpen ? (
            <BiChevronUp className="ml-1 text-gray-600" />
          ) : (
            <BiChevronDown className="ml-1 text-gray-600" />
          )}
        </div>
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg z-10">
            <Link href="/sobre">
              <div className="cursor-pointer flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <FcInfo className="inline-block mr-2" />
                <span>Sobre</span>
              </div>
            </Link>
            <Link href="/enviar-experimento">
              <div className="cursor-pointer flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <FaUpload className="mr-2" />
                <span>Enviar experimento</span>
              </div>
            </Link>
          </div>
        )}
      </div>
    </ul>
  );
};

const NavItem = ({ icon, text, path }: NavItemProps) => (
  <li className="nav-item">
    <Link href={path}>
      <div className="relative flex items-center py-2 pr-2 border-b-2 border-transparent hover:border-gray-300">
        {icon}
        <span className="ml-2 text-base leading-6 font-medium text-secondary-500">{text}</span>
      </div>
    </Link>
  </li>
);

export default Navbar;
