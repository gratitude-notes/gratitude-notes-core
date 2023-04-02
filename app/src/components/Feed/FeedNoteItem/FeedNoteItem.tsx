import { NoteBullet } from "../../../hooks/useUserBullets";
import DotMenu from "./DotMenu";
import KeyWordItem from "./KeyWordItem";
import LikeButton from "./LikeButton";
import Reader from "./Reader";
import Location from "./Location";

const NoteItem: React.FC<NoteBullet> = ({ bulletJSON, keywords, score, timestamp, isFavorited, bulletDocID, images }) => {
    const date = timestamp.toDate();
    const month = date.getMonth() + 1
    const day = date.getDate();
    const year = date.getFullYear();
    const hour = date.getHours() % 12 || 12;
    const minute = date.getMinutes();
    const amOrPm = date.getHours() >= 12 ? 'PM' : 'AM';

    const timeStr = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year.toString()} • ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${amOrPm}`;

    return (
        <ul>
            <div className="relative border-b border-gray-400">
                <DotMenu />
                <div className="flex flex-col p-4">
                    <Reader noteJSON={bulletJSON}/>

                    {/* IMAGES */}
                    {/* <div className="flex flex-wrap gap-1 justify-center">
                        {images.map((image: string, index: number) => (
                            <div key={index}
                                className="w-[200px] bg-black rounded-xl border border-gray-300 dark:border-gray-600">
                                <img src={image} key={index} 
                                     className="aspect-square object-scale-down rounded-xl relative"/>
                            </div>
                        ))}
                    </div> */}

                    <div className="flex flex-col">
                        <KeyWordItem {...{keywords}} />
                        <div className="pt-2 flex justify-between items-center">
                            <LikeButton {...{isFavorited, bulletDocID}} />
                            <div className="flex flex-col text-right">
                                <time className="text-sm text-gray-400">{timeStr}</time>
                                <Location />
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        </ul>
    )
  }
  
  export default NoteItem;