import { BsClipboard, BsShare } from 'react-icons/bs';
import { Share } from '@capacitor/share';
import { Device } from '@capacitor/device';
import { Clipboard } from '@capacitor/clipboard';
import toast from 'react-hot-toast';
import { Timestamp } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

type ShareButtonProps = {
    shareText: string
    shareDate: Timestamp,
    shareAddress: string | null
}

const ShareButton: React.FC<ShareButtonProps> = ({ shareText, shareDate, shareAddress }) => {
    const [shareButtonIcon, setShareButtonIcon] = useState<JSX.Element>(<BsClipboard size={15} />);
    const [shareAPI, setShareAPI] = useState<boolean>(false);

    const onClickShareButton = async () => {
        const deviceInfo = await Device.getInfo();

        const shareDateStr = shareDate.toDate().toLocaleString(
            'en-US',
            { month: '2-digit', day: '2-digit', year: 'numeric' }
        );

        const shareTimeStr = shareDate.toDate().toLocaleString(
            'en-US',
            { hour: 'numeric', minute: '2-digit', hour12: true }
        );

        const shareFormattedTime = `${shareDateStr} • ${shareTimeStr}`;
        const shareFormattedText = shareText.trim();
        const shareFormattedAddress = (shareAddress) ? `${shareAddress.trim()}\n` : '';
        const shareString = `${shareFormattedText}\n\n${shareFormattedTime}\n${shareFormattedAddress}\nShared via DOSE. - https://dosehappiness.com/`;

        const ShareAPIAvailability = await Share.canShare();

        if (deviceInfo.platform === 'web' || !ShareAPIAvailability) {
            setShareAPI(false);
            await Clipboard.write({
                string: shareString
            });
            toast.success('Copied to clipboard!');
        } else {
            setShareAPI(true);
            await Share.share({
                title: 'Share your note with someone!',
                text: shareText,
                url: 'https://dosehappiness.com/',
                dialogTitle: 'Share your note with someone!'
            });
        }
    }

    useEffect(() => {
        const getShareButtonIcon = async () => {
            const deviceInfo = await Device.getInfo();
            if (deviceInfo.platform === 'web') {
                setShareButtonIcon(<BsClipboard size={15} />);
            } else {
                setShareButtonIcon(<BsShare size={15} />);
            }
        }

        getShareButtonIcon();
    }, []);

    return (
        <button onClick={onClickShareButton} className={clsx(shareAPI ? "hover:bg-green-700 hover:bg-opacity-20 hover:text-green-500 p-2 hover:rounded-full" : "hover:bg-orange-700 hover:bg-opacity-20 hover:text-orange-500 p-2 hover:rounded-full")}>
            {shareButtonIcon}
        </button>
    );
}

export default ShareButton;