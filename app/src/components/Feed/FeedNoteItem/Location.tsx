// import { useState } from 'react';
// import { BsHeart, BsHeartFill } from 'react-icons/bs';

// const Location: React.FC = () => {
//   const [isFilled, setIsFilled] = useState(false);

// //   const handleWriteButton = () => {
// //     (writeModalVisible.isComponentVisible) ? writeModalVisible.setComponentVisible(false) : writeModalVisible.setComponentVisible(true);
// //   }

//   //This is a built in feature in most browsers 
//     const locate = () => {
//         if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(position);
//         } else {
//         console.log("Geolocation is not supported by this browser.");
//         }
//     }
  
//   const position = (pos: { coords: { latitude: any; longitude: any; }; }) => {
//     const lat = pos.coords.latitude;
//     const lon = pos.coords.longitude;
//     console.log("Latitude: " + lat + ", Longitude: " + lon);
//     Address(lat, lon);
//   }

// //Api call is done only after we know the lat and lon
//   async function Address(lat: any, lon: any) {
//     const response = await fetch(
//       `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
//     );
//     console.log(" response" + response)
//   };

//   return (
//     <>
//       {isFilled ? (
//         <button
//           className="text-white font-bold"
//           onClick={() => setIsFilled(false)}
//         >
//           <BsHeartFill className="inline-block fill-pink-600" />
//         </button>
//       ) : (
//         <button
//           className="text-pink-500 font-bold"
//           onClick={() => setIsFilled(true)}
//         >
//           {!isFilled && <BsHeart className="inline-block" />}
//         </button>
//       )}
//     </>
//   );
// }

// export default Location;

import { useEffect, useState } from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

const Location: React.FC = () => {
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        address(position.coords.latitude, position.coords.longitude)

    })
  })

  //Api call is done only after we know the lat and lon
  async function address(lat: any, lon: any) {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
    );
    console.log(" response" + response)
  };


  return (
    <>
      <div>
        <h1></h1>
      </div>
    </>
  );
}

export default Location;