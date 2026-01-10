import { useEffect } from "react";
import { useMap } from "react-leaflet";

const FitBounds = ({coords}: {coords: [number, number][]}) => {
    const map = useMap()

    useEffect(() => {
        if(coords.length > 1){
            map.fitBounds(coords, {
                padding: [40, 40],
                animate: true,
            })
        }
    }, [coords.length, map])
    
    return null
}

export default FitBounds