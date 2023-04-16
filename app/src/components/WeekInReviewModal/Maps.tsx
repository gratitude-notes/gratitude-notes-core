import React, { useEffect, useRef, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import useUserBullets, { NoteBullet } from "../../hooks/useUserBullets";
import { MarkerClusterer, MarkerClustererOptions } from "@googlemaps/markerclusterer";

import SadEmoji from "../../assets/emojis/sad_emoji.png";
import SlightlySadEmoji from "../../assets/emojis/slightly_sad_emoji.png";
import NeutralEmoji from "../../assets/emojis/neutral_emoji.png";
import SlightlyHappyEmoji from "../../assets/emojis/slightly_happy_emoji.png";
import HappyEmoji from "../../assets/emojis/happy_emoji.png";
import ProhibitedEmoji from "../../assets/emojis/prohibited_emoji.png";

import toast from "react-hot-toast";
import { useSettings } from "../../lib/Settings";

type MyMapComponentProps = {
    userBullets: NoteBullet[] | null,
    defaultZoom: number,
    markerPositions: google.maps.LatLngLiteral[],
}

const MyMapComponent: React.FC<MyMapComponentProps> = ({ userBullets, defaultZoom, markerPositions }) => {
    const [center, setCenter] = useState<google.maps.LatLngLiteral>({ lat: 39.8283, lng: -98.5795 }); // Default Center is US
    const [zoom, setZoom] = useState<number>(defaultZoom);
    const settings = useSettings();

    useEffect(() => {
        if (!navigator.geolocation || !settings?.geolocation) return;
        navigator.geolocation.getCurrentPosition((position) => {
            setCenter({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
            setZoom(8);
        }, (error) => {
            toast.error("Please accept the geolocation request or deny geolocation in your settings and on your device.")
        });
    }, [userBullets]);
    
    
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
        "NaN": {
            icon: ProhibitedEmoji
        }
    };

    useEffect(() => {
        if (ref.current) {
            const map = new window.google.maps.Map(ref.current, {
                center,
                zoom,
                streetViewControl: false,
                backgroundColor: "none",
            });

            const infoWindow = new google.maps.InfoWindow({
                content: "",
                disableAutoPan: false,
            });

            //Create content strings array

            const contentStrings = userBullets ? userBullets.map((element, i) => {

                let bid: string = element.bulletDocID ?? ""

                let str: string = element.bulletTextContent;
                if (str.length > 100) str = str.substring(0, 100) + "...";

                const date = element?.timestamp.toDate();
                const month = date.getMonth() + 1
                const day = date.getDate();
                const year = date.getFullYear();
                const hour = date.getHours() % 12 || 12;
                const minute = date.getMinutes();
                const amOrPm = date.getHours() >= 12 ? 'PM' : 'AM';

                const timeStr = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year.toString()} • ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${amOrPm}`;

                google.maps.event.addListener(infoWindow, 'domready', () => {
                    const button = document.getElementById(bid);
                    if (button) {
                        button.addEventListener('click', () => {
                            console.log(bid)
                        });
                    }
                });

                const InfoWindowHtml = `
                    <div id="content" style="width: 300px">
                    <p style="overflow: hidden;"><b>${str}</b></p>
                    <img src=${icons[element.score ?? NaN]?.icon} style="width:20px; display: block; margin-left: auto; margin-right: 0;"></img>
                    <p style="text-align: right">${timeStr}</p>
                    <p style="text-align: right">${element?.bulletAddress}</p>
                    <button id="${bid}">View Note</button>
                    </div>
                `
                return InfoWindowHtml;
            }) : [];

            const markers = userBullets?.map((bullet, i) => {
                const marker = new google.maps.Marker({
                    position: {
                        lat: bullet.bulletLatitude ?? 0,
                        lng: bullet.bulletLongitude ?? 0,
                    },
                    icon: {
                        url: icons[bullet.score ?? NaN]?.icon,
                        scaledSize: new google.maps.Size(40, 40), // adjust size as needed
                    },
                    title: String(bullet.score),
                });

                marker.addListener("click", () => {
                    // Set the content of the info window with the corresponding content string
                    infoWindow.setContent(contentStrings[i]);

                    // Open the info window
                    infoWindow.open(map, marker);

                });

                return marker;
            });

            const averageEmoji = (markers: google.maps.Marker[]) => {
                let filteredMarkers = markers.filter((marker) => marker.getTitle() !== "null");
                let average = 0;

                filteredMarkers.forEach((marker) => {
                    average += Number(marker.getTitle() ?? 0);
                })

                average = average / filteredMarkers.length;
                const normalizedScore = Math.round(average);

                return icons[normalizedScore].icon;
            }

            const markerClusterOptions: MarkerClustererOptions = {
                markers,
                map,
                renderer: {
                    render: ({ count, position, markers }) => {
                        let mark = new google.maps.Marker({
                            label: { text: String(count), className: "bg-cyan-500 rounded-full py-2 px-4 fixed top-2 font-bold shadow-inner shadow-gray-800" },
                            icon: {
                                url: averageEmoji(markers ?? []),
                                scaledSize: new google.maps.Size(65, 65),
                            },
                            position: position,
                            map: map,
                            zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
                        });

                        return mark;
                    }
                },
            }

            new MarkerClusterer(markerClusterOptions);

            return () => {
                markersRef.current.forEach((marker) => marker.setMap(null));
            };
        }
    }, [userBullets, zoom, markerPositions]);

    return <div ref={ref} id="map" className="w-full h-full" />;
}

const Map: React.FC = () => {
    const zoom = 4;
    const { bullets } = useUserBullets("PastWeek");
    const locations: google.maps.LatLngLiteral[] = [];

    const filteredByLocationBullets = bullets?.filter((bullet) => (bullet.bulletLatitude !== null && bullet.bulletLongitude !== null && bullet.bulletLatitude !== undefined && bullet.bulletLongitude !== undefined));

    filteredByLocationBullets?.forEach((bullet) => {
        locations.push({
            lat: bullet.bulletLatitude ?? 0,
            lng: bullet.bulletLongitude ?? 0,
        });
    });

    return (
        <div className="h-full sm:h-3/4 sm:aspect-square">
            <Wrapper apiKey={import.meta.env.VITE_GCP_MAPS_API_KEY}>
                <MyMapComponent userBullets={bullets} defaultZoom={zoom} markerPositions={locations} />
            </Wrapper>
        </div>
    );
};

export default Map;