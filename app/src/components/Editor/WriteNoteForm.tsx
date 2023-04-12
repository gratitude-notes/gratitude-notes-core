import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { HeadingNode } from '@lexical/rich-text';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { ListItemNode, ListNode } from '@lexical/list';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import React, { useRef, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import EditorToolbar from './EditorToolbar';
import { $getRoot, EditorState } from 'lexical';
import {
  addDoc,
  collection,
  Timestamp,
  setDoc,
  updateDoc,
} from '@firebase/firestore';
import { NoteBullet } from '../../hooks/useUserBullets';
import { useSession } from '../../lib/Session';
import { fb_firestore, fb_storage } from '../../lib/Firebase';
import { ViewState } from '../../pages/Dashboard';
import EditorImageDropzone from './EditorImageDropzone';
import toast from 'react-hot-toast';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import SpeechToTextPlugin from './plugins/SpeechToTextPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import EditorSpeechToTextButton from './EditorSpeechToTextButton';
import EmojiPicker from './EmojiScorePicker';
import { useSettings } from '../../lib/Settings';

type FormHandlerProps = {
  updateViewState: (state: ViewState) => void;
};

const WriteNoteForm: React.FC<FormHandlerProps> = ({ updateViewState }) => {
  const session = useSession();
  const settings = useSettings();

  const [localImages, setLocalImages] = useState<File[]>([]);
  const [emojiScore, setEmojiScore] = useState<number | null>(null);

  const initialConfig = {
    namespace: 'noteEditor',
    theme: {
      paragraph: 'text-black dark:text-white', // Change text color based on color theme
      text: {
        underline: 'underline',
        bold: 'font-bold',
        italic: 'italic',
      },
      list: {
        ul: 'ml-4 list-disc text-black dark:text-white',
        listitem: 'mt-1 mb-1 ml-6 mr-6',
      },
      heading: {
        h1: 'text-4xl text-black dark:text-white',
        h2: 'text-2xl text-black dark:text-white',
      },
      characterLimit: 'bg-red-400',
    },
    nodes: [ListNode, ListItemNode, HeadingNode],
    onError(error: Error) {
      throw error;
    },
  };

  const editorStateRef = useRef<EditorState>();

  const onSubmit = async () => {
    const editorTextContent = editorStateRef.current?.read(() => {
      return $getRoot().getTextContent();
    });

    if (!editorTextContent || editorTextContent === '') {
      toast.error('Note is Empty!');
      return;
    }

    const bulletLatLong = await getBulletLatLong();
    let bulletAddress = null;

    // Freezes Note Submission due to desync of geolocation permissions on-device & in-app.
    // This check works as when the in-app perms allow for geolocation, then bulletLatLong should be populated, and if otherwise, then a desync has occured
    if (settings?.geolocation) {
      if (bulletLatLong?.bulletLatitude && bulletLatLong?.bulletLongitude)
        bulletAddress = await fetchLocationName(bulletLatLong.bulletLatitude, bulletLatLong.bulletLongitude);
      else
        return;
    }

    const newBullet: NoteBullet = {
      bulletJSON: JSON.stringify(editorStateRef.current),
      score: emojiScore,
      timestamp: Timestamp.now(),
      images: [],
      keywords: [],
      isFavorited: false,
      isPublic: false,
      bulletTextContent: editorTextContent,
      ...bulletLatLong,
      bulletAddress,
    };
    
    try {
      if (session && session.user) {
        const bulletCollectionRef = collection(fb_firestore, 'users', session.user.uid, 'notes');
        const newBulletDocRef = await addDoc(bulletCollectionRef, newBullet);
        await setDoc(newBulletDocRef, { bulletDocID: newBulletDocRef.id }, { merge: true });

        const downloadURLs = await uploadImages(newBulletDocRef.id);
        await updateDoc(newBulletDocRef, { images: downloadURLs });

        toast.success('Note Submitted!');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error Submitting Note.');
    }

    updateViewState('Home');
  };

  const getEmojiScore = (score: number) => {
    emojiScore !== score ? setEmojiScore(score) : null;
  };

  const uploadImages = async (documentID: string) => {
    const uploadTasks = localImages.map(localImage =>
      uploadImage(localImage, documentID),
    );
    const imageURLs = await Promise.all(uploadTasks);

    return imageURLs;
  };

  const uploadImage = async (imageFile: File, documentID: string) => {
    try {
      if (session && session.user) {
        const storageRef = ref(
          fb_storage,
          `/users/${session.user.uid}/${documentID}/${imageFile.name}`,
        );
        const uploadResult = await uploadBytes(storageRef, imageFile);
        const uploadResultImageURL = await getDownloadURL(uploadResult.ref);

        return uploadResultImageURL;
      }
    } catch (error) {
      throw error;
    }
  };

  const getBulletLatLong = async () => {
    if (!settings?.geolocation || !navigator?.geolocation) {
      return {
        bulletLatitude: null,
        bulletLongitude: null
      };
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      return {
        bulletLatitude: position.coords.latitude,
        bulletLongitude: position.coords.longitude,
      }
    } catch (error) {
      if (error instanceof GeolocationPositionError)
        toast.error("Please accept the geolocation request or deny geolocation in your settings.")
      
      return {
        bulletLatitude: null,
        bulletLongitude: null,
      };
    }
  };

  const fetchLocationName = async (latitude: number, longitude: number) => {
    const repsonse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=locality&key=${import.meta.env.VITE_GCP_MAPS_API_KEY}`);
    const data = await repsonse.json();
    const formatted_address = data.plus_code.compound_code.split(' ').slice(1).join(' ');
    
    return formatted_address;
  }

  return (
    <div className="flex flex-col text-black dark:text-white">
      <div className="h-14 flex justify-between py-2 px-4 text-black dark:text-white">
        <button onClick={() => updateViewState('Home')} className="">
          <BsArrowLeft size={20} />
        </button>
        <button
          onClick={onSubmit}
          className="font-bold text-white bg-cyan-500 rounded-full px-6"
        >
          Write
        </button>
      </div>
      <div className="px-2 flex-grow bg-white dark:bg-gray-800">
        <LexicalComposer {...{ initialConfig }}>
          <EditorToolbar />
          <div className="relative">
            <RichTextPlugin
              contentEditable={
                <ContentEditable
                  className="min-h-[100px] max-h-[200px] overflow-y-scroll outline-none scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-track-gray-700"
                />
              }
              placeholder={
                <div className="absolute top-0 text-gray-400 pointer-events-none">
                  Write your thoughts here...
                </div>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
            <EditorSpeechToTextButton />
            <hr className="h-px bg-gray-200 border-0 dark:bg-gray-600" />
          </div>
          <SpeechToTextPlugin />
          <AutoFocusPlugin />
          <ListPlugin />
          <HistoryPlugin />
          <OnChangePlugin
            onChange={(editorState: EditorState) =>
              (editorStateRef.current = editorState)
            }
          />
        </LexicalComposer>
      </div>
      <EmojiPicker getEmojiScore={getEmojiScore} />
      <EditorImageDropzone {...{ localImages, setLocalImages }} />
    </div>
  );
};

export default WriteNoteForm;
