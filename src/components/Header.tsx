'use client'
import Link from 'next/link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import Navbar from './Navbar'

const Header = () => {
    return (
      <header className="flex items-center justify-between py-10">
        <div>
         <p>link 1</p>

        </div>
        <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
       <Navbar />

          <ThemeSwitch />
          <MobileNav />
        </div>
      </header>
    )
  }

export default Header