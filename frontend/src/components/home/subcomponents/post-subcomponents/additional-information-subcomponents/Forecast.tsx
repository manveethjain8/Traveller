import { useEffect, useState } from "react"
import type { ForecastList, ForecastResponse } from "../../../../../configs/types_and_interfaces"
import { formatDate, getDay, getTime } from "../../../../../utils/formatUtils"

type PlaceInfoProviderProps = {
    placeForecast: ForecastResponse | undefined
}

const Forecast = ({placeForecast}: PlaceInfoProviderProps) => {

    const [modifiedForecast, setModifiedForecast] = useState<ForecastList[][]>([])

    useEffect(() => {
        if(!placeForecast?.list) return

        const groupedByLocalDate: Record<string, typeof placeForecast.list> = {}

        for(const entry of placeForecast.list){
            const localDate = new Date(entry.dt * 1000).toLocaleDateString("en-CA")

            if(!groupedByLocalDate[localDate]){
                groupedByLocalDate[localDate] = []
            }

            groupedByLocalDate[localDate].push(entry)
        }
        
        const totalForecast = Object.values(groupedByLocalDate).slice(0, 5)
        setModifiedForecast(totalForecast)
            
    }, [placeForecast])


    return (
        <div className="w-full h-full">
            <div className='flex flex-10 flex-col text-white '>
                    <div className='flex flex-1 justify-center items-center flex-col '>
                        {modifiedForecast?.length > 0 &&
                            modifiedForecast.map((dayForecast, index) => (
                                <div className=' flex  w-full h-full box-sizing p-2 ' key={index}>
                                    <div className='flex flex-col min-w-[150px]  justify-center items-center border-r-2'>
                                        <p className='text-[16px] font-semibold'>{getDay(dayForecast[0].dt)}</p>
                                        <p className='text-[13px]'>{formatDate(dayForecast[0].dt)}</p>
                                    </div>
                                    <div className='grid divide-x-2 divide-x-red-500 grid-flow-col auto-cols-[minmax(120px,_1fr)]  h-full scrollbar-hide ' >
                                        {dayForecast?.length > 0 &&
                                            dayForecast.map((threeHourlyForecast) => (
                                                <div className='flex flex-col justify-center items-center' key={threeHourlyForecast.dt}>
                                                    <p className='text-[14px] font-semibold'>{getTime(threeHourlyForecast.dt)}</p>
                                                    <img src={`https://openweathermap.org/img/wn/${threeHourlyForecast.weather[0].icon}@2x.png`} className='object-scale-down max-w-[40px] m-0' />
                                                    <p className='text-[14px] font-semibold'>{threeHourlyForecast.pop ? ((threeHourlyForecast.pop) * 100).toFixed() + '%' : "0%"}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
        </div>
    )
}

export default Forecast
