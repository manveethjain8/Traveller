import type { WeatherResponse } from "../../../../../configs/types_and_interfaces"
import weatherIcon from '../../../../../assets/icons/weather_mix_50dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.png'
import { formatDateAndTime } from "../../../../../utils/formatUtils"

type PlaceInfoProviderProps = {
    placeWeather: WeatherResponse | undefined
}


const Weather = ({placeWeather}: PlaceInfoProviderProps) => {
    console.log(placeWeather)
    return (
        <div className="w-full h-full flex flex-col">
            <div className="relative w-full flex-1 bg-red-500 p-2 flex flex-col justify-center items-center">
                <p className="font-bold text-[1.2rem]">{placeWeather?.name}</p>
                <p>{placeWeather?.coordinates.lat} , {placeWeather?.coordinates.lon}</p>
                <img 
                    className="w-[10%]"
                    src={`https://openweathermap.org/img/wn/${placeWeather?.weather[0].icon}@2x.png`} alt="weather-icon" 
                />
                <p>{placeWeather?.weather[0].description}</p>
                <p className="absolute right-5 top-2 font-bold">{formatDateAndTime('24h', placeWeather?.date as string)}</p>
            </div>
            <div className="w-full flex-2 bg-blue-500"></div>
        </div>
    )
}

export default Weather
