import { useEffect, useRef } from 'react';
import addIcon from '../../../../assets/icons/add_50dp_E3E3E3_FILL0_wght700_GRAD0_opsz48.png'
import deleteIcon from '../../../../assets/icons/close_50dp_E3E3E3_FILL0_wght700_GRAD0_opsz48.png'
import DI from '../../../../assets/icons/image_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png'

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

const LegThirdLayer = ({activeLeg, handleLegInputChange}: ThirdLayerProps) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const handleInput = ():void => {
        const textarea = textareaRef.current
        if(!textarea) return

        textarea.style.height = 'auto'
        textarea.style.height = Math.min(textarea.scrollHeight, 400) + 'px'
    }

    useEffect(() => {
        handleInput()
    },[])

    const {handleLegPhotoDelete} = useAddPostContext()

    return (
        <div className="flex flex-col gap-x-2">
            {activeLeg && 
                <div key={activeLeg.id} className='w-full h-fit flex flex-col'>
                    <div className="mx-auto relative min-w-[60rem] aspect-[2/1] max-w-[60rem]  border border-red-500 border-2">
                        {activeLeg.legPreview.endPhoto && 
                            <div className='absolute top-1 right-1 bg-red-500 w-[2.5rem] h-[2.5rem] rounded-full flex justify-center items-center hover:bg-red-700 active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer'>
                                <img 
                                    src={deleteIcon} 
                                    alt='add icon'
                                    className='w-[1.5rem] h-[1.5rem] object-center object-fit'
                                    onClick={() => handleLegPhotoDelete(activeLeg.id, 1)}
                                />
                            </div>
                        }
                        {activeLeg.legPreview.endPhoto ? (
                            <img 
                                src={activeLeg.legPreview.endPhoto as string || ''} 
                                alt='Post Image'
                                className='w-full h-full object-center object-cover '
                            />
                        ) : (
                            <img 
                                src={DI} 
                                alt='Post Image'
                                className='mx-auto mt-[20%] object-center object-fit'
                            />
                        )}
                        <div className='absolute bottom-1 right-1 bg-red-500 w-[2.5rem] h-[2.5rem] rounded-full flex justify-center items-center hover:bg-red-700 active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer'>
                            <input 
                                id={`legEndFileInput-${activeLeg.id}`}
                                type="file" 
                                className='hidden'
                                accept='image/*'
                                onChange={(e) => {
                                const file = e.target.files?.[0]
                                if(file){
                                    handleLegInputChange(activeLeg.id, 'endPhoto', file)
                                }
                            }}
                            />
                            <label htmlFor={`legEndFileInput-${activeLeg.id}`}>
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
                                ref={textareaRef}
                                onInput={handleInput}
                                value={activeLeg.legData.notes}
                                placeholder='Notes'
                                className='bg-[#36454F] w-full h-full resize-none placeholder:text-center focus:outline-none rounded-3xl box-border p-3 overflow-y-auto'
                                onChange={(e) => handleLegInputChange(activeLeg.id, 'notes', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default LegThirdLayer
