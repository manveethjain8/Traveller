import {useState } from 'react'
import { useDisplayPostContext } from '../../../contexts/displayPostContext'
import LegFirstLayer from './displaySecondLayerSubcomponents/DisplayLegFirstLayer'
import LegSecondLayer from './displaySecondLayerSubcomponents/DisplayLegSecondLayer'
import LegThirdLayer from './displaySecondLayerSubcomponents/DisplayLegThirdLayer'
import LegFourthLayer from './displaySecondLayerSubcomponents/DisplayLegFourthLayer'

const DisplaySecondLayer = () => {

    const {fullPost, activeDisplayLeg, activeDisplayLegId ,setActiveDisplayLegId} = useDisplayPostContext()
    const [activeId, setActiveId] = useState<number>(1)

    return (
        <div className="w-full h-fit flex flex-col mt-10 p-4">
            <div className="w-full h-fit flex flex-row border-b-2 border-red-500 items-center">
                {fullPost?.legs.map((l, idx) => (
                    < div key={l._id} className='flex flex-row items-center'>
                        <div 
                            onClick={() => {
                                setActiveDisplayLegId(l._id)
                                setActiveId(idx + 1)
                            }}
                            className="rounded-xl py-[0.5rem] pl-[1.5rem] pr-[0.5rem] flex flex-row items-center cursor-pointer"
                            style={l._id === activeDisplayLegId ? {backgroundColor: 'green'} : {backgroundColor: 'orange'}}
                        >
                            <p className='mr-[0.5rem]'>{`Leg ${idx + 1}`}</p>
                        </div>
                        <div className="w-[0.4rem] h-[1.5rem] bg-yellow-500 mx-[0.2rem]"></div>
                    </div>
                ))}
            </div>
            <div className='flex flex-col w-full h-fit mt-[2rem]'>
                <p className='text-center mb-[3rem] text-[1.5rem] font-bold'>{`Leg ${activeId}`}</p>
                <LegFirstLayer 
                    activeDisplayLeg={activeDisplayLeg}
                />
            </div>
            <div className='flex flex-col w-full h-fit mt-[2rem]'>
                <LegSecondLayer
                    activeDisplayLeg={activeDisplayLeg}
                />
            </div>
            <div className='flex flex-col w-full h-fit mt-[2rem]'>
                <LegThirdLayer
                    activeDisplayLeg={activeDisplayLeg}
                />
            </div>
            <div className='flex flex-col w-full h-fit mt-[2rem]'>
                <LegFourthLayer
                    activeDisplayLeg={activeDisplayLeg}
                />
            </div>
        </div>
    )
}

export default DisplaySecondLayer
