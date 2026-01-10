import type { RouteGeoJSON } from "../../../../../configs/types_and_interfaces"

import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"
import FitBounds from "../../../../../utils/FitBounds"

const sourceCustomIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
})

const destinationCustomIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
})


type PlaceInfoProviderProps = {
    routeInfo: RouteGeoJSON | undefined
    sourceCoordinates: {
        lat: number,
        lng: number 
    } | undefined
    destinationCoordinates: {
        lat: number,
        lng: number 
    } | undefined
}

const RouteMap = ({routeInfo, sourceCoordinates, destinationCoordinates}: PlaceInfoProviderProps) => {

    const routeCoords: [number, number][] | undefined = routeInfo?.features[0].geometry.coordinates.map(
        ([lng, lat]) => [lat, lng]
    )

    let center: [number, number] = [0, 0]
    if(routeCoords && routeCoords?.length > 0){
        center = routeCoords[Math.floor(routeCoords.length / 2)]
    }else if(sourceCoordinates && destinationCoordinates){
        center = [
            (sourceCoordinates.lat + destinationCoordinates.lat) / 2,
            (sourceCoordinates.lng + destinationCoordinates.lng) / 2,
        ]
    }


    return (
        <div className="w-full h-full">
            {routeCoords?.length && routeCoords.length> 0 ? (
                <MapContainer
                    center={center} // Middle of the route   
                    zoom={10}
                    scrollWheelZoom={true}
                    className="h-full w-full"
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="© OpenStreetMap contributors"
                    />

                    <Polyline
                        positions={routeCoords}
                        color="blue"
                    />

                    <Marker position={routeCoords[0]} icon={sourceCustomIcon}>
                        <Popup>Source</Popup>
                    </Marker>

                    <Marker position={routeCoords[routeCoords.length - 1]} icon={destinationCustomIcon}>
                        <Popup>Destination</Popup>
                    </Marker>

                    <FitBounds coords={routeCoords}/>
                </MapContainer>
            ) : (
                <>
                    {sourceCoordinates && destinationCoordinates ? (
                        <MapContainer
                            center={center}    
                            zoom={10}
                            scrollWheelZoom={true}
                            className="h-full w-full"
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution="© OpenStreetMap contributors"
                            />
            
                            <Marker position={center} icon={sourceCustomIcon}>
                                <Popup>Source</Popup>
                            </Marker>

                            <Polyline
                                positions={[[sourceCoordinates.lat, sourceCoordinates.lng], [destinationCoordinates?.lat, destinationCoordinates.lng]]}
                                color="blue"
                            />

                            <Marker position={center} icon={sourceCustomIcon}>
                                <Popup>Source</Popup>
                            </Marker>

                            <Marker position={center} icon={destinationCustomIcon}>
                                <Popup>Destination</Popup>
                            </Marker>
                        </MapContainer>
                    ) : (
                        <p>No routes Available!!!</p>
                    )}
                </>
            )}
        </div>
    )
}

export default RouteMap
