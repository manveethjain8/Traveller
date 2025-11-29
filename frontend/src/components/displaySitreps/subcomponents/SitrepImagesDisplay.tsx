import forwardArrow from '../../../assets/icons/arrow_forward_ios_100dp_E3E3E3_FILL0_wght700_GRAD0_opsz48.png'
import backArrow from '../../../assets/icons/arrow_back_ios_100dp_E3E3E3_FILL0_wght700_GRAD0_opsz48.png'
import PhotoDumpIcon from '../../../assets/icons/photo_library_50dp_E3E3E3_FILL0_wght700_GRAD200_opsz48.png'
import type { Sitrep_Interface } from '../../../configs/types_and_interfaces'
import { useSitrepContext } from '../../../contexts/sitrepContext'

type DisplaySitreps_Props = {
    selectedSitrep: Sitrep_Interface | undefined
    sitrepNumber: number
    positions: number[]
    total: number
}

const SitrepImagesDisplay = ({selectedSitrep, sitrepNumber, positions, total}: DisplaySitreps_Props) => {

    const {handleSitrepSelection} = useSitrepContext()
    return (
        <div className="w-full h-full flex flex-col box-border p-4 items-center gap-y-5 ">
            <div className="relative w-full min-h-[3rem] max-h-[4rem]">
                <div className="absolute left-1/2 top-[20%] -translate-x-1/2 flex items-center space-x-2 px-4 py-1 rounded-full text-white">
                    {positions.length > 0 && positions[0] > 1 && <span>…</span>}
                        {positions.map((num) => (
                            <span
                            key={num}
                            className={`${
                                num - 1 === sitrepNumber
                                ? "font-bold text-yellow-400"
                                : "opacity-70"
                            }`}
                            >
                            {num}
                            </span>
                        ))}
                        {positions.length > 0 && positions[positions.length - 1] < total && (
                            <span>…</span>
                        )}
                </div>
            </div>
            <div className="w-[80%] min-h-[20rem] flex flex-1 flex-row items-center">
                <div className="w-[10%] h-full flex justify-center items-center">
                    <div 
                        className='w-[50%] h-[10%] flex items-center box-border pl-3 hover:bg-red-700 hover:rounded-full active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer'
                    >
                        <img 
                            src={backArrow}
                            className='w-full object-center object-cover'
                            onClick={() => handleSitrepSelection(-1)}
                        />
                    </div>
                </div>
                <div className="relative w-[90%] h-full border border-red-500 border-2">
                        {selectedSitrep ? (
                            <div 
                                key={selectedSitrep._id}
                                className='w-full h-full'
                            >
                                <img 
                                    className='w-full h-full object-center object-cover'
                                    src={selectedSitrep.sitrepImage.url}
                                />
                            </div>
                                
                            ) : (
                                <div className='w-full h-full'>
                                    <img
                                        className='mx-auto mt-[23%] object-center object-cover '
                                        src={PhotoDumpIcon}
                                    />
                                </div>
                            )    
                        }
                </div>
                <div className="w-[10%] h-full flex justify-center items-center">
                    <div 
                        className='w-[50%] h-[10%] flex items-center box-border pl-2 hover:bg-red-700 hover:rounded-full active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer '
                    >
                        <img 
                            src={forwardArrow}
                            className='w-full object-center object-cover'
                            onClick={() => handleSitrepSelection(+1)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SitrepImagesDisplay
