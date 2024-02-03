'use client'
import Link from 'next/link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import Navbar from './Navbar'
import { FcBiohazard, FcGlobe, FcSearch } from 'react-icons/fc'

const Header = () => {
    return (
      <header className="flex items-center justify-between py-10">
      <div className="flex items-center">
        <FcBiohazard  className="text-blue-500 h-10 w-10 mr-2" />
        <div>
          <p className="text-black font-bold">Exp</p>
        </div>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        {/* Restante do seu código Navbar e MobileNav */}
      </div>
        <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
          <Navbar />

          <MobileNav />
        </div>
      </header>
    )
  }

export default Header