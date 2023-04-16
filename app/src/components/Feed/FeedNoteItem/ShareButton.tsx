import { BsShare } from 'react-icons/bs';
import { Share } from '@capacitor/share';
import { Device } from '@capacitor/device';
import { Clipboard } from '@capacitor/clipboard';
import toast from 'react-hot-toast';
import { Timestamp } from '@firebase/firestore';

type ShareButtonProps = {
  shareText: string
  shareDate: Timestamp,
  shareAddress: string | null
}

const ShareButton: React.FC<ShareButtonProps> = ({ shareText, shareDate, shareAddress }) => {

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
    const shareString = `${shareFormattedText}\n\n${shareFormattedTime}\n${shareFormattedAddress}\nShared via DoseHappiness - https://dosehappiness.com/`;

    if (deviceInfo.platform === 'web') {
        await Clipboard.write({
            string: shareString
        });
        toast.success('Copied to clipboard!');
    } else {
        await Share.share({
            title: 'Share your note with someone!',
            text: shareText,
            url: 'https://dosehappiness.com/',
            dialogTitle: 'Share your note with someone!'
        });
    }


  }

  return (
    <>
      <button onClick={onClickShareButton} className="hover:bg-green-700 hover:bg-opacity-20 hover:text-green-500 p-2 hover:rounded-full">
        <BsShare size={15} />
      </button>
    </>
  );
}

export default ShareButton;