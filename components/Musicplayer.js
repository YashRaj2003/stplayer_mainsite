import Image from "next/image";
import Artwork from "/Images/Artwork.jpg"
export default function Musicplayer() {

    return (
        <div className="h-20 flex items-center justify-between">
            <Image src={Artwork} alt="artwork" width={50} height={50} />
        </div>
    )
}