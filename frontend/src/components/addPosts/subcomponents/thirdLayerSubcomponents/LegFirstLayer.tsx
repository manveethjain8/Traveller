import addIcon from '../../../../assets/icons/add_50dp_E3E3E3_FILL0_wght700_GRAD0_opsz48.png'
import deleteIcon from '../../../../assets/icons/close_50dp_E3E3E3_FILL0_wght700_GRAD0_opsz48.png'
import DI from '../../../../assets/background_images/1302525-3840x2160-desktop-4k-anime-background-image.jpg'

const LegFirstLayer = () => {
    return (
        <div className="flex flex-row gap-x-2">
            <div className="relative flex-[20rem] w-full h-full min-w-[10rem] min-h-[30rem] border border-red-500 border-2">
                <div className='z-100 absolute top-1 right-1 bg-red-500 w-[2.5rem] h-[2.5rem] rounded-full flex justify-center items-center hover:bg-red-700 active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer'>
                    <img 
                        src={deleteIcon} 
                        alt='add icon'
                        className='w-[1.5rem] h-[1.5rem] object-center object-fit'
                    />
                </div>
                <img src={DI} alt="" />
                <div className='absolute bottom-1 right-1 bg-red-500 w-[2.5rem] h-[2.5rem] rounded-full flex justify-center items-center hover:bg-red-700 active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer'>
                    <input 
                        id='fileInput' 
                        type="file" 
                        className='hidden'
                        accept='image/*'
                       
                    />
                    <label htmlFor="fileInput">
                        <img 
                            src={addIcon} 
                            alt='add icon'
                            className='w-[1.5rem] h-[1.5rem] object-center object-fit cursor-pointer'
                        />
                    </label>
                </div>
                
            </div>
            <div className='flex-1 flex flex-col'>
                <div className='flex-4 w-full box-border p-2'>
                    <textarea 
                        placeholder='Add an introduction'
                        className='bg-[#36454F] w-full h-full resize-none placeholder:text-center focus:outline-none rounded-3xl box-border p-3 overflow-y-auto'
                    />
                </div>
                <div className='flex-5 mt-2 w-full h-full grid grid-cols-2 gap-y-[1rem] gap-x-[1rem] box-border p-2 place-items-center'>
                    <div className='w-fit h-fit'>
                        <p className='text-center font-bold'>Leg Start Date</p>
                        <input 
                            type="date" 
                            className='border w-fit h-fit border-red-500 border-2 rounded-3xl
                            focus:outline-none text-center box-border px-6 py-[0.4rem]'
                        />
                    </div>
                    <div className='w-fit h-fit'>
                        <p className='text-center font-bold'>Leg Distance (KM)</p>
                        <input 
                            type="number" 
                            className='border w-fit h-fit border-red-500 border-2 rounded-3xl
                            focus:outline-none text-center box-border p-1
                            
                            appearance-none
                            [appearance:textfield]
                            [&::-webkit-inner-spin-button]:appearance-none
                            [&::-webkit-outer-spin-button]:appearance-none'
                        />
                    </div>
                    <div className='w-fit h-fit'>
                        <p className='text-center font-bold'>Environment</p>
                        <input 
                            type="text" 
                            className='border w-fit h-fit border-red-500 border-2 rounded-3xl
                            focus:outline-none text-center box-border p-1'
                        />
                    </div>
                    <div className='w-fit h-fit'>
                        <p className='text-center font-bold'>Landscape</p>
                        <input 
                            type="text" 
                            className='border w-fit h-fit border-red-500 border-2 rounded-3xl
                            focus:outline-none text-center box-border p-1'
                        />
                    </div>
                    <div className='w-fit h-fit'>
                        <p className='text-center font-bold'>Weather</p>
                        <input 
                            type="text" 
                            className='border w-fit h-fit border-red-500 border-2 rounded-3xl
                            focus:outline-none text-center box-border p-1'
                        />
                    </div>
                    <div className='w-fit h-fit'>
                        <p className='text-center font-bold'>Location</p>
                        <input 
                            type="text" 
                            className='border w-fit h-fit border-red-500 border-2 rounded-3xl
                            focus:outline-none text-center box-border p-1'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LegFirstLayer
