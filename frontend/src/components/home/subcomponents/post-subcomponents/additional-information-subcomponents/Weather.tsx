import type { WeatherResponse } from "../../../../../configs/types_and_interfaces"
import weatherIcon from '../../../../../assets/icons/weather_mix_50dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.png'
import { formatDateAndTime, formatTimeWithUnix } from "../../../../../utils/formatUtils"

type PlaceInfoProviderProps = {
    placeWeather: WeatherResponse | undefined
}


const Weather = ({placeWeather}: PlaceInfoProviderProps) => {
    console.log(placeWeather)
    return (
        <div className="w-full h-full flex flex-col">
            <div className="relative w-full flex-1 p-2 flex flex-col justify-center items-center">
                <p className="font-bold text-[1.2rem]">{placeWeather?.name}</p>
                <p>{placeWeather?.coordinates.lat} , {placeWeather?.coordinates.lon}</p>
                <img 
                    className="w-[10%]"
                    src={`https://openweathermap.org/img/wn/${placeWeather?.weather[0].icon}@2x.png`} alt="weather-icon" 
                />
                <p>{placeWeather?.weather[0].description}</p>
                <p className="absolute right-5 top-2 font-bold">{formatDateAndTime('24h', placeWeather?.date as string)}</p>
            </div>
            <div className="w-full flex-2 flex flex-row">
                <div className="w-full h-full flex flex-col flex-1 p-2 items-center gap-y-5">
                    <div className="w-full h-fit flex flex-row px-5 justify-between">
                        <p className="text-[1.1rem] font-bold">Temperature</p>
                        <p className="text-amber-500 text-[1.1rem] font-bold">{placeWeather?.main.temp} ℃</p>
                    </div>
                    <div className="w-full h-fit flex flex-row px-5 justify-between">
                        <p className="text-[1.1rem]">Feels Like</p>
                        <p>{placeWeather?.main.feels_like} ℃</p>
                    </div>
                    <div className="w-full h-fit flex flex-row px-5 justify-between">
                        <p className="text-[1.1rem]">Minimum Temperature</p>
                        <p>{placeWeather?.main.temp_min} ℃</p>
                    </div>
                    <div className="w-full h-fit flex flex-row px-5 justify-between">
                        <p className="text-[1.1rem]">Maximum Temperature</p>
                        <p>{placeWeather?.main.temp_max} ℃</p>
                    </div>
                    <div className="w-full h-fit flex flex-row px-5 justify-between">
                        <p className="text-[1.1rem] font-bold">Visibility</p>
                        <p className="text-amber-500 text-[1.1rem] font-bold">{placeWeather?.visibility ? `${placeWeather.visibility / 1000} Km` : "—"}</p>
                    </div>
                </div>
                <div className="w-full h-full flex flex-col flex-1 p-2 items-center gap-y-5">
                    <div className="w-full h-fit flex flex-row px-5 justify-between">
                        <p className="text-[1.1rem] font-bold">Pressure</p>
                        <p className="text-amber-500 text-[1.1rem] font-bold">{placeWeather?.main.pressure} hPa</p>
                    </div>
                    <div className="w-full h-fit flex flex-row px-5 justify-between">
                        <p className="text-[1.1rem] font-bold">Humidity</p>
                        <p className="text-amber-500 text-[1.1rem] font-bold">{placeWeather?.main.humidity} %</p>
                    </div>
                    <div className="w-full h-fit flex flex-row px-5 justify-between">
                        <p className="text-[1.1rem]">Sea Level</p>
                        <p>{placeWeather?.main.sea_level ? `${placeWeather.main.sea_level} m` : "—"}</p>
                    </div>
                    <div className="w-full h-fit flex flex-row px-5 justify-between">
                        <p className="text-[1.1rem]">Ground Level</p>
                        <p>{placeWeather?.main.grd_level ? `${placeWeather.main.grd_level} m` : "—"}</p>
                    </div>
                    <div className="w-full h-fit flex flex-row px-5 justify-between">
                        <p className="text-[1.1rem] font-bold">Rain</p>
                        <p className="text-amber-500 text-[1.1rem] font-bold">{placeWeather?.rain?.one_h ? `${placeWeather?.rain?.one_h} %` : "—"}</p>
                    </div>
                </div>
                <div className="w-full h-full flex flex-col flex-1 p-2 items-center gap-y-5">
                    <div className="w-full h-fit flex flex-row px-5 justify-between">
                        <p className="text-[1.1rem] font-bold">Sunrise</p>
                        <p className="text-amber-500 text-[1.1rem] font-bold">{formatTimeWithUnix('12h',placeWeather?.sys.sunrise as number, placeWeather?.timezone as number)}</p>
                    </div>
                    <div className="w-full h-fit flex flex-row px-5 justify-between">
                        <p className="text-[1.1rem] font-bold">Sunset</p>
                        <p className="text-amber-500 text-[1.1rem] font-bold">{formatTimeWithUnix('12h',placeWeather?.sys.sunset as number, placeWeather?.timezone as number)}</p>
                    </div>
                    <div className="w-full h-fit flex flex-row px-5 justify-between">
                        <p className="text-[1.1rem] font-bold">Wind Speed</p>
                        <p className="text-amber-500 text-[1.1rem] font-bold">{placeWeather?.wind.speed ? `${(placeWeather?.wind?.speed * 3.6).toFixed(1)} km/h` : "—"}</p>
                    </div>
                    <div className="w-full h-fit flex flex-row px-5 justify-between">
                        <p className="text-[1.1rem]">Wind Degree</p>
                        <p>{placeWeather?.wind.deg ? `${placeWeather.wind.deg} °` : "—"}</p>
                    </div>
                    <div className="w-full h-fit flex flex-row px-5 justify-between">
                        <p className="text-[1.1rem]">Wind Gust</p>
                        <p>{placeWeather?.wind.gust ? `${(placeWeather.wind.gust * 3.6).toFixed(1)} Km/h` : "—"}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather
