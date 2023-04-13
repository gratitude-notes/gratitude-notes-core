import { BsShare } from 'react-icons/bs';
import { Share } from '@capacitor/share'

type ShareButtonProps = {
  shareText: string
}

const ShareButton: React.FC<ShareButtonProps> = ({shareText}) => {
  const onClickShareButton = async () => {
    await Share.share({
      title: 'Share your note with someone!',
      text: shareText,
      url: 'https://dosehappiness.com/',
      dialogTitle: 'Share your note with someone!'
    });
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