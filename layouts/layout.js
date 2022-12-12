import Head from 'next/head'
import { useState } from 'react'
import Naviagtion from '/components/Navigation'
import Topbar from '/components/Topbar'



const Layout = ({ children }) => {

  const [Nav, setNav] = useState(false);
  const [search, setsearch] = useState("");


  return (
    <div className="font-graphik bg-background">

      <div className="sticky top-0 z-40 h-16">
        <Topbar Nav={Nav} setNav={setNav} setsearch={setsearch} />
      </div>
      <div className="flex relative h-[calc(100vh-64px)] ">
        <div className="hidden lg:flex bg-background border-r border-opacity-30 border-border">
          <Naviagtion />
        </div>
        {Nav ?
          <div className="absolute lg:hidden bg-background z-50 h-[calc(100vh-64px)] border-r border-opacity-30 border-border ">
            <Naviagtion />
          </div>
          : null}
        <div className="md:p-5 text-white w-full h-full">
          {children}
        </div>
      </div>


    </div>
  )
}

export default Layout;