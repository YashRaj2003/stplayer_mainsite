import Image from 'next/image'
import Logo_text from "/Images/Horizontal Logo - white.svg";
import Logo from "/Images/Logo.svg";
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';

export default function Topbar({ Nav, setNav }) {

    const router = useRouter();
    const [text, settext] = useState("")
    function submit() {
        router.push("/search/" + text)
    }

    return (
        <div className="font-graphik h-16 bg-background flex items-center justify-between px-5 gap-x-3 lg:gap-x-0 border-b border-border border-opacity-30 shadow-lg">
            <div className="">
                <div className="hidden lg:flex gap-x-3">
                    {router.pathname.includes("video") ?
                        <button className="" onClick={() => setNav(!Nav)} >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 fill-current text-white text-opacity-50 hover:text-opacity-100" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </button>
                        : null}
                    <Link href="/" passHref >
                        <Image src={Logo_text} width={200} height={46} alt="logo" className="select-none cursor-pointer" draggable="false" />
                    </Link>
                </div>
                <div className="lg:hidden flex gap-x-5">
                    <button className="" onClick={() => setNav(!Nav)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 fill-current text-white text-opacity-50 hover:text-opacity-100" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </button>
                    <Link href="/" passHref >
                        <Image src={Logo} width={46} height={46} alt="logo" className="select-none cursor-pointer" draggable="false" />
                    </Link>
                </div>
            </div>
            <div className="">
                <div className="flex items-center">
                    <form action={`/search/${text}`}>
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full md:w-96 2xl:w-[560px] h-10 p-5  bg-transparent text-white text-opacity-70 border border-border appearance-none outline-none focus:border-theme"
                            onChange={(e) => settext(e.target.value)}
                        />
                    </form>
                    <button className="bg-border bg-opacity-50 h-[42px] px-3 ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="hidden px-2 py-2 lg:flex items-center gap-x-2 border-theme lg:border  text-theme selection:select-none">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="lg:h-6 lg:w-6 w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </span>
                <span className="hidden lg:flex">SIGN IN</span>
            </div>
        </div>
    );
}