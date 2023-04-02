import { useState, useRef, useEffect } from "react";

const EditorImageDropzone: React.FC<{localImages: File[], setLocalImages: React.Dispatch<React.SetStateAction<File[]>>}> = ({localImages, setLocalImages}) => {

  const [imagePreviews, setImagePreviews] = useState<(string | null)[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    
    const fetchImagePreviews = (localImages: File[]) => {
      const previews = localImages.map((localImageFile) =>
        localImageFile.type.startsWith("image/") ? URL.createObjectURL(localImageFile) : null
      );

      return previews;
    }
    
    setImagePreviews(fetchImagePreviews(localImages));

    const cleanupPreviews = () => {
      imagePreviews.forEach((preview) => {
        if (preview) {
          URL.revokeObjectURL(preview);
        }
      });
    }

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
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) {
      return "0 Byte";
    }

    const sizeIdentifcationIndex = Math.floor(Math.log(bytes) / Math.log(1024));

    return Math.round(bytes / Math.pow(1024, sizeIdentifcationIndex)) + " " + sizes[sizeIdentifcationIndex];
  };

  const onAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newImages = Array.from(event.target.files);
      setLocalImages([...localImages, ...newImages]);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-600 rounded w-9/12 mx-auto mt-5">
      <div className="relative flex flex-col p-4 text-gray-400 border border-pink-grey rounded">
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
          <div className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-6">
            {localImages.map((localImage, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center overflow-hidden text-center bg-gray-100 border border-gray-200 rounded cursor-move select-none"
                style={{ paddingTop: "100%" }}
              >
                <button
                  className="absolute top-0 right-0 z-50 p-1 bg-white rounded-bl focus:outline-black"
                  type="button"
                  onClick={() => removeImage(index)}
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
      </div>
      );
    };
    
export default EditorImageDropzone;
