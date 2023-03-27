import { NoteBullet } from "../../../hooks/useUserBullets";
import DotMenu from "./DotMenu";
import KeyWordItem from "./KeyWordItem";
import LikeButton from "./LikeButton";
import Reader from "./Reader";

const NoteItem: React.FC<NoteBullet> = ({ bulletJSON, keywords, score, timestamp }) => {
    const date = timestamp.toDate();
    const month = date.getMonth() + 1
    const day = date.getDate();
    const year = date.getFullYear();
    const hour = date.getHours() % 12 || 12;
    const minute = date.getMinutes();
    const amOrPm = date.getHours() >= 12 ? 'PM' : 'AM';

    const timeStr = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year.toString()} • ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${amOrPm}`;
    return (
        <ul className="">
            <div className="min-w-full border-t border-b sm:border border-gray-400 hover:cursor-pointer">
                {/* Header */}
                <div className="relative">
                    <div className="absolute top-2 right-2">
                        <DotMenu />
                    </div>
                </div>

                {/* Main Content */}
                <div className="px-6 pt-6">
                    <div>
                        <Reader noteJSON={bulletJSON}/>
                    </div>
                    <div className="py-2">
                        <KeyWordItem {...{keywords}} />
                    </div>
                </div>

                {/* Footer */}
                <div className="relative px-6 pt-2 pb-6">
                    <div className="absolute bottom-2 left-6">
                        <LikeButton />
                    </div>
                    <div className="absolute bottom-2 right-2">
                        <time className="text-sm text-gray-400">{timeStr}</time>
                    </div>
                </div>
            </div>
        </ul>
    )
  }
  
  export default NoteItem;