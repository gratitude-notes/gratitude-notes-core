import React, { useEffect, useRef, ReactElement } from "react";
import ReactDOM from "react-dom";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { MarkerClusterer } from "@googlemaps/markerclusterer";


const render = (status: Status) => {
  console.log("rendering", status)
  return <h1>{status}</h1>;
};


interface MyMapComponentProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
  markerPositions: google.maps.LatLngLiteral[];
}

function MyMapComponent({
  center,
  zoom,
  markerPositions,
}: MyMapComponentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    if (ref.current) {
      const map = new window.google.maps.Map(ref.current, {
        center,
        zoom,
      });
      const infoWindow = new google.maps.InfoWindow({
        content: "",
        disableAutoPan: true,
      });

      // Loop through the markerPositions array and create a marker for each position
      const markers = markerPositions.map((position, i) => {
        
        const marker = new google.maps.Marker({
            position,
          
        });

        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });
        return marker;
      });

      new MarkerClusterer({markers, map})

    }
    return () => {
      markersRef.current.forEach((marker) => marker.setMap(null));
    };
  }, [center, zoom, markerPositions]);

  return <div ref={ref} id="map" className="w-full h-full" />;
}



const Map: React.FC = () => {
  const center = { lat: 39.8283, lng:  -98.5795 };
  const zoom = 4;
  const locations = [
    { lat: 40.4406, lng: -79.9959 },
    { lat: 41.2401, lng: -77.0018 },
    { lat: 40.2732, lng: -76.8867 },
    { lat: 39.9526, lng: -75.1652 },
    { lat: 41.2033, lng: -77.1945 },
    { lat: 40.5187, lng: -80.2232 },
    { lat: 40.6364, lng: -79.1528 },
    { lat: 41.4080, lng: -75.6624 },
    { lat: 40.7982, lng: -77.8599 },
    { lat: 39.9674, lng: -75.1868 },
    { lat: 33.7490, lng: -84.3880 }, // Atlanta, GA
    { lat: 34.0522, lng: -118.2437 }, // Los Angeles, CA
    { lat: 41.8781, lng: -87.6298 }, // Chicago, IL
    { lat: 29.7604, lng: -95.3698 }, // Houston, TX
    { lat: 40.7128, lng: -74.0060 }, // New York, NY
    { lat: 39.7392, lng: -104.9903 }, // Denver, CO
    { lat: 37.7749, lng: -122.4194 }, // San Francisco, CA
    { lat: 33.4484, lng: -112.0740 }, // Phoenix, AZ
    { lat: 47.6062, lng: -122.3321 }, // Seattle, WA
    { lat: 25.7617, lng: -80.1918 } // Miami, FL
  ];
  

  return (
    <div className="h-full">
      <Wrapper apiKey={import.meta.env.VITE_GCP_MAPS_API_KEY} render={render}>
        <MyMapComponent center={center} zoom={zoom} markerPositions={locations} />
      </Wrapper>
    </div>
  );
};

export default Map;
