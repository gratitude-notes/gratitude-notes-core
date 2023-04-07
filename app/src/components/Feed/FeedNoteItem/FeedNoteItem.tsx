import { NoteBullet } from "../../../hooks/useUserBullets";
import DotMenu from "./DotMenu";
import KeyWordItem from "./KeyWordItem";
import LikeButton from "./LikeButton";
import Reader from "./Reader";
import ImageViewer from "./ImageViewer";
import Location from "./Location";
import useComponentVisible from "../../../hooks/useComponentVisible";

const NoteItem: React.FC<NoteBullet> = ({ bulletJSON, keywords, score, timestamp, isFavorited, bulletDocID, images }) => {
    const date = timestamp.toDate();
    const month = date.getMonth() + 1
    const day = date.getDate();
    const year = date.getFullYear();
    const hour = date.getHours() % 12 || 12;
    const minute = date.getMinutes();
    const amOrPm = date.getHours() >= 12 ? 'PM' : 'AM';

    const timeStr = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year.toString()} • ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${amOrPm}`;

    const displaySlider = useComponentVisible(false);    // if false, images slider not active, if true, images slider active
    
    return (
        <div className="relative border-b border-gray-400">
            <DotMenu />
            <div className="flex flex-col p-4">
                <Reader noteJSON={bulletJSON}/>

                {/* IMAGES */}
                <div ref={displaySlider.ref} className="w-[300px] mx-auto my-2">
                    <ImageViewer {...{displaySlider, images}} />
                </div>

                <div className="flex flex-col">
                    <KeyWordItem {...{keywords}} />
                    <div className="pt-2 flex justify-between items-center">
                        <LikeButton isFavorited={isFavorited} bulletDocID={bulletDocID} />
                        <div className="flex flex-col text-right">
                            <time className="text-sm text-gray-400">{timeStr}</time>
                            <Location />
                        </div>
                    </div>
                </div>  
            </div>
        </div>
    )
  }
  
  export default NoteItem;