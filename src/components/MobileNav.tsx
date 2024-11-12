"use client";

import { useState } from "react";
import Link from "./Link";
import headerNavLinks from "../../data/headerNavLinks";

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false);

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = "auto";
      } else {
        // Prevent scrolling
        document.body.style.overflow = "hidden";
      }
      return !status;
    });
  };

  return (
    <>
      <button
        aria-label="Toggle Menu"
        onClick={onToggleNav}
        className="sm:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-8 w-8 text-gray-900 dark:text-gray-100"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={`fixed left-0 top-0 z-10 h-full w-full transform bg-white opacity-95 duration-300 ease-in-out dark:bg-gray-950 dark:opacity-[0.98] ${
          navShow ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end">
          <button
            className="mr-8 mt-11 h-8 w-8"
            aria-label="Toggle Menu"
            onClick={onToggleNav}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="text-gray-900 dark:text-gray-100"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <nav className="fixed mt-8 h-full">
          <div className="px-12 flex flex-col">
            <div className="w-full h-full mb-8 border-b border-solid border-darkgray">
              <Link
                href="/"
                className="inline-block w-full h-full border-solid border-darkgrey text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
                onClick={onToggleNav}
              >
                <span className="mb-4">Inicio</span>
              </Link>
            </div>

            <div className="w-full h-full mb-8 border-b border-solid border-darkgray">
              <Link
                href="/search"
                className="inline-block w-full h-full border-solid border-darkgrey text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
                onClick={onToggleNav}
              >
                <span className="mb-4">Pesquisar</span>
              </Link>
            </div>

            <div className="w-full h-full mb-8 border-b border-solid border-darkgray">
              <Link
                href="/about"
                className="inline-block w-full h-full border-solid border-darkgrey text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
                onClick={onToggleNav}
              >
                <span className="mb-4">Sobre</span>
              </Link>
            </div>

            <div className="w-full h-full mb-8 border-b border-solid border-darkgray">
              <Link
                href="/enviar-experimento"
                className="inline-block w-full h-full border-solid border-darkgrey text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
                onClick={onToggleNav}
              >
                <span className="mb-4">Enviar experimento</span>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default MobileNav;
