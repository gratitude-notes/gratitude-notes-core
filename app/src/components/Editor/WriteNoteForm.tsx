import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { CharacterLimitPlugin } from '@lexical/react/LexicalCharacterLimitPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { HeadingNode } from '@lexical/rich-text';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { ListItemNode, ListNode } from '@lexical/list';
import { OverflowNode } from '@lexical/overflow';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import React, { useEffect, useRef, useState } from 'react';
import { BsArrowLeft } from "react-icons/bs";
import EditorToolbar from './EditorToolbar';
import { EditorState } from 'lexical';
import { addDoc, collection, Timestamp, setDoc, updateDoc } from '@firebase/firestore';
import { NoteBullet } from '../../hooks/useUserBullets';
import { useSession } from '../../lib/Session';
import { fb_firestore } from '../../lib/Firebase';
import { ViewState } from '../../pages/Dashboard';
import FileUploader from './DragDrop';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";



type FormHandlerProps = {
    updateViewState: (state: ViewState) => void
}

const composeBullet = (bulletJSON: string, score: number, timestamp: Timestamp, keywords: string[], isFavorited: boolean, images: string[]): NoteBullet => {
    return { bulletJSON, score, timestamp, keywords, isFavorited, images }
}

const WriteNoteForm: React.FC<FormHandlerProps> = ({updateViewState}) => {

    const [files, setFiles] = useState<File[]>([]);
    const [filePreviews, setFilePreviews] = useState<(string | null)[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const storage = getStorage();
    const session = useSession();
    const bulletId = 

    useEffect(() => {
        const previews = files.map((file) =>
          file.type.startsWith("image/") ? URL.createObjectURL(file) : null
        );
        setFilePreviews(previews);
    
        return () => {
          previews.forEach((preview) => {
            if (preview) {
              URL.revokeObjectURL(preview);
            }
          });
        };
      }, [files]);


    const initialConfig = {
        namespace: "noteEditor",
        theme: {
            paragraph: "text-black dark:text-white", // Change text color based on color theme
            text: {
                underline: "underline",
                bold: "font-bold",
                italic: "italic"
            },
            list: {
                ul: "ml-4 list-disc text-black dark:text-white",
                listitem: "mt-1 mb-1 ml-6 mr-6"
            },
            heading: {
                h1: "text-4xl text-black dark:text-white",
                h2: "text-2xl text-black dark:text-white"
            },
            characterLimit: 'bg-red-400'
        },
        nodes: [ListNode, ListItemNode, HeadingNode, OverflowNode],
        onError(error: Error) {
            throw error;
        },
    }

    const editorStateRef = useRef<EditorState>();

    const onSubmit = async () => {
        const newBullet = composeBullet(JSON.stringify(editorStateRef.current), 5, Timestamp.now(), [], false, []);
        if (session && session.user) {
            const bulletCollectionRef = collection(fb_firestore, "users", session.user.uid, "notes");
            const newBulletDocRef = await addDoc(bulletCollectionRef, newBullet);
            await setDoc(newBulletDocRef, {bulletDocID: newBulletDocRef.id}, {merge: true});
            
            
            // files.forEach(async (file) => {
            //     await uploadFilesToFirebase(file, newBulletDocRef);
            // });
            const downloadURLs = await Promise.all(files.map(async (file) => uploadFilesToFirebase(file, newBulletDocRef)))

            // Update the document with the array of URLs
            await updateDoc(newBulletDocRef, { images: downloadURLs });
            console.log(bulletCollectionRef);
            
            
        }
        updateViewState("Home");
    }

    // const uploadFilesToFirebase = async (file: File, newBulletDocRef: any) => {
    //     try {
    //       console.log(session)
    //       //const user = session? user
    //       const user = session ? session.user : null;
    //       //const storageRef = ref(storage, `/users/${user?.uid}`);
    //       const storageRef = ref(storage, `/users/${user?.uid}/${newBulletDocRef.id}/${file.name}`);
    //       const uploadTask = uploadBytesResumable(storageRef, file);
    
    //       uploadTask.on('state_changed',
    //         (snapshot) => {
    //           // Handle the progress of the upload
    //         },
    //         (error) => {
    //           console.error("Error uploading files:", error);
    //         },
    //         async () => {
    //           const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

    //           console.log("File uploaded to Firebase Storage:", file.name, "URL:", downloadURL);
    //           resolve(downloadURL);
    //         }
    //       );
    //     } catch (error) {
    //       console.error("Error uploading file:", error);
    //     }
    //   };

    const uploadFilesToFirebase = async (file: File, newBulletDocRef: any) => {
        try {
          console.log(session);
          const user = session ? session.user : null;
          const storageRef = ref(storage, `/users/${user?.uid}/${newBulletDocRef.id}/${file.name}`);
          const uploadTask = uploadBytesResumable(storageRef, file);
      
          return new Promise<string>((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                // Handle the progress of the upload
              },
              (error) => {
                console.error("Error uploading files:", error);
                reject(error);
              },
              async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                console.log("File uploaded to Firebase Storage:", file.name, "URL:", downloadURL);
                resolve(downloadURL);
              }
            );
          });
        } catch (error) {
          console.error("Error uploading file:", error);
          throw error;
        }
      };
      
    
    
      const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
          const newFiles = Array.from(event.target.files);
          setFiles([...files, ...newFiles]);
      
          // Upload new files to Firebase Storage
          //newFiles.forEach(uploadFilesToFirebase);
        }
      };
    
      const removeFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
      };
    
        
    return (
        <div className="flex flex-col text-black dark:text-white">
            <div className="h-14 flex justify-between py-2 px-4 text-black dark:text-white">
                <button onClick={() => updateViewState("Home")} className=""><BsArrowLeft size={20}/></button>
                <button onClick={onSubmit} className="font-bold text-white bg-cyan-500 rounded-full px-6">Write</button>
            </div>
            <div className="px-2 flex-grow bg-white dark:bg-gray-800">
                 <LexicalComposer {...{initialConfig}}>
                    <EditorToolbar />
                    <div className="relative">
                        <RichTextPlugin 
                                    contentEditable={
                                        <ContentEditable className="min-h-[100px] max-h-[200px] overflow-y-scroll outline-none
                                                                    scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-track-gray-700" />
                                    }
                                    placeholder={
                                        <div className="absolute top-0 text-gray-400 pointer-events-none">
                                            Write your thoughts here...
                                        </div>
                                    }
                                    ErrorBoundary={LexicalErrorBoundary}/>
                        <hr className="h-px bg-gray-200 border-0 dark:bg-gray-600"/>
                        <div className="absolute right-0 text-gray-400">
                            <CharacterLimitPlugin charset={"UTF-8"} maxLength={300} />
                        </div>
                    </div>
                    <ListPlugin />
                    <div id="hello"> 
                        <div className="bg-white rounded w-9/12 mx-auto">
                        <div className="relative flex flex-col p-4 text-gray-400 border border-pink-grey rounded">
                            <input
                            accept="image/*"
                            type="file"
                            multiple
                            className="absolute inset-0 z-50 w-full h-full p-0 m-0 outline-none opacity-0 cursor-pointer"
                            onChange={onFileInputChange}
                            ref={fileInputRef}
                            />
                            <div className="flex flex-col items-center justify-center py-10 text-center">
                            <svg className="w-6 h-6 mr-1 text-current-50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="m-0">Drag your image files here or click in this area.</p>
                            </div>

                            {files.length > 0 && (
                            <div className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-6">
                                {files.map((file, index) => (
                                <div
                                    key={index}
                                    className="relative flex flex-col items-center overflow-hidden text-center bg-gray-100 border border-gray-200 rounded cursor-move select-none"
                                    style={{ paddingTop: "100%" }}
                                >
                                    <button
                                    className="absolute top-0 right-0 z-50 p-1 bg-white rounded-bl focus:outline-black"
                                    type="button"
                                    onClick={() => removeFile(index)}
                                    >
                                    <svg
                                        className="w-4 h-4 text-gray-700"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                    </svg>
                                    </button>
                                    {file.type.startsWith("image/") && (
                                    <img
                                        src={filePreviews[index] || ""}
                                        alt={file.name}
                                        className="absolute inset-0 z-0 object-cover w-full h-full border-4 border-white"
                                        />
                                    )}
                                    <div className="absolute bottom-0 left-0 right-0 flex flex-col p-2 text-xs bg-white bg-opacity-50">
                                        <span className="w-full font-bold text-gray-900 truncate">
                                        {file.name}
                                        </span>
                                        <span className="text-xs text-gray-900">
                                        {file.size} bytes
                                        </span>
                                    </div>
                                    </div>
                                ))}
                                </div>
                            )}
                            </div>
                        </div>
                    </div>
                    <HistoryPlugin />
                    <OnChangePlugin onChange={(editorState: EditorState) => editorStateRef.current = editorState } />
                 </LexicalComposer>
            </div>
        </div>
    )
}

export default WriteNoteForm;

