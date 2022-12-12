import '@vime/core/themes/default.css';
import '@vime/core/themes/light.css';
import { collection, doc, increment, getDoc, getDocs, limit, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import Head from "next/head";
import { useRouter } from 'next/router';
import TextareaAutosize from 'react-textarea-autosize';
import "../../styles/Video.module.css"
import moment from 'moment';
import dynamic from 'next/dynamic'
const Player = dynamic(() => import("../../components/Player"), {
    ssr: false,
})
export async function getServerSideProps(context) {

    const { videoid } = context.params;
    const videodata = await getDoc(doc(db, "video", videoid)).then((res) => res.data());

    return {
        props: { videodata, videoid }, // will be passed to the page component as props
    };
}

const Videoid = ({ videodata, videoid }) => {
    const router = useRouter();
    const { asPath } = useRouter();
    const [video, setvideo] = useState([]);
    const [desc, setdesc] = useState(false);
    const [Share, setShare] = useState(false);
    const [copied, setcopied] = useState(false);



    useEffect(() => {
        getsuggested();
    }, []);

    async function getsuggested() {
        const q = query(collection(db, "video"), orderBy("createdAt"), limit(10),);
        await getDocs(q).then(res => {
            var a = [];
            res.forEach((pro) => {
                if (pro.id !== videoid)
                    a.push({ ...pro.data(), id: pro.id });
            });
            setvideo(a);
        });
    }


    setTimeout(() => {
        // updateviews();
    }, 50000);

    async function updateviews() {
        await updateDoc(doc(db, "video/" + videoid), {
            views: videodata?.views + 1,
        });
    }

    function copy() {
        const el = document.createElement("input");
        el.value = window.location.href;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        setcopied(true);
    }





    const navigatePage = (page) => {
        router.push(page);
        router.reload(page);
    };

    return (

        <div className="lg:flex justify-center lg:gap-x-20 lg:px-24 3xl:px-36 lg:py-5 h-[calc(100vh-90px)] overflow-y-auto bg-background">
            <Head>
                <title>{videodata?.title}</title>
                <meta name="title" content={videodata?.title} />
                <meta name="description" content={videodata?.description} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`https://st-player.in${asPath}`} />
                <meta property="og:title" content={videodata?.title} />
                <meta property="og:description" content={videodata?.description} />
                <meta property="og:image" content={videodata?.thumbnail} />
                <meta property="twitter:card" content="Video" />
                <meta property="twitter:url" content={`https://st-player.in${asPath}`} />
                <meta property="twitter:title" content={videodata?.description} />
                <meta property="twitter:description" content={videodata?.description} />
                <meta property="twitter:image" content={videodata?.thumbnail} />
            </Head>

            <div className="w-full">
                {/* {videodata?.videoURL} */}
                <div className="w-full appearance-none outline-none">
                    <video
                        controlsList="nodownload"
                        src={videodata?.videoURL}
                        poster={videodata?.thumbnail}
                        controls
                        className="w-full outline-none appearance-none"
                        autoPlay
                    ></video>
                    {/* <Player src={videodata?.videoURL} poster={videodata?.thumbnail} /> */}
                </div>
                <div className="text-white text-opacity-50 my-5 border-t border-b py-2 border-opacity-10 border-white">
                    <div className="flex justify-between items-center px-2 lg:px-0">
                        <div className="">
                            <h1 className="text-lg">{videodata?.title}</h1>
                            <h2 className="text-lg">{videodata?.views} views &#8226; {moment(videodata.createdAt).format("MMM DD, YYYY")}</h2>
                        </div>
                        <div className="flex gap-x-5">
                            <div onClick={() => setdesc(!desc)} >
                                <svg xmlns="http://www.w3.org/2000/svg" className={desc == true ? "transform rotate-180 h-6 w-6 cursor-pointer" : "rotate-0 h-6 w-6 cursor-pointer"} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                            <div className="cursor-pointer" onClick={() => setShare(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 opacity-50 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {desc && <div className="my-5 px-2 md:px-0 py-2 border-opacity-10 border-white text-white text-opacity-50">
                    <p className="">Published on: 2021-10-09</p>
                    <TextareaAutosize defaultValue={videodata?.description} disabled className="bg-transparent resize-none  w-full outline-none appearance-none" />

                </div>}
                {Share &&
                    <>
                        <div className="font-Manrope text-white text-opacity-50 duration-500 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                            <div className="relative w-5/6 my-6 mx-auto lg:w-2/6  ">
                                <div className="shadow-md relative flex flex-col w-full bg-background outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex  justify-between lg:mx-8 mx-3 py-3 items-center border-b border-solid border-blueGray-200 rounded-t">
                                        <h3 className="text-xl">
                                            Share
                                        </h3>
                                        <div onClick={() => setShare(false)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-error cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="relative pt-2 lg:px-10 px-3 pb-10">
                                        <div className="flex flex-col mt-3">
                                            {/* <p className="">Share</p> */}
                                            <div className="flex items-center gap-5 py-5 flex-wrap">
                                                <div className="h-16 w-16 cursor-pointer" onClick={copy}>
                                                    <svg viewBox="0 0 36 36" preserveAspectRatio="xMidYMid meet" focusable="false" ><g viewBox="0 0 36 36"><circle cx="18" cy="18" r="17.5" stroke="#E7E7E7" fill="#F4F4F4" ></circle><path d="m21.41,23.29l-0.71,-0.71l4.59,-4.58l-4.59,-4.59l0.71,-0.71l5.3,5.3l-5.3,5.29zm-6.12,-0.7l-4.58,-4.59l4.59,-4.59l-0.71,-0.7l-5.3,5.29l5.29,5.29l0.71,-0.7z" fill="#606060" ></path></g></svg>
                                                </div>
                                                <a href={`"mailto:?&subject=Watch a video in ST Player &body=${window.location.origin}${asPath}"`} data-action="share/email/share" target="_blank" rel="noreferrer">
                                                    <div className="w-16 h-16 cursor-pointer">
                                                        <svg viewBox="0 0 60 60" preserveAspectRatio="xMidYMid meet" focusable="false"><g ><g fill="none" ><path d="M28.4863253 59.9692983c-6.6364044-.569063-11.5630204-2.3269561-16.3219736-5.8239327C4.44376366 48.4721168 3e-7 39.6467924 3e-7 29.9869344c0-14.8753747 10.506778-27.18854591 25.2744118-29.61975392 6.0281072-.9924119 12.7038532.04926445 18.2879399 2.85362966C57.1386273 10.0389054 63.3436516 25.7618627 58.2050229 40.3239688 54.677067 50.3216743 45.4153135 57.9417536 34.81395 59.5689067c-2.0856252.3201125-5.0651487.5086456-6.3276247.4003916z" fill="#888" ></path><path d="M40.531502 19.160814h-22c-1.74 0-2.986 1.2375-3 3v16c0 1.7625 1.26 3 3 3h22c1.74 0 3-1.2375 3-3v-16c0-1.7625-1.26-3-3-3zm0 6l-11 7-11-7v-3l11 7 11-7v3z" fill="#FFF" ></path></g></g></svg>
                                                    </div>
                                                </a>
                                                <a href={`https://api.whatsapp.com/send/?phone&text=${window.location.origin}${asPath}`} data-action="share/whatsapp/share" target="_blank" rel="noreferrer">
                                                    <div className="w-16 h-16 cursor-pointer">
                                                        <svg viewBox="0 0 60 60" preserveAspectRatio="xMidYMid meet" focusable="false" ><g ><g fill="none"  ><circle cx="30" cy="30" r="30" fill="#25D366" ></circle><path d="M39.7746 19.3513C37.0512 16.5467 33.42 15 29.5578 15C21.6022 15 15.1155 21.6629 15.1155 29.8725C15.1155 32.4901 15.7758 35.0567 17.0467 37.3003L15 45L22.6585 42.9263C24.7712 44.1161 27.148 44.728 29.5578 44.728C37.5134 44.728 44 38.0652 44 29.8555C44 25.8952 42.498 22.1558 39.7746 19.3513ZM29.5578 42.2295C27.3956 42.2295 25.2829 41.6346 23.4508 40.5127L23.0051 40.2408L18.4661 41.4646L19.671 36.9093L19.3904 36.4334C18.1855 34.4618 17.5583 32.1841 17.5583 29.8555C17.5583 23.0397 22.9556 17.4986 29.5743 17.4986C32.7763 17.4986 35.7968 18.7904 38.0581 21.119C40.3193 23.4476 41.5737 26.5581 41.5737 29.8555C41.5572 36.6884 36.1764 42.2295 29.5578 42.2295ZM36.1434 32.966C35.7803 32.779 34.0142 31.8782 33.6841 31.7592C33.354 31.6402 33.1064 31.5722 32.8754 31.9462C32.6278 32.3201 31.9511 33.153 31.7365 33.4079C31.5219 33.6629 31.3238 33.6799 30.9607 33.4929C30.5976 33.306 29.4422 32.915 28.0558 31.6572C26.9829 30.6714 26.2567 29.4476 26.0421 29.0907C25.8275 28.7167 26.0256 28.5127 26.2072 28.3258C26.3722 28.1558 26.5703 27.8839 26.7518 27.6799C26.9334 27.4589 26.9994 27.3059 27.115 27.068C27.2305 26.813 27.181 26.6091 27.082 26.4221C26.9994 26.2351 26.2732 24.3994 25.9761 23.6686C25.679 22.9377 25.3819 23.0397 25.1673 23.0227C24.9528 23.0057 24.7217 23.0057 24.4741 23.0057C24.2265 23.0057 23.8469 23.0907 23.5168 23.4646C23.1867 23.8385 22.2459 24.7394 22.2459 26.5581C22.2459 28.3938 23.5333 30.1445 23.7149 30.3994C23.8964 30.6544 26.2567 34.3938 29.8714 36.0085C30.7297 36.3994 31.4064 36.6204 31.9345 36.7904C32.7928 37.0793 33.5851 37.0283 34.2123 36.9433C34.9055 36.8414 36.3415 36.0425 36.6551 35.1756C36.9522 34.3088 36.9522 33.5609 36.8697 33.4079C36.7541 33.255 36.5065 33.153 36.1434 32.966Z" fill="white" ></path></g></g></svg>
                                                    </div>
                                                </a>
                                                <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}${asPath}`} data-action="share/facebook/share" target="_blank" rel="noreferrer">
                                                    <div className="w-16 h-16">
                                                        <svg viewBox="0 0 60 60" preserveAspectRatio="xMidYMid meet" focusable="false" ><g ><g fill="none" ><path d="M28.4863253 59.9692983c-6.6364044-.569063-11.5630204-2.3269561-16.3219736-5.8239327C4.44376366 48.4721168 3e-7 39.6467924 3e-7 29.9869344c0-14.8753747 10.506778-27.18854591 25.2744118-29.61975392 6.0281072-.9924119 12.7038532.04926445 18.2879399 2.85362966C57.1386273 10.0389054 63.3436516 25.7618627 58.2050229 40.3239688 54.677067 50.3216743 45.4153135 57.9417536 34.81395 59.5689067c-2.0856252.3201125-5.0651487.5086456-6.3276247.4003916z" fill="#3B5998" ></path><path d="M25.7305108 45h5.4583577V30.0073333h4.0947673l.8098295-4.6846666h-4.9045968V21.928c0-1.0943333.7076019-2.2433333 1.7188899-2.2433333h2.7874519V15h-3.4161354v.021c-5.3451414.194-6.4433395 3.2896667-6.5385744 6.5413333h-.0099897v3.7603334H23v4.6846666h2.7305108V45z" fill="#FFF" ></path></g></g></svg>
                                                    </div>
                                                </a>
                                                <a href={`https://twitter.com/intent/tweet?url=${window.location.origin}${asPath}`} data-action="share/twitter/share" target="_blank" rel="noreferrer">
                                                    <div className="w-16 h-16">
                                                        <svg viewBox="0 0 60 60" preserveAspectRatio="xMidYMid meet" focusable="false" ><g><g fill="none" ><path d="M28.486325 59.969298c-6.636404-.569063-11.56302-2.326956-16.321973-5.823932C4.443764 48.472116 0 39.646792 0 29.986934 0 15.11156 10.506778 2.798388 25.274412.36718c6.028107-.992411 12.703853.049265 18.28794 2.85363 13.576275 6.818095 19.7813 22.541053 14.64267 37.103159-3.527955 9.997705-12.789708 17.617785-23.391072 19.244938-2.085625.320112-5.065149.508645-6.327625.400391z" fill="#1DA1F2"></path><path d="M45.089067 17.577067c-.929778.595555-3.064534 1.460977-4.117334 1.460977v.001778C39.7696 17.784 38.077156 17 36.200178 17c-3.645511 0-6.6016 2.956089-6.6016 6.600178 0 .50631.058666 1.000178.16711 1.473778h-.001066c-4.945066-.129778-10.353422-2.608356-13.609244-6.85049-2.001778 3.46489-.269511 7.3184 2.002133 8.72249-.7776.058666-2.209067-.0896-2.882844-.747023-.045156 2.299734 1.060622 5.346845 5.092622 6.452267-.776533.417778-2.151111.297956-2.7488.209067.209778 1.941333 2.928355 4.479289 5.901155 4.479289C22.46009 38.565156 18.4736 40.788089 14 40.080889 17.038222 41.929422 20.5792 43 24.327111 43c10.650667 0 18.921956-8.631822 18.4768-19.280356-.001778-.011733-.001778-.023466-.002844-.036266.001066-.027378.002844-.054756.002844-.0832 0-.033067-.002844-.064356-.003911-.096356.9696-.66311 2.270578-1.836089 3.2-3.37991-.539022.296888-2.156089.891377-3.6608 1.038932.965689-.521244 2.396444-2.228266 2.749867-3.585777" fill="#FFF"></path></g></g></svg>
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="w-full hidden  h-12 border mt-2 items-center flex justify-between border-black hover:border-theme cursor-pointer">
                                                <p className="px-5 truncate " id="text">{`https://st-player.in${asPath}`}</p>
                                                <div className="px-5" onClick={copy} >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                    </svg>
                                                </div>
                                            </div>
                                            {copied ?
                                                <div className="h-12 bg-success text-background flex items-center justify-center mt-5">
                                                    <p className="">Copied</p>
                                                </div>
                                                : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-80 fixed inset-0 z-40 bg-black"></div>
                    </>
                }
            </div>

            <div className="lg:m-0 m-5">
                <div>
                    <p className="text-white text-xl font-light tracking-wide pb-5">Recommended</p>
                </div>
                {/* <div>
                    <GoogleAd />
                </div> */}
                <div className="flex lg:flex-col flex-wrap  gap-5 justify-between ">

                    {video?.map((v, index) => (
                        <>
                            <div className="w-full sm:w-48 md:w-64 lg:w-[w-250px] xl:w-[276px] cursor-pointer md:hidden flex flex-col" key={index}
                                onClick={() => router.push("/video/" + v.id)}
                            >
                                {/* <div className="relative w-full sm:w-48 md:w-56 lg:w-[w-250px] xl:w-[276px] h-[160px] sm:h-[108px] md:h-[126px] lg:h-[140px] xl:h-[155px]">
                                    <Image
                                        src={v?.thumbnail}
                                        alt={v?.id}
                                        blurDataURL={thumbnail_blur}
                                        layout="fill"
                                        draggable="false"
                                        className="aspect-auto"
                                    />
                                </div> */}
                                {/* <img src={v?.thumbnail} alt="" className="mb-2" draggable="false" /> */}
                                <img src={v?.thumbnail} alt={v.id} className="mb-2 w-full" draggable="false" />


                                <p className="line-clamp-2 mt-2 text-opacity-50 text-white">
                                    {v?.title} </p>
                                <p className="truncate text-opacity-50 text-white">{v?.label}</p>

                            </div>
                            <div className="w-max md:flex my-2  cursor-pointer  hidden" key={index}
                                onClick={() => router.push("/video/" + v.id)}
                            >
                                <div className="relative w-[168px] h-[94px]">
                                    <img src={v?.thumbnail} alt={v.id} className="mb-2 w-[168px] h-[94px] " draggable="false" />

                                </div>
                                <div className="w-64 pl-5">
                                    <p className="line-clamp-2 mt-2 text-opacity-50 text-white ">
                                        {v?.title} </p>
                                    <p className="truncate text-opacity-50 text-white text-sm">{v?.label}</p>

                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </div>
    )
}


Videoid.layout = "L2";
export default Videoid;