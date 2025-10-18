import DI from '../../../assets/icons/image_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png'
import addIcon from '../../../assets/icons/add_50dp_E3E3E3_FILL0_wght700_GRAD0_opsz48.png'
import deleteIcon from '../../../assets/icons/close_50dp_E3E3E3_FILL0_wght700_GRAD0_opsz48.png'

import { useAddPostContext } from '../../../contexts/addPostContext'
import Baits from './firstLayerSubcomponents/Baits'

const FirstLayer = () => {

    const {tnPreview, handleNewPostInputChange, handleThumbnailImageRemoval} = useAddPostContext()

    return (
        <div className='flex h-[36rem] w-full flex-row'>
            <div className="relative flex-1 w-full h-full min-w-[22.6rem] min-h-[35.8rem] border border-red-500 border-2">
                {tnPreview && 
                    <div className='z-100 absolute top-1 right-1 bg-red-500 w-[2.5rem] h-[2.5rem] rounded-full flex justify-center items-center hover:bg-red-700 active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer'>
                        <img 
                            src={deleteIcon} 
                            alt='add icon'
                            className='w-[1.5rem] h-[1.5rem] object-center object-fit'
                            onClick={handleThumbnailImageRemoval}
                        />
                    </div>
                }
                {tnPreview ? (
                    <img 
                        src={tnPreview} 
                        alt='Post Image'
                        className='w-full h-full object-center object-cover '
                    />
                ) : (
                    <img 
                        src={DI} 
                        alt='Post Image'
                        className='mx-auto mt-[60%] object-center object-fit'
                    />
                )}
                <div className='absolute bottom-1 right-1 bg-red-500 w-[2.5rem] h-[2.5rem] rounded-full flex justify-center items-center hover:bg-red-700 active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer'>
                    <input 
                        id='fileInput' 
                        type="file" 
                        className='hidden'
                        accept='image/*'
                        onChange={(e) => {
                            const file = e.target.files?.[0]
                            if(file){
                                handleNewPostInputChange('thumbnail', file)
                            }
                        }}
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
            <div className="flex-3 flex flex-col">
                <div className='flex-2 flex flex-col box-border px-4'>
                    <div className='relative flex-1 flex flex-row w-full mb-1'>
                            <input 
                                type="text"
                                placeholder='Name of Expedition'
                                className='bg-[#36454F] absolute left-[40%] text-center font-bold h-full placeholder:font-bold focus:outline-none rounded-3xl box-border'
                            />

                            <input 
                                type="date"
                                className='bg-[#36454F] absolute right-[5%] text-center text-gray-400 h-full font-bold focus:outline-none rounded-3xl box-border px-2'
                            />
                    </div>
                    <div className='flex-5 w-full'>
                        <textarea 
                            placeholder='Add an introduction'
                            className='bg-[#36454F] w-full h-full resize-none placeholder:text-center focus:outline-none rounded-3xl box-border p-3'
                        />
                    </div>
                </div>
                <div className='flex-1 grid grid-cols-4 gap-y-[1rem] gap-x-[3rem] justify-center place-items-end box-border pt-4 pr-5'>
                    <Baits/>
                </div>
            </div>
        </div>
    )
}

export default FirstLayer
