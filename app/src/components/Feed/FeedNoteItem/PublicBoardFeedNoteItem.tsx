import KeyWordItem from './KeyWordItem';
import Reader from './Reader';
import ImageViewer from './ImageViewer';
import Location from './Location';
import useComponentVisible from '../../../hooks/useComponentVisible';
import EmojiScore from './EmojiScore';
import ShareButton from './ShareButton';
import { PublicNoteBullet } from '../../../hooks/usePublicUserBullets';
import React from 'react';

const PublicBoardNoteItem: React.FC<PublicNoteBullet> = ({
    bulletJSON,
    keywords,
    score,
    timestamp,
    isFavorited,
    isPublic,
    bulletDocID,
    images,
    bulletAddress,
}) => {
    const date = timestamp.toDate();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const hour = date.getHours() % 12 || 12;
    const minute = date.getMinutes();
    const amOrPm = date.getHours() >= 12 ? 'PM' : 'AM';

    const timeStr = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year.toString()} • ${hour
        .toString()
        .padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${amOrPm}`;

    const displaySlider = useComponentVisible(false); // if false, images slider not active, if true, images slider active

    return (
        <div className="relative border-b border-gray-400">
            <div className="flex flex-col px-4 py-2">
                <Reader noteJSON={bulletJSON} />

                {/* IMAGES */}
                <div ref={displaySlider.ref} className="w-[300px] mx-auto">
                    <ImageViewer {...{ displaySlider, images }} />
                </div>

                <div className="flex flex-col">
                    <KeyWordItem {...{ keywords }} />
                    <div className="flex justify-between text-black dark:text-white">
                        <div className="flex flex-col ml-auto mr-0 text-right">
                            <EmojiScore emojiScore={score} />
                            <time className="text-sm text-gray-400">{timeStr}</time>
                            <Location address={bulletAddress} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicBoardNoteItem;
