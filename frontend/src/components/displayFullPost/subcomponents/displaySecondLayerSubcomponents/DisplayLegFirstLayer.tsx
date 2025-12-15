import { useEffect, useRef } from 'react';
import DI from '../../../../assets/icons/image_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png'
import type { IndividualLeg_Interface} from '../../../../configs/types_and_interfaces';

type DisplayThirdLayerProps = {
    activeDisplayLeg: IndividualLeg_Interface | undefined
}

const DisplayLegFirstLayer = ({activeDisplayLeg}: DisplayThirdLayerProps) => {

    const paragraphRef = useRef<HTMLParagraphElement>(null)
        
    const handleInput = ():void => {
        const paragraph = paragraphRef.current
        if(!paragraph) return

        paragraph.style.height = 'auto'
        paragraph.style.height = Math.min(paragraph.scrollHeight, 400) + 'px'
    }

    useEffect(() => {
        handleInput()
    },[])


    return (
        <div className="flex flex-col h-fit gap-x-2">
            {activeDisplayLeg && 
                <div key={activeDisplayLeg._id} className='w-full h-fit flex flex-col'>
                    <div className="mx-auto relative min-w-[60rem] max-w-[60rem] aspect-[2/1] border border-red-500 border-2">
                        <img 
                            src={activeDisplayLeg.startPhoto ?? DI} 
                            alt='Post Image'
                            className='w-full h-full object-center object-cover '
                        />
                    </div>
                    <div className='flex-1 flex flex-col'>
                        <div className='flex-4 max-h-[30%] w-full box-border p-2'>
                            <p className='w-full h-full box-border p-3 overflow-y-auto'
                                ref={paragraphRef}
                                onChange={handleInput}
                            >
                                {activeDisplayLeg.legDescription}
                            </p>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default DisplayLegFirstLayer
