import addIcon from '../../../assets/icons/add_50dp_E3E3E3_FILL0_wght700_GRAD0_opsz48.png'
import deleteIcon from '../../../assets/icons/close_50dp_E3E3E3_FILL0_wght700_GRAD0_opsz48.png'
import forwardArrow from '../../../assets/icons/arrow_forward_ios_100dp_E3E3E3_FILL0_wght700_GRAD0_opsz48.png'
import backArrow from '../../../assets/icons/arrow_back_ios_100dp_E3E3E3_FILL0_wght700_GRAD0_opsz48.png'
import PhotoDumpIcon from '../../../assets/icons/photo_library_50dp_E3E3E3_FILL0_wght700_GRAD200_opsz48.png'
import { useSitrepContext } from '../../../contexts/sitrepContext'

const SitrepImagesReception = () => {

    // const {sitrep, sitrepImageNumber, handleSitrepInputChange, handleSitrepImageSelection, handleSitrepImageDeletions} = useSitrepContext()

    // let positions: number[] = []
    // const total = sitrep.sitrepPreview.images?.length || 0
    // const visibleRange = 1
    // let start = 0
    // let end = 0

    // if (total > 0) {
    //     start = Math.max(1, sitrepImageNumber + 1 - visibleRange)
    //     end = Math.min(total, sitrepImageNumber + 1 + visibleRange)
    //     positions = Array.from({ length: end - start + 1 }, (_, i) => start + i)
    // }

    const {activeSitrep, handleSitrepInputChange, handleSitrepImageDeletions} = useSitrepContext()

    console.log(activeSitrep)

    return (
        <div className="w-full h-full flex flex-col box-border p-4 items-center gap-y-5 ">
            {/* <div className="relative w-full min-h-[3rem] max-h-[4rem]">
                <div className="absolute left-1/2 top-[20%] -translate-x-1/2 flex items-center space-x-2 px-4 py-1 rounded-full text-white">
                    {positions.length > 0 && positions[0] > 1 && <span>…</span>}
                        {positions.map((num) => (
                            <span
                            key={num}
                            className={`${
                                num - 1 === sitrepImageNumber
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
            </div> */}
            <div className="w-[80%] min-h-[20rem] flex flex-1 flex-row items-center">
                {/* <div className="w-[10%] h-full flex justify-center items-center">
                    <div 
                        className='w-[50%] h-[10%] flex items-center box-border pl-3 hover:bg-red-700 hover:rounded-full active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer'
                    >
                        <img 
                            src={backArrow}
                            className='w-full object-center object-cover'
                            // onClick={() => handleSitrepImageSelection(-1)}
                        />
                    </div>
                </div> */}
                <div className="relative w-[90%] h-full border border-red-500 border-2">
                    <>
                        {activeSitrep && activeSitrep.sitrepPreview.image !== undefined ? (
                            <div 
                                // key={sitrepImageNumber}
                                className='w-full h-full'
                            >
                                <img 
                                    className='w-full h-full object-center object-cover'
                                    // src={sitrep.sitrepPreview.images[sitrepImageNumber]}
                                    src={activeSitrep.sitrepPreview.image}
                                />
                                <div className='absolute top-2 right-2 bg-red-500 w-[3rem] h-[3rem] rounded-full flex justify-center items-center hover:bg-red-700 active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer'>
                                    <img 
                                        src={deleteIcon} 
                                        alt='add icon'
                                        className='w-[2rem] h-[2rem] object-center object-fit'
                                        onClick={() => handleSitrepImageDeletions(activeSitrep.id)}
                                    />
                                </div>
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
                        <div 
                            className='absolute bottom-2 right-2 bg-red-500 w-[3rem] h-[3rem] rounded-full flex justify-center items-center hover:bg-red-700 active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer '
                        >
                            <input 
                                id='sitrepInput' 
                                type="file" 
                                className='hidden'
                                accept='image/*'
                                onChange={(e) => {
                                    const file = e.target.files?.[0]
                                    if(file){
                                        handleSitrepInputChange(activeSitrep?.id as number,'image', file)
                                    }
                                }}
                            />
                            <label htmlFor="sitrepInput">
                                <img 
                                    src={addIcon} 
                                    alt='add icon'
                                    className='w-[2rem] h-[2rem] object-center object-fit cursor-pointer'
                                />
                            </label>
                        </div>
                    </>
                </div>
                {/* <div className="w-[10%] h-full flex justify-center items-center">
                    <div 
                        className='w-[50%] h-[10%] flex items-center box-border pl-2 hover:bg-red-700 hover:rounded-full active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer '
                    >
                        <img 
                            src={forwardArrow}
                            className='w-full object-center object-cover'
                            onClick={() => handleSitrepImageSelection(+1)}
                        />
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default SitrepImagesReception
