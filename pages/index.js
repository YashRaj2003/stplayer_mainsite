import { collection, getDocs, limit, onSnapshot, orderBy, query, startAfter } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import { db } from '../firebase';
import { useRouter } from 'next/router'
import Head from "next/head";
import { LazyLoadImage } from 'react-lazy-load-image-component';

// export async function getServerSideProps(context) {
// const q = query(collection(db, "video"), limit(20));
// const Video = await getDocs(q).then((snapshot) => snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))


//   return {
//     props: { Video }, // will be passed to the page component as props
//   };
// }
function Home() {
  const [Video, setVideo] = useState([]);
  const [last, setlast] = useState(null);
  const router = useRouter();
  const [disable, setdisable] = useState(false);


  useEffect(() => {
    getvideos();
  }, []);

  async function getvideos() {
    const q = query(collection(db, "video"), orderBy("createdAt"), limit(20));
    await getDocs(q).then((res) => {
      var a = [];
      res.docs.forEach((doc) => {
        a.push({ ...doc.data(), id: doc.id })
      });
      setVideo(a)
      setlast(res.docs[res.docs.length - 1]);

    });
  }
  const navigatePage = (page) => {
    router.push(page);
  };

  const handleclick = async () => {
    const q = query(collection(db, "video"), orderBy("createdAt"), startAfter(last), limit(20));
    await getDocs(q).then((res) => {
      var a = [];
      res.docs.forEach((doc) => {
        a.push({ ...doc.data(), id: doc.id })
      });
      setVideo([...Video, ...a]);
      setlast(res.docs[res.docs.length - 1]);

    });


  }





  return (

    <div className="font-Manrope flex flex-col items-center p-5 h-[calc(100vh-64px)] bg-background overflow-y-auto">
      <Head>
        <title>ST player - Streams millions of content for free</title>
        <meta name="title" content="ST player - Streams millions of content for free" />
        <meta name="description" content="ST player - Streams millions of content for free" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://st-player.in" />
        <meta property="og:title" content="ST player - Streams millions of content for free" />
        <meta property="og:description" content="ST player - Streams millions of content for free" />
        <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/player-7b380.appspot.com/o/site_info%2FLogo%20with%20dark.jpg?alt=media&token=2f90a534-5e91-4442-bdf6-a8942ef411ec" />
        <meta property="twitter:card" content="Video" />
        <meta property="twitter:url" content="https://st-player.in" />
        <meta property="twitter:title" content="ST player - Streams millions of content for free" />
        <meta property="twitter:description" content="ST player - Streams millions of content for free" />
        <meta property="twitter:image" content="https://firebasestorage.googleapis.com/v0/b/player-7b380.appspot.com/o/site_info%2FLogo%20with%20dark.jpg?alt=media&token=2f90a534-5e91-4442-bdf6-a8942ef411ec" />
      </Head>
      <div className="">
        {/* <Google_h_ad /> */}
        {/* {Video?.map((video, index, id) => (
          <div className="cursor-pointer" key={index}>

            <p className="truncate text-opacity-50 text-white"> https://st-player.in/video/{video?.id}</p>
          </div>
        ))} */}

      </div>
      <div id="videosid" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4  3xl:grid-cols-5  gap-8 justify-center " >
        {Video?.map((video, index, id) => (
          <div className="w-full aspect-video cursor-pointer" key={index}
            onClick={() => navigatePage("/video/" + video.id)}
          >
            {/* <Image
                  src={video?.thumbnail}
                  alt={video?.id}
                  placeholder="blur"
                  blurDataURL={video?.thumbnail}
                  quality={20}
                  width={276}
                  height={155}
                  draggable="false"
                /> */}
            {/* <img src={video?.thumbnail} alt={video?.id} className="w-full" draggable="false" /> */}
            <LazyLoadImage
              alt={video?.id}
              src={video?.thumbnail}
              className=" w-full aspect-video object-cover"
            />
            <p className="line-clamp-2 text-opacity-40 text-white mt-1">
              {video?.title}
            </p>
            <p className="truncate text-opacity-50 text-white"> {video?.label}</p>
          </div>
        ))}
      </div>
      {/* <button disabled={disable} className="py-3 px-12 bg-black bg-opacity-50 mt-10 rounded" onClick={() => handleclick()}>Load more</button> */}
    </div>
  )
}


Home.layout = "L1";
export default Home;