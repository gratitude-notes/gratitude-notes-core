import React, { useEffect, useRef, ReactElement } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import useUserBullets from "../../../hooks/useUserBullets";


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
    const userBullets = useUserBullets();
    console.log(userBullets.bullets)
  
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
  
        // Create content strings array
        const contentStrings = userBullets?.bullets ? userBullets.bullets.map((element, i) => {
            return `<div id="content">` +
            `</div>` +
            `<h1 id="firstHeading" class="firstHeading"><b>Location</b></h1>` +
            `<div id="bodyContent">` +
            `<p>Note: ${element.bulletTextContent}</p>` +
            `<p>Time: ${element?.timestamp}</p>` +
            `` +
            `<p>Score: ${element?.score}</p>` +
            `</div>`;
          }) : [];
  
        // Loop through the markerPositions array and create a marker for each position
        const markers = markerPositions.map((position, i) => {
          const marker = new google.maps.Marker({
            position,
          });
  
          marker.addListener("click", () => {
            // Set the content of the info window with the corresponding content string
            infoWindow.setContent(contentStrings[i]);
  
            // Open the info window
            infoWindow.open(map, marker);
  
          });
  
          return marker;
        });
  
        new MarkerClusterer({ markers, map });
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
