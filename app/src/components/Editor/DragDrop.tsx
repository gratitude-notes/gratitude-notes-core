import React, { useState, useRef, useEffect } from "react";
import styles from './FileUploader.module.css';

const FileUploader = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<(string | null)[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles([...files, ...Array.from(event.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded w-9/12 mx-auto">
      {/* <div className="relative flex flex-col p-4 text-gray-400 border border-gray-200 rounded"> */}
      <div className="relative flex flex-col p-4 text-gray-400 border border-pink-grey rounded">
        <input
          accept="image/*"
          type="file"
          multiple
          className="absolute inset-0 z-50 w-full h-full p-0 m-0 outline-none opacity-0 cursor-pointer"
          onChange={onFileInputChange}
          ref={fileInputRef}
        />
        {/* <div className="flex flex-col items-center justify-center py-10 text-center">
          <p className="m-0">Drag your files here or click in this area.</p>
        </div> */}
        <div className="flex flex-col items-center justify-center py-10 text-center border-pink-700">
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
      );
    };
    
    export default FileUploader;


// import React, { useState, useRef, useEffect } from "react";

// const FileUploader = () => {
//   const [files, setFiles] = useState<File[]>([]);
//   const inputRef = useRef<HTMLInputElement>(null);

//   const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFiles([...e.target.files]);
//     }
//   };

//   const filePreviews = files.map((file) => URL.createObjectURL(file));

//   useEffect(() => {
//     return () => {
//       filePreviews.forEach((url) => URL.revokeObjectURL(url));
//     };
//   }, [files]);

//   return (
//     <div className="bg-white p-7 rounded w-9/12 mx-auto">
//       <div className="relative flex flex-col p-4 text-gray-400 border border-gray-200 rounded">
//         <input
//           ref={inputRef}
//           accept="image/*"
//           type="file"
//           multiple
//           className="absolute inset-0 z-50 w-full h-full p-0 m-0 outline-none opacity-0 cursor-pointer"
//           onChange={handleFiles}
//         />
//         <div className="flex flex-col items-center justify-center py-10 text-center">
//           <svg className="w-6 h-6 mr-1 text-current-50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//           </svg>
//           <p className="m-0">Drag your image files here or click in this area.</p>
//         </div>
//         {files.length > 0 && (
//           <div className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-6">
//             {files.map((file, index) => (
//               <div key={index} className="relative flex flex-col items-center overflow-hidden text-center bg-gray-100 border rounded">
//                 {file.type.startsWith("image/") && (
//                   <img
//                     src={filePreviews[index]}
//                     alt={`Preview ${index}`}
//                     className="absolute inset-0 z-0 object-cover w-full h-full border-4 border-white"
//                   />
//                 )}
//                 <div className="absolute bottom-0 left-0 right-0 flex flex-col p-2 text-xs bg-white bg-opacity-50">
//                   <span className="w-full font-bold text-gray-900 truncate">
//                     {file.name}
//                   </span>
//                   <span className="text-xs text-gray-900">
//                     {file.size} bytes
//                   </span>
//                 </div>
//               </div>
//                    ))}
//                    </div>
//                  )}
//                </div>
//              </div>
// );
// };

// export default FileUploader;             
