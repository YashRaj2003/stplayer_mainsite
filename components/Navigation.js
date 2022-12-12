import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';

export default function Naviagtion() {

    const router = useRouter();

    const active = "flex items-center h-12 bg-nav_active px-5 gap-x-2 cursor-pointer";
    const passive = "flex items-center h-12 bg-none hover:bg-nav_active hover:bg-opacity-50 px-5 gap-x-2 cursor-pointer";

    const [tab, settab] = useState(1);

    return (
        <div className="font-graphik">
            <div className="w-60  text-white pt-5">
                <div className="" >
                    <Link href="/" passHref>
                        <div className={
                            router.pathname === '/'
                                ? active
                                : passive
                        }>
                            {router.pathname === '/' ?
                                <div className="h-8">
                                    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="h-8" ><g className="style-scope yt-icon"><path d="M10,8l6,4l-6,4V8L10,8z M21,3v18H3V3H21z M20,4H4v16h16V4z" className="text-white fill-current"></path></g></svg>
                                </div>
                                : <div className="h-8">
                                    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="h-8" ><g className="style-scope yt-icon"><path d="M10,8l6,4l-6,4V8L10,8z M21,3v18H3V3H21z M20,4H4v16h16V4z" className="text-white fill-current"></path></g></svg>
                                </div>
                            }
                            <p className="text-[17px] pt-1 tracking-wide">Video</p>
                        </div>
                    </Link>

                </div>
                {/* <div className="" >
                    <Link href="/music" passHref>
                        <div className={router.pathname === '/music' ? active : passive}>
                            {router.pathname === '/music' ?
                                <div className="h-8 w-8 flex items-center">
                                    <svg viewBox="0 0 24 24" className="fill-current text-white h-8 w-8" preserveAspectRatio="xMidYMid meet" focusable="false" ><g ><path d="M10 9.35L15 12l-5 2.65zM12 7a5 5 0 105 5 5 5 0 00-5-5m0-1a6 6 0 11-6 6 6 6 0 016-6zm0-3a9 9 0 109 9 9 9 0 00-9-9m0-1A10 10 0 112 12 10 10 0 0112 2z" ></path></g></svg>
                                </div>
                                :
                                <div className="h-8 w-8 flex items-center">
                                    <svg viewBox="0 0 24 24" className="fill-current text-white h-8 w-8" preserveAspectRatio="xMidYMid meet" focusable="false" ><g ><path d="M10 9.35L15 12l-5 2.65zM12 7a5 5 0 105 5 5 5 0 00-5-5m0-1a6 6 0 11-6 6 6 6 0 016-6zm0-3a9 9 0 109 9 9 9 0 00-9-9m0-1A10 10 0 112 12 10 10 0 0112 2z" ></path></g></svg>
                                </div>}
                            <p className="text-[17px] pt-1 tracking-wide">Music</p>
                        </div>
                    </Link>
                </div> */}
                <div className="" >
                    <Link href="/movies" passHref>
                        <div className={router.pathname === '/movies' ? active : passive}>
                            {router.pathname === '/movies' ? <div className="h-8">
                                <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="h-8"><g className="style-scope yt-icon"><path d="M4,20h14v1H3V6h1V20z M21,3v15H6V3H21z M17,10.5L11,7v7L17,10.5z" className="text-white fill-current"></path></g></svg>
                            </div>

                                :
                                <div className="h-8">
                                    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="h-8"><g className="style-scope yt-icon"><path d="M11,7l6,3.5L11,14V7L11,7z M18,20H4V6H3v15h15V20z M21,18H6V3h15V18z M7,17h13V4H7V17z" className="text-white fill-current"></path></g></svg>
                                </div>
                            }
                            <p className="text-[17px] pt-1 tracking-wide">Movies</p>
                        </div>
                    </Link>
                </div>
                <div className="" >
                    <Link href="/web-series" passHref>
                        <div className={router.pathname === '/web-series' ? active : passive}>
                            {router.pathname === '/web-series' ?
                                <div className="h-8">
                                    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="h-8"><g className="style-scope yt-icon"><path d="M20,7H4V6h16V7z M22,9v12H2V9H22z M15,15l-5-3v6L15,15z M17,3H7v1h10V3z" className="text-white fill-current"></path></g></svg>
                                </div>
                                : <div className="h-8">
                                    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="h-8"><g className="style-scope yt-icon"><path d="M10,18v-6l5,3L10,18z M17,3H7v1h10V3z M20,6H4v1h16V6z M22,9H2v12h20V9z M3,10h18v10H3V10z" className="text-white fill-current"></path></g></svg>
                                </div>
                            }
                            <p className="text-[17px] pt-1 tracking-wide">Web Series</p>
                        </div>
                    </Link>
                </div>
            </div>

        </div>
    )
}

