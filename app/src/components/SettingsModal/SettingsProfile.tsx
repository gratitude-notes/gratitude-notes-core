import React from 'react';
import { useSession } from '../../lib/Session';

const SettingsProfile: React.FC = () => {
    const session = useSession();

    return (
        <div className="sm:px-[100px] flex flex-wrap gap-4 text-black dark:text-white items-center justify-between">
            <div>
                <img
                    className="mx-auto rounded-full border-2 border-gray-400"
                    src={`${session?.user?.photoURL}`}
                    alt=""
                />
            </div>
            <div>
                <div className="flex flex-col gap-2">
                    <div>
                        <h1 className="whitespace-nowrap text-lg font-bold">Name</h1>
                        <h1 className="whitespace-nowrap text-sm font-semibold">{`${session?.user?.displayName}`}</h1>
                    </div>
                    <div>
                        <h1 className="whitespace-nowrap text-lg font-bold">Email</h1>
                        <h1 className="whitespace-nowrap text-sm font-semibold">{`${session?.user?.email}`}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsProfile;
