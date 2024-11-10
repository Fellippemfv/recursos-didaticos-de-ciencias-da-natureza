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
      <NavItem icon={<FcInfo />} text="Sobre" path="/sobre" />

     
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
