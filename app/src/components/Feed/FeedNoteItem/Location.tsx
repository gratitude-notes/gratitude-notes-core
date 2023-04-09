import { useEffect, useState } from 'react';

const Location: React.FC = () => {
  
  const [address, setAddress] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
        // console.log("Latitude is :", position.coords.latitude);
        // console.log("Longitude is :", position.coords.longitude);
        getAddress(position.coords.latitude, position.coords.longitude)

    })
  })

  //Api call is done only after we know the lat and lon
  async function getAddress(lat: any, lon: any) {
      let requestOptions = {
        method: 'GET',
      };
      
      const response = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=2ac0437264654f16bdf7539671e4986e`, requestOptions);
      const { features } = await response.json();
      setAddress(`${features[0].properties.city}, ${features[0].properties.state_code}`)
  }


  return (
    <>
      <h1 className='text-sm text-gray-400'>{address}</h1>
    </>
  );
}

export default Location;