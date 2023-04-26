import { BsArrowLeft } from 'react-icons/bs';
import { useParams, Link } from 'react-router-dom';
import useUserPublicBullets, { PublicNoteBullet } from '../hooks/usePublicUserBullets';
import PublicBoardNoteItem from '../components/Feed/FeedNoteItem/PublicBoardFeedNoteItem';
import useTheme from '../hooks/useTheme';
import React from 'react';

const UserPublicBoard: React.FC = () => {
    const params = useParams();
    const userID = params.userID;
    const { publicBullets } = useUserPublicBullets(userID);
    useTheme(); // listen to preferred theme on system

    return (
        <div className={'min-h-screen h-max dark:bg-gray-800 py-2 flex flex-col gap-6 select-none'}>
            {/* HEADER */}
            <div className="flex justify-between text-black dark:text-white px-4">
                <Link to="/">
                    <BsArrowLeft size={20} />
                </Link>
                <h1 className="text-xl font-bold text-black dark:text-white justify-end">{userID} Public Board</h1>
            </div>

            {/* OVERFLOW DIV */}
            <ol
                className="bg-white dark:bg-gray-800 w-full sm:w-1/2 xl:w-2/5 mx-auto
                  scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-track-gray-700"
            >
                {publicBullets?.map((bullet: PublicNoteBullet, index: number) => (
                    <PublicBoardNoteItem key={index} {...bullet} />
                ))}
            </ol>
        </div>
    );
};

export default UserPublicBoard;
