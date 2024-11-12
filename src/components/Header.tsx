"use client";
import MobileNav from "./MobileNav";
import Navbar from "./Navbar";
import { FaBookOpen, FaVial } from "react-icons/fa";

const Header = () => {
  return (
    <header className="flex items-center justify-between py-5 ml-2">
      <div className="flex items-center">
        <FaBookOpen className="h-10 w-10 text-blue-500" />
        <span className="ml-2 text-xl font-medium">Recursos Didáticos</span>
      </div>

      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        {/* Restante do seu código Navbar e MobileNav */}
      </div>

      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        <Navbar />
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
