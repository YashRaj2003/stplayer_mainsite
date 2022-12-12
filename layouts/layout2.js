import Head from 'next/head'
import { useState } from 'react'
import Naviagtion from '/components/Navigation'
import Topbar from '/components/Topbar'
import Popup from "/components/Popup"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from 'next/router';
import Logo_text from "/Images/Horizontal Logo - white.svg";
import Logo from "/Images/Horizontal Logo - white.svg";

const Layout2 = ({ children }) => {

  const [Nav, setNav] = useState(false);
  const [search, setsearch] = useState("");

  return (
    <div className="font-graphik bg-background">

      <div className="sticky top-0 z-40 h-16">
        <Topbar Nav={Nav} setNav={setNav} setsearch={setsearch} />
      </div>
      <div className="flex relative h-[calc(100vh-64px)] ">
        {Nav &&
          <Popup close={setNav}>
            <div className="bg-background w-64 border-r border-border border-opacity-30 min-h-screen">
              <div className="flex justify-between px-5 pt-2 w-64">
                <button className="" onClick={() => setNav(!Nav)} >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 fill-current text-white text-opacity-50 hover:text-opacity-100" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
                  </svg>
                </button>
                <Image src={Logo_text} width={200} height={46} alt="logo" className="select-none cursor-pointer" draggable="false" />

              </div>
              <Naviagtion />
            </div>
          </Popup>
        }

        <div className="md:p-5 text-white w-full h-full">
          {children}
        </div>
      </div>


    </div >

  )
}

export default Layout2;

