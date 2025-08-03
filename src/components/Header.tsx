"use client";

const Header = () => {
  return (
    <nav
  style={{ background: "rgb(19 78 74 / var(--tw-bg-opacity))" }}
  className="text-white shadow-lg"
>
  <div className="max-w-5xl mx-auto pt-4 pb-4 pl-0 pr-0 flex justify-between items-center">
    {/* Logo e título */}
    <div className="flex items-center justify-center gap-2">
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
    </div>

    {/* Menu de navegação (desktop) */}
    <div className="hidden md:flex space-x-6">
      <a href="/" className="hover:text-blue-100 transition">
        Início
      </a>
      <a href="/search" className="hover:text-blue-100 transition">
        Pesquisar
      </a>
      <a href="/about" className="hover:text-blue-100 transition">
        Sobre
      </a>
      <a href="/contact" className="hover:text-blue-100 transition">
        Contato
      </a>
    </div>

    {/* Botão do menu mobile */}
    <button className="md:hidden focus:outline-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  </div>
</nav>

  );
};

export default Header;
