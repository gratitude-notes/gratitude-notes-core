import { useEffect, useState } from 'react';

const Location: React.FC = () => {
  
  const [address, setAddress] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        getAddress(position.coords.latitude, position.coords.longitude)

    })
  })

  //Api call is done only after we know the lat and lon
  async function getAddress(lat: any, lon: any) {
    var requestOptions = {
        method: 'GET',
      };
      
      fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=2ac0437264654f16bdf7539671e4986e`, requestOptions)
        .then(response => response.json())
        .then(result => {
            //console.log(result.features[0].properties.city, result.features[0].properties.state_code)
            setAddress(`${result.features[0].properties.city}, ${result.features[0].properties.state_code}`);
        })
        .catch(error => console.log('error', error));
  };


  return (
    <>
      <div className='absolute bottom-4 right-0'>
        <h1 className='text-gray-400'>{address}</h1>
      </div>
    </>
  );
}

export default Location;