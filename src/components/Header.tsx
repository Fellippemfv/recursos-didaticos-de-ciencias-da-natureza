"use client";

import { useState } from 'react';
import Link from 'next/link'; // Importar o Link do Next.js para navegação otimizada

const Header = () => {
  // Estado para controlar se o menu mobile está aberto ou fechado
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Função para alternar o estado do menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { href: '/', label: 'Início' },
    { href: '/search', label: 'Pesquisar' },
    { href: '/about', label: 'Sobre' },
    { href: '/contact', label: 'Contato' },
  ];

  return (
    <header
      style={{ background: "rgb(19 78 74 / var(--tw-bg-opacity))" }}
      className="text-white shadow-lg relative z-30" // Aumentado o z-index para garantir que o header fique na frente
    >
      <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo e título */}
        <Link href="/" className="flex items-center justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-cyan-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
            <span className="text-2xl font-bold text-white">
              <span className="text-cyan-400">Ciência</span>Blog
            </span>
        </Link>

        {/* Menu de navegação (desktop) */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
             <Link key={link.href} href={link.href} className="hover:text-cyan-300 transition-colors duration-300">
                {link.label}
             </Link>
          ))}
        </div>

        {/* Botão do menu mobile */}
        <button
          className="md:hidden focus:outline-none z-20" // z-20 para garantir que o botão fique acima do menu
          onClick={toggleMenu} // Adicionado o evento de clique
          aria-label="Toggle menu"
        >
          {/* Altera o ícone com base no estado do menu (aberto/fechado) */}
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      {/* Menu de navegação (mobile) */}
      {/* A visibilidade é controlada pela classe 'transform' e 'opacity' para uma transição suave */}
      <div
        className={`md:hidden absolute top-full left-0 w-full transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4 pointer-events-none'
        }`}
        style={{ background: "rgb(19 78 74 / var(--tw-bg-opacity))" }}
      >
        <div className="flex flex-col items-center space-y-4 py-4">
           {navLinks.map((link) => (
             <Link key={link.href} href={link.href} className="hover:text-cyan-300 transition-colors duration-300" onClick={toggleMenu}>
                {link.label}
             </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
