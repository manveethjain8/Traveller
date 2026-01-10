import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"

const customIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
})

type PlaceInfoProviderProps = {
    placeCoordinates?:{
        lat: number | null
        lon: number | null
    }
}

const Map = ({placeCoordinates}: PlaceInfoProviderProps) => {

    const center: [number, number] = [placeCoordinates?.lat as number, placeCoordinates?.lon as number]

    return (
        <div className="w-full h-full">
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

                <Marker position={center} icon={customIcon}>
                    <Popup>Destination</Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default Map
