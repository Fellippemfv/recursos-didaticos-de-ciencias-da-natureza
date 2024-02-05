'use client'
import Link from 'next/link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import Navbar from './Navbar'
import { FcBiohazard, FcGlobe, FcSearch } from 'react-icons/fc'
import { BiSolidFlask } from 'react-icons/bi'

const Header = () => {
    return (
      <header className="flex items-center justify-between py-10">
<div className="flex items-center">
  <BiSolidFlask className="text-green-600 h-14 w-14" />
  <div className="text-center">
    <p className="font-serif font-extrabold text-3xl text-green-800">Ciências</p>
    <p className="font-sans font-normal text-lg text-gray-600">para todos</p>
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