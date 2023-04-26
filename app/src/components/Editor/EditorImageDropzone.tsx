import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { BsTrash } from 'react-icons/bs';

const EditorImageDropzone: React.FC<{
    localImages: File[];
    setLocalImages: React.Dispatch<React.SetStateAction<File[]>>;
}> = ({ localImages, setLocalImages }) => {
    const [imagePreviews, setImagePreviews] = useState<(string | null)[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {

    const fetchImagePreviews = (localImages: File[]) => {
            const previews = localImages.map(localImageFile =>
                localImageFile.type.startsWith('image/') ? URL.createObjectURL(localImageFile) : null
            );

            return previews;
        };


    setImagePreviews(fetchImagePreviews(localImages));

        const cleanupPreviews = () => {
            imagePreviews.forEach(preview => {
                if (preview) {
                    URL.revokeObjectURL(preview);
                }
            });
        };

        return cleanupPreviews;
    }, [localImages]);

    const removeImage = (index: number) => {
        const newLocalImages = [...localImages];
        newLocalImages.splice(index, 1);
        setLocalImages(newLocalImages);

        const newImagePreviews = [...imagePreviews];
        newImagePreviews.splice(index, 1);
        setImagePreviews(newImagePreviews);
    };

    const convertBytesToHumanReadable = (bytes: number) => {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) {
            return '0 Byte';
        }

        const sizeIdentifcationIndex = Math.floor(Math.log(bytes) / Math.log(1024));

        return Math.round(bytes / Math.pow(1024, sizeIdentifcationIndex)) + ' ' + sizes[sizeIdentifcationIndex];
    };

    const onAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newImages = Array.from(event.target.files);
            setLocalImages([...localImages, ...newImages]);
        }
    };

    return (
        <>
            {/* IMAGE DROPZONE */}
            <div className="bg-white dark:bg-gray-800 rounded w-9/12 mx-auto shadow-lg shadow-gray-400 dark:shadow-gray-900">
                <div className="relative flex flex-col px-2 text-gray-400 border border-black dark:border-gray-600 rounded">
                    <input
                        accept="image/*"
                        type="file"
                        multiple
                        onChange={onAddImage}
                        className="absolute inset-0 z-50 w-full h-full p-0 m-0 outline-none opacity-0 cursor-pointer"
                        ref={fileInputRef}
                    />
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                        <svg
                            className="w-6 h-6 mr-1"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <p>Drag your image files here or click in this area.</p>
                    </div>
                </div>
            </div>

            {/* PREVIEW IMAGES */}
            {localImages.length > 0 && (
                <div
                    className="flex gap-2 px-2 pt-4 sm:justify-center overflow-x-auto
                          scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-track-gray-700"
                >
                    {localImages.map((localImage, index) => (
                        <div
                            key={index}
                            className="h-[125px] aspect-square relative flex flex-col items-center text-center"
                        >
                            <button
                                className="absolute top-0 right-0 z-50 p-1 bg-white dark:bg-gray-800 rounded-bl rounded-tr border border-black dark:border-gray-600"
                                type="button"
                                onClick={() => removeImage(index)}
                            >
                                <BsTrash size={15} className="text-black dark:text-white" />
                            </button>
                            {localImage.type.startsWith('image/') && (
                                <img
                                    src={imagePreviews[index] || ''}
                                    alt={localImage.name}
                                    className="absolute inset-0 z-0 object-cover w-full h-full rounded border border-black dark:border-gray-600"
                                />
                            )}
                            <div className="absolute bottom-0 left-0 right-0 flex flex-col px-1 text-xs bg-white dark:bg-gray-800 bg-opacity-50 dark:bg-opacity-50 rounded-b">
                                <span className="w-full font-bold text-black dark:text-gray-200 truncate">
                                    {localImage.name}
                                </span>
                                <span className="text-xs text-black dark:text-gray-400">
                                    {convertBytesToHumanReadable(localImage.size)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default EditorImageDropzone;

{
    /* <div className="bg-white dark:bg-gray-800 rounded w-9/12 mx-auto mt-5 shadow-lg shadow-gray-400 dark:shadow-gray-900">
      <div className="relative flex flex-col p-4 text-gray-400 border border-gray-600 rounded">
        <input
          accept="image/*"
          type="file"
          multiple
          onChange={onAddImage}
          className="absolute inset-0 z-50 w-full h-full p-0 m-0 outline-none opacity-0 cursor-pointer"
          ref={fileInputRef}
        />

        <div className="flex flex-col items-center justify-center py-10 text-center">
          <svg className="w-6 h-6 mr-1 text-current-50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="m-0">Drag your image files here or click in this area.</p>
        </div>

        {localImages.length > 0 && (
          <div className="h-[150px] grid grid-cols-2 gap-4 mt-4 sm:grid-cols-4 border border-red-500 overflow-y-auto">
            {localImages.map((localImage, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center overflow-hidden text-center bg-gray-100 border border-gray-200 rounded cursor-move select-none"
                style={{ paddingTop: "100%" }}
              >
                <button
                  className="absolute top-0 right-0 z-50 p-1 bg-white rounded-bl"
                  type="button"
                  onClick={() => removeImage(index)}>
                  <BsTrash size={15} color="black"/>
                </button>
                {localImage.type.startsWith("image/") && (
                  <img
                    src={imagePreviews[index] || ""}
                    alt={localImage.name}
                    className="absolute inset-0 z-0 object-cover w-full h-full border-4 border-white"
                    />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 flex flex-col p-2 text-xs bg-white bg-opacity-50">
                    <span className="w-full font-bold text-gray-900 truncate">
                      {localImage.name}
                    </span>
                    <span className="text-xs text-gray-900">
                      {convertBytesToHumanReadable(localImage.size)}
                    </span>
                  </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div> */
}
