import React, { useEffect, useRef, ReactElement, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { Cluster, MarkerClusterer } from "@googlemaps/markerclusterer";
import useUserBullets, { NoteBullet } from "../../hooks/useUserBullets";
import SadEmoji from "../../assets/emojis/sad_emoji.png";
import SlightlySadEmoji from "../../assets/emojis/slightly_sad_emoji.png";
import NeutralEmoji from "../../assets/emojis/neutral_emoji.png";
import SlightlyHappyEmoji from "../../assets/emojis/slightly_happy_emoji.png";
import HappyEmoji from "../../assets/emojis/happy_emoji.png";
import { ViewState } from '../../pages/Dashboard';


const render = (status: Status) => {
  console.log("rendering", status)
  return <h1>{status}</h1>;
};



type MyMapComponentProps = {
  userBullets: NoteBullet[] | null,
  center: google.maps.LatLngLiteral,
  zoom: number,
  markerPositions: google.maps.LatLngLiteral[], 
  
}

// interface MyMarkerClustererOptions extends google.maps.MarkerClustererOptions {
//   calculator: (markers: google.maps.Marker[]) => { text: string, score: number };
// }

const MyMapComponent: React.FC<MyMapComponentProps> = ({userBullets, center, zoom, markerPositions}) => {
    const ref = useRef<HTMLDivElement>(null);
    const markersRef = useRef<google.maps.Marker[]>([]);

    const icons: Record<number, { icon: string }> = {
      "-2": {
        icon: SadEmoji,
      },
      "-1": {
        icon: SlightlySadEmoji,
      },
      "0": {
        icon: NeutralEmoji,
      },
      "1": {
        icon: SlightlyHappyEmoji,
      },
      "2": {
        icon: HappyEmoji,
      },
    };
  
    useEffect(() => {
      if (ref.current) {
        const map = new window.google.maps.Map(ref.current, {
          center,
          zoom,
          streetViewControl: false,
        });
  
        const infoWindow = new google.maps.InfoWindow({
          content: "",
          disableAutoPan: true,
        });

        console.log(userBullets)
  
        //Create content strings array
        const contentStrings = userBullets ? userBullets.map((element, i) => {

           let bid: string = element.bulletDocID ?? ""
            
            let str: string = element.bulletTextContent;
            if (str.length > 100) str = str.substring(0,100) + "...";

            const date = element?.timestamp.toDate();
            const month = date.getMonth() + 1
            const day = date.getDate();
            const year = date.getFullYear();
            const hour = date.getHours() % 12 || 12;
            const minute = date.getMinutes();
            const amOrPm = date.getHours() >= 12 ? 'PM' : 'AM';

            const timeStr = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year.toString()} • ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${amOrPm}`;

            function myFunction() {
              console.log("hello")
            }

            google.maps.event.addListener(infoWindow, 'domready', () => {
              const button = document.getElementById(bid);
              if (button) {
                button.addEventListener('click', () => {
                  console.log(bid)
                });
              }
            });
            

            return `<div id="content" style="width: 300px">` +
            `</div>` +
            // `<h1 id="firstHeading"><b>Location</b></h1>` +
            `<p style="overflow: hidden;"><b>${str}</b></p>` +
            `<img src=${icons[element.score ?? 0]?.icon} style="width:20px; display: block; margin-left: auto; margin-right: 0;"></img>` +
            `<p style="text-align: right">${timeStr}</p>` +
            `<p style="text-align: right">${element?.bulletAddress}</p>` +
            `<button id="${bid}">View Note</button>` +
            `</div>`;

          
          }) : [];

        



          
  
        // Loop through the markerPositions array and create a marker for each position
        //const markers = markerPositions.map((position, i) => {
        const markers = userBullets?.map((bullet, i) => {
          const marker = new google.maps.Marker({
            position: {
              lat: bullet.bulletLatitude ?? 0,
              lng: bullet.bulletLongitude ?? 0,
            },
            icon: {
              url: icons[bullet.score ?? 0]?.icon,
              scaledSize: new google.maps.Size(40, 40), // adjust size as needed
            },
          });
  
          marker.addListener("click", () => {
            // Set the content of the info window with the corresponding content string
            
            infoWindow.setContent(contentStrings[i]);
  
            // Open the info window
            infoWindow.open(map, marker);
  
          });
  
          return marker;
        });

        // var renderer = {render: ({ count, position }) => {
        //   var mark = new google.maps.Marker({
        //     label: { text: String(count), color: "white", fontSize: "15px", fontWeight: "bold", textAlign: "center", width: "100%"},
        //       icon: SadEmoji,
        //       position: position,
        //       map: this.map,
        //       // adjust zIndex to be above other markers
        //       zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
        //     });
        //     mark.addListener("click", () => {
        //       console.log("markmarkmarkmark");
        //       map.setZoom(16);
        //     });
        
        //     return mark;
        //   }
        // };
        
        // new arkerClusterer.MarkerClusterer({
        //   map,
        //   markers,
        //   renderer,
        // });
  
        new MarkerClusterer({ markers, map });
        



        
      }
      return () => {
        markersRef.current.forEach((marker) => marker.setMap(null));
      };
    }, [userBullets, center, zoom, markerPositions]);
  
    return <div ref={ref} id="map" className="w-full h-full" />;
  }
  


const Map: React.FC = () => {
  const center = { lat: 39.8283, lng:  -98.5795 };
  const zoom = 4;
  const { bullets } = useUserBullets("PastWeek");
  const locations: google.maps.LatLngLiteral[] = [];

  bullets?.forEach((bullet) => {
    locations.push({
      lat: bullet.bulletLatitude?? 0,
      lng: bullet.bulletLongitude?? 0,
    });
});
  

  function Home(state: "Home" | "Write" | "Settings" | "Week Review" | "Edit Public Board"): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="h-full">
      <Wrapper apiKey={import.meta.env.VITE_GCP_MAPS_API_KEY} render={render}>
        <MyMapComponent userBullets={bullets} center={center} zoom={zoom} markerPositions={locations}/>
      </Wrapper>
    </div>
  );
};

export default Map;
