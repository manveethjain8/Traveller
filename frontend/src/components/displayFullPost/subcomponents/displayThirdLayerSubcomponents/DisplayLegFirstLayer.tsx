import DI from '../../../../assets/icons/image_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png'
import type { IndividualLeg_Interface} from '../../../../configs/types_and_interfaces';

type DisplayThirdLayerProps = {
    activeDisplayLeg: IndividualLeg_Interface | undefined
}

const DisplayLegFirstLayer = ({activeDisplayLeg}: DisplayThirdLayerProps) => {


    return (
        <div className="flex flex-col h-fit max-h-[30rem] gap-x-2">
            {activeDisplayLeg && 
                <div key={activeDisplayLeg._id} className='w-full h-fit flex flex-row'>
                    <div className="relative flex-[20rem] min-w-[10rem] min-h-[30rem] max-w-[60rem] max-h-[30rem] ">
                        <img 
                            src={activeDisplayLeg.startPhoto ?? DI} 
                            alt='Post Image'
                            className='w-full h-full object-center object-cover '
                        />
                    </div>
                    <div className='flex-1 flex flex-col'>
                        <div className='flex-4 max-h-[30%] w-full box-border p-2'>
                            <p className='w-full h-full box-border p-3 overflow-y-auto'>
                                {activeDisplayLeg.legIntroduction}
                            </p>
                        </div>
                        <div className='flex-5 max-h-[10%] mt-2 w-full h-full grid grid-cols-2 gap-y-[1rem] gap-x-[1rem] box-border p-2 place-items-center'>
                            <div className='min-w-[12rem] h-fit'>
                                <p className='text-center font-bold'>Leg Start Date</p>
                                <p className='border w-full h-fit border-red-500 border-2 rounded-3xl
                                    text-center box-border py-[0.4rem]'
                                >
                                    {activeDisplayLeg.startDate}    
                                </p>
                            </div>
                            <div className='min-w-[12rem] h-fit'>
                                <p className='text-center font-bold'>Leg Distance (KM)</p>
                                <p
                                    className='border w-full h-fit border-red-500 border-2 rounded-3xl
                                    text-center box-border p-1'
                                >
                                    {activeDisplayLeg.legDistance}
                                </p>
                            </div>
                            <div className='min-w-[12rem] h-fit'>
                                <p className='text-center font-bold'>Environment</p>
                                <p
                                    className='border w-full h-fit border-red-500 border-2 rounded-3xl
                                    focus:outline-none text-center box-border p-1'
                                >
                                    {activeDisplayLeg.environment}
                                </p>
                            </div>
                            <div className='min-w-[12rem] h-fit'>
                                <p className='text-center font-bold'>Landscape</p>
                                <p
                                    className='border w-full h-fit border-red-500 border-2 rounded-3xl
                                    text-center box-border p-1'
                                >
                                    {activeDisplayLeg.landscape}
                                </p>
                            </div>
                            <div className='min-w-[12rem] h-fit'>
                                <p className='text-center font-bold'>Weather</p>
                                <p
                                    className='border w-full h-fit border-red-500 border-2 rounded-3xl
                                    text-center box-border p-1'
                                >
                                    {activeDisplayLeg.weather}
                                </p>
                            </div>
                            <div className='min-w-[12rem] h-fit'>
                                <p className='text-center font-bold'>Location</p>
                                <p
                                    className='border w-full h-fit border-red-500 border-2 rounded-3xl
                                    text-center box-border p-1'
                                >
                                    {activeDisplayLeg.locationString}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default DisplayLegFirstLayer
