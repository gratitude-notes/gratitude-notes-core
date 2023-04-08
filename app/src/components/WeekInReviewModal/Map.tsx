import React, { useEffect, useRef, ReactElement } from "react";
import ReactDOM from "react-dom";
import { Wrapper, Status } from "@googlemaps/react-wrapper";


const render = (status: Status) => {
  console.log("rendering", status)
  return <h1>{status}</h1>;
};

function MyMapComponent({
  center,
  zoom,
}: {
  center: google.maps.LatLngLiteral;
  zoom: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      new window.google.maps.Map(ref.current, {
        center,
        zoom,
      });
    }
  });

  return <div ref={ref} id="map" className="w-full h-full"/>;
}

const Map: React.FC = () => {
  const center = { lat: 40.2732, lng: -76.8867 };
  const zoom = 5;

  return (
    <div className="h-full">
      <Wrapper apiKey={import.meta.env.VITE_GCP_MAPS_API_KEY} render={render}>
        <MyMapComponent center={center} zoom={zoom} />
      </Wrapper>
    </div>
  );
}

export default Map;
