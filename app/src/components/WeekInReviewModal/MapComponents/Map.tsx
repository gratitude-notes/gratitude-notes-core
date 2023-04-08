import React, { useEffect, useRef, ReactElement } from "react";
import ReactDOM from "react-dom";
import { Wrapper, Status } from "@googlemaps/react-wrapper";


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

      // Loop through the markerPositions array and create a marker for each position
      const markers = markerPositions.map((position) => {
        return new window.google.maps.Marker({
          position,
          map,
        });
      });

      // Set the markersRef to the created markers
      markersRef.current = markers;
    }

    // Clean up function to remove the markers when component unmounts
    return () => {
      markersRef.current.forEach((marker) => marker.setMap(null));
    };
  }, [center, zoom, markerPositions]);

  return <div ref={ref} id="map" className="w-full h-full" />;
}



const Map: React.FC = () => {
  const center = { lat: 40.2732, lng: -76.8867 };
  const zoom = 5;
  const markerPositions = [
    { lat: 40.7128, lng: -74.006 },
    { lat: 34.0522, lng: -118.2437 },
    { lat: 41.8781, lng: -87.6298 },
    { lat: 39.7128, lng: -77.006 },
    { lat: 39.821, lng: -77.006 }
  ];

  return (
    <div className="h-full">
      <Wrapper apiKey={import.meta.env.VITE_GCP_MAPS_API_KEY} render={render}>
        <MyMapComponent center={center} zoom={zoom} markerPositions={markerPositions} />
      </Wrapper>
    </div>
  );
};

export default Map;
