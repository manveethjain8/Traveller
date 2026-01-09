import type { PostsSummary_Type } from "../../../../configs/types_and_interfaces"
import { useInteractionsContext } from "../../../../contexts/interactionsContext"
import moreIcon from '../../../../assets/icons/more_vert_50dp_FFFFFF_FILL0_wght700_GRAD0_opsz48.png'
import infoIcon from '../../../../assets/icons/article_50dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.png'
import weatherIcon from '../../../../assets/icons/weather_mix_50dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.png'
import forecastIcon from '../../../../assets/icons/upcoming_50dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.png'
import Introduction from "./additional-information-subcomponents/Introduction"
import Weather from "./additional-information-subcomponents/Weather"
import Forecast from "./additional-information-subcomponents/Forecast"

type PostsProviderProps = {
    post: PostsSummary_Type
}

const AdditionalInformation = ({post}: PostsProviderProps) => {

    const {toggleAdditionalInformation, placeInfo, additionalOption, setAdditionalOption} = useInteractionsContext()

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex-1 relative flex flex-row">
                <div className="w-full h-full flex items-center justify-center gap-x-5">
                    <div 
                        className="w-[5%] rounded-xl h-full flex flex-col items-center hover:bg-red-500 p-[0.3rem] active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer"
                        style={additionalOption === 'info' ? {backgroundColor: "red"} : {}}
                        onClick={() => {
                            setAdditionalOption('info')
                        }}
                    >
                        <img 
                            src={infoIcon}
                            alt="info icon"
                            className="w-[70%] h-[70%]" 
                        />
                        <strong className='text-[0.7rem]'>Info</strong>
                    </div>
                    <div 
                        className="w-[5%] rounded-xl h-full flex flex-col items-center hover:bg-red-500 p-[0.3rem] active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer"
                        style={additionalOption === 'weather' ? {backgroundColor: "red"} : {}}
                        onClick={() => {
                            setAdditionalOption('weather')
                        }}
                    >
                        <img 
                            src={weatherIcon}
                            alt="weather icon"
                            className="w-[70%] h-[70%]" 
                        />
                        <strong className='text-[0.7rem]'>Weather</strong>
                    </div>
                    <div 
                        className="w-[5%] rounded-xl h-full flex flex-col items-center hover:bg-red-500 p-[0.3rem] active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer"
                        style={additionalOption === 'forecast' ? {backgroundColor: "red"} : {}}
                        onClick={() => {
                            setAdditionalOption('forecast')
                        }}
                    >
                        <img 
                            src={forecastIcon}
                            alt="forecast icon"
                            className="w-[70%] h-[70%]" 
                        />
                        <strong className='text-[0.7rem]'>Forecast</strong>
                    </div>
                    <div 
                        onClick={() => toggleAdditionalInformation(post._id)}
                        className='absolute right-2 w-[2.5rem] hover:bg-red-500 hover:rounded-full p-[0.3rem] active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer'
                        >
                        <img
                            className='w-full h-full' 
                            src={moreIcon} 
                            alt="menu icon" 
                            />
                    </div>
                </div>
            </div>
            {additionalOption === 'info' && 
                <Introduction
                    placeImages={placeInfo?.images}
                    placeText={placeInfo?.text}
                />
            }
            {additionalOption === 'weather' && 
                <Weather
                    placeWeather={placeInfo?.weather}
                />
            }
            {additionalOption === 'forecast' && 
                <Forecast
                    placeForecast={placeInfo?.forecast}
                />
            }
        </div>
    )
}

export default AdditionalInformation
