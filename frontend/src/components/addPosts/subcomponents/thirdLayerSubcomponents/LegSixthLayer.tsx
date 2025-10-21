import PhotoDumpIcon from '../../../../assets/icons/photo_library_50dp_E3E3E3_FILL0_wght700_GRAD200_opsz48.png'
import addIcon from '../../../../assets/icons/add_50dp_E3E3E3_FILL0_wght700_GRAD0_opsz48.png'
import deleteIcon from '../../../../assets/icons/close_50dp_E3E3E3_FILL0_wght700_GRAD0_opsz48.png'
import uploadIcon from '../../../../assets/icons/upload_50dp_E3E3E3_FILL0_wght700_GRAD200_opsz48.png'

import type { IndividualLeg_type } from "../../../../configs/types_and_interfaces";
import { useAddPostContext } from '../../../../contexts/addPostContext';

type ThirdLayerProps = {
    activeLeg: IndividualLeg_type | null
    handleLegInputChange: (
        legId: string,
        field: keyof IndividualLeg_type['legData'],
        value: any,
        index?: number
    ) => void;
}

const LegSixthLayer = ({activeLeg, handleLegInputChange}: ThirdLayerProps) => {

    const {handleLegPhotoDelete, handlePost} = useAddPostContext()

    return (
        <div className=" w-full min-h-[10rem] flex flex-col gap-y-[2rem]">
            <div className='flex flex-row h-[4rem] items-center justify-center border-b-2 border-red-500 '>
                <strong className='text-center mr-[2rem]'>Photo Dump</strong>
                <div 
                    className='bg-red-500 w-[2.5rem] h-[2.5rem] rounded-full flex justify-center items-center hover:bg-red-700 active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer'
                >
                    <input 
                        id={`legFilesInput-${activeLeg?.id}`}
                        type="file" 
                        className='hidden'
                        accept='image/*'
                        multiple
                        onChange={(e) => {
                        const files = e.target.files
                        if(files){
                            handleLegInputChange(activeLeg?.id ?? '', 'photoDump', files)
                        }
                    }}
                    />
                    <label htmlFor={`legFilesInput-${activeLeg?.id}`}>
                        <img 
                            src={addIcon} 
                            alt='add icon'
                            className='w-[1.5rem] h-[1.5rem] object-center object-fit cursor-pointer'
                        />
                    </label>
                </div>
            </div>
            <div className='w-full h-full flex'>
                    {activeLeg?.legPreview?.photoDump?.length !== undefined  ? (
                        < div className='mt-5 grid grid-cols-3 flex-1 gap-1'>
                            {activeLeg?.legPreview.photoDump?.map((img, idx) => (
                                <div 
                                    key={idx}  
                                    className='relative h-[18rem]'    
                                >
                                    <img 
                                        src={img}
                                        className='w-full h-full object-center object-cover '
                                    />
                                    <div className='absolute top-1 right-1 bg-red-500 w-[2rem] h-[2rem] rounded-full flex justify-center items-center hover:bg-red-700 active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer'>
                                    <img 
                                        src={deleteIcon} 
                                        alt='add icon'
                                        className='w-[1.5rem] h-[1.5rem] object-center object-fit'
                                        onClick={() => handleLegPhotoDelete(activeLeg.id, 2, idx)}
                                    />
                                </div>
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
            <div className='w-full min-h-[5rem] flex flex-row justify-center items-center gap-x-[3rem] border-t-2 border-red-500'>
                    <button className='flex flex-row h-fit w-fit p-2 rounded-full gap-x-1 items-center bg-red-500 hover:bg-red-700 active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer'>
                        <strong>Private</strong>
                        <img 
                            src={uploadIcon} 
                            alt='upload icon' 
                            className='w-[2rem] h-[2rem]'
                            onClick={() => handlePost('private')}
                        />
                    </button>

                    <button className='flex flex-row h-fit w-fit p-2 rounded-full gap-x-1 items-center bg-red-500 hover:bg-red-700 active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer'>
                        <strong>Public</strong>
                        <img 
                            src={uploadIcon} 
                            alt='upload icon' 
                            className='w-[2rem] h-[2rem]'
                            onClick={() => handlePost('public')}
                        />
                    </button>
            </div>
        </div>
    )
}

export default LegSixthLayer
