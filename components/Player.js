import { Player as VimePlayer, Hls, DefaultUi, Video, Youtube } from '@vime/react'
import { useRef, useState } from 'react';


function Player({ poster, src }) {

    const hlsConfig = {
        // ...
    };

    const [playing, setplaying] = useState(true);

    const videoRef = useRef(null);
    // const handleVideoPress = () => {
    //     if (playing) {
    //         videoRef.current.pause();
    //         setPlaying(false);
    //     } else {
    //         videoRef.current.play();
    //         setPlaying(true);
    //     }
    // };
    // const vidRef = useRef(null);
    // const handlePlayVideo = () => {
    //     if (play === true) {
    //         vidRef.current.pause();
    //     }
    //     else {
    //         vidRef.current.play();
    //     }
    // }

    const videoHandler = (control) => {
        if (control === "play") {
            videoRef.current.play();
            setplaying(true);
        } else if (control === "pause") {
            videoRef.current.pause();
            setplaying(false);
        }
    };

    return (
        <div className="h-full w-full font-Manrope">
            {/* <video className="w-full h-full appearance-none outline-none cursor-pointer" controls ref={videoRef} onClick={() => { playing ? videoHandler("pause") : videoHandler("play") }} poster={poster} loop>
                <source src="https://storage.googleapis.com/armusdigital.com/middleofnight/middleofnight.mp4" type="video/mp4" />
            </video> */}

            <VimePlayer theme="dark" style={{ '--vm-player-theme': '#23C8D2' }} loop >
                <Hls version="latest" config={hlsConfig} poster={poster} preload='true' >
                    <source data-src="https://storage.googleapis.com/armusdigital.com/4525317ba1d25b9485101d4c55fc3b73/index.m3u8" type="application/x-mpegURL" />
                </Hls>
                <DefaultUi />
            </VimePlayer>
            {/* <VimePlayer theme="dark" style={{ '--vm-player-theme': '#23C8D2' }}>
                <Video crossOrigin poster={poster}>
                    <source src="https://storage.googleapis.com/armusdigital.com/middleofnight/middleofnight.mp4" />
                </Video>
                <DefaultUi />
            </VimePlayer> */}
        </div>


    )
}
export default Player