import PhotoDumpIcon from '../../../../assets/icons/photo_library_50dp_E3E3E3_FILL0_wght700_GRAD200_opsz48.png'

import type { IndividualLeg_Interface} from '../../../../configs/types_and_interfaces';

type DisplayThirdLayerProps = {
    activeDisplayLeg: IndividualLeg_Interface | undefined
}

const DisplayLegSixthLayer = ({activeDisplayLeg}: DisplayThirdLayerProps) => {

    return (
        <div className=" w-full min-h-[10rem] flex flex-col gap-y-[2rem]">
            <div className='flex flex-row h-[4rem] items-center justify-center border-b-2 border-red-500 '>
                <strong className='text-center mr-[2rem]'>Photo Dump</strong>
            </div>
            <div className='w-full h-full flex'>
                    {activeDisplayLeg?.photoDump?.length !== undefined  ? (
                        < div className='mt-5 grid grid-cols-3 flex-1 gap-1'>
                            {activeDisplayLeg.photoDump.map((img, idx) => (
                                <div 
                                    key={idx}  
                                    className='relative h-[18rem]'    
                                >
                                    <img 
                                        src={img}
                                        className='w-full h-full object-center object-cover '
                                    />
                                </div>
                                
                            ))}
                        </div>
                    ) : (
                        <div className='w-full h-full'>
                            <img
                                className='mx-auto mt-[5%] object-center object-cover '
                                src={PhotoDumpIcon}
                            />
                        </div>
                    )}
            </div>
        </div>
    )
}

export default DisplayLegSixthLayer
