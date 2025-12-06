import DI from '../../../../assets/icons/image_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png'

import type { IndividualLeg_Interface} from "../../../../configs/types_and_interfaces";


type DisplayThirdLayerProps = {
    activeDisplayLeg: IndividualLeg_Interface | undefined
}

const DisplayLegFourthLayer = ({activeDisplayLeg}: DisplayThirdLayerProps) => {


    return (
        <div className="flex flex-col gap-x-2 max-h-[30rem]">
            {activeDisplayLeg && 
                <div key={activeDisplayLeg._id} className='w-full h-fit flex flex-row'>
                    <div className='flex-1 flex flex-col'>
                        <div className='flex-2 max-h-[30%] w-full box-border p-2'>
                            <p 
                                className='w-full h-full box-border p-3 overflow-y-auto'
                            >
                                {activeDisplayLeg.conclusion}
                            </p>
                        </div>
                        <div className='flex-1 mt-2 w-full max-h-[10%] grid grid-cols-2 gap-y-[1rem] gap-x-[1rem] box-border p-2 place-items-center '>
                            <div className='min-w-[12rem] h-fit text-center'>
                                <p className='text-center font-bold'>Start Time</p>
                                <p
                                    className='border w-full h-fit border-red-500 border-2 rounded-3xl
                                    focus:outline-none text-center box-border  py-[0.4rem]'
                                >
                                    {activeDisplayLeg.startTime}
                                </p>
                            </div>
                            <div className='min-w-[12rem] h-fit'>
                                <p className='text-center font-bold'>End Time</p>
                                <p
                                    className='border w-full h-fit border-red-500 border-2 rounded-3xl
                                    focus:outline-none text-center box-border px-15 py-[0.4rem]'
                                >
                                    {activeDisplayLeg.endTime}
                                </p>
                            </div>
                            <div className='min-w-[12rem] h-fit'>
                                <p className='text-center font-bold'>Difficulty</p>
                                <p
                                    className='border w-full h-fit border-red-500 border-2 rounded-3xl
                                    focus:outline-none text-center box-border px-15 py-[0.4rem]'
                                >
                                    {activeDisplayLeg.difficulty}
                                </p>
                            </div>
                            <div className='min-w-[12rem] h-fit'>
                                <p className='text-center font-bold'>Expenses</p>
                                <p
                                    className='border w-full h-fit border-red-500 border-2 rounded-3xl
                                    focus:outline-none text-center box-border px-15 py-[0.4rem]'
                                >
                                    {activeDisplayLeg.expenses}
                                </p>
                            </div>
                            
                            <div className='min-w-[12rem] h-fit'>
                                <p className='text-center font-bold'>Traffic</p>
                                <p
                                    className='border w-full h-fit border-red-500 border-2 rounded-3xl
                                    focus:outline-none text-center box-border px-15 py-[0.4rem]'
                                >
                                    {activeDisplayLeg.traffic}
                                </p>
                            </div>

                            <div className='min-w-[12rem] h-fit'>
                                <p className='text-center font-bold'>Road Conditions</p>
                                <p
                                    className='border w-full h-fit border-red-500 border-2 rounded-3xl
                                    focus:outline-none text-center box-border px-15 py-[0.4rem]'
                                >
                                    {activeDisplayLeg.roadConditions}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="relative flex-[20rem] min-w-[10rem] min-h-[30rem] max-w-[60rem] max-h-[30rem]">
                        <img 
                            src={activeDisplayLeg.endPhoto as string ?? DI} 
                            alt='Post Image'
                            className='w-full h-full object-center object-cover '
                        />
                    </div>
                </div>
            }
        </div>
    )
}

export default DisplayLegFourthLayer
