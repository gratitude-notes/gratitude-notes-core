import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { fb_auth } from '../../lib/Firebase';
import React from 'react';

const SignInButton = () => {
    const handleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/userinfo.email');

        await signInWithPopup(fb_auth, provider);
    };

    return (
        <button onClick={handleClick} className="px-4 py-2 text-white bg-cyan-500 rounded-full text-md">
            Sign In
        </button>
    );
};

export default SignInButton;
