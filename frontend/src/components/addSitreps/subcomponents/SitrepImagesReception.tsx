import addIcon from '../../../assets/icons/add_50dp_E3E3E3_FILL0_wght700_GRAD0_opsz48.png'
import deleteIcon from '../../../assets/icons/close_50dp_E3E3E3_FILL0_wght700_GRAD0_opsz48.png'
import forwardArrow from '../../../assets/icons/arrow_forward_ios_100dp_E3E3E3_FILL0_wght700_GRAD0_opsz48.png'
import backArrow from '../../../assets/icons/arrow_back_ios_100dp_E3E3E3_FILL0_wght700_GRAD0_opsz48.png'

const SitrepImagesReception = () => {
    return (
        <div className="w-full h-full flex flex-col box-border p-4 items-center gap-y-5">
            <div className="w-full min-h-[3rem] max-h-[4rem] bg-yellow-500"></div>
            <div className="w-[80%] min-h-[20rem] flex flex-1 flex-row items-center">
                <div className="w-[10%] h-full flex justify-center items-center">
                    <div 
                        className='w-[50%] h-[10%] flex items-center box-border pl-3 hover:bg-red-700 hover:rounded-full active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer'
                    >
                        <img 
                            src={backArrow}
                            className='w-full object-center object-cover'
                        />
                    </div>
                </div>
                <div className="relative w-[90%] h-full bg-blue-500">
                    <div 
                        className='absolute bottom-2 right-2 bg-red-500 w-[3rem] h-[3rem] rounded-full flex justify-center items-center hover:bg-red-700 active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer'
                    >
                        <input 
                            id='sitrepInput' 
                            type="file" 
                            className='hidden'
                            accept='image/*'
                            max={10}
                        />
                        <label htmlFor="sitrepInput">
                            <img 
                                src={addIcon} 
                                alt='add icon'
                                className='w-[2rem] h-[2rem] object-center object-fit cursor-pointer'
                            />
                        </label>
                    </div>
                </div>
                <div className="w-[10%] h-full flex justify-center items-center">
                    <div 
                        className='w-[50%] h-[10%] flex items-center box-border pl-2 hover:bg-red-700 hover:rounded-full active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer'
                    >
                        <img 
                            src={forwardArrow}
                            className='w-full object-center object-cover'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SitrepImagesReception
