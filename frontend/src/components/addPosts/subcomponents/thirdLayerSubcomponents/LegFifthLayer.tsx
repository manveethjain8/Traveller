import { useEffect, useRef } from "react"
import type { IndividualLeg_type } from "../../../../configs/types_and_interfaces";

type ThirdLayerProps = {
    activeLeg: IndividualLeg_type | null
    handleLegInputChange: (
        legId: string,
        field: keyof IndividualLeg_type['legData'],
        value: any,
        index?: number
    ) => void;
}

const LegFifthLayer = ({activeLeg, handleLegInputChange}: ThirdLayerProps) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    
        const handleInput = ():void => {
            const textarea = textareaRef.current
            if(!textarea) return
    
            textarea.style.height = 'auto'
            textarea.style.height = Math.min(textarea.scrollHeight, 800) + 'px'
        }
    
        useEffect(() => {
            handleInput()
        },[])
    
        return (
            <div className="max-h-[50rem] w-full pr-3">
                {activeLeg && 
                    <textarea 
                    key={activeLeg.id}
                    ref={textareaRef} 
                    placeholder="Add notes"
                    className='bg-[#36454F] w-full max-h-[50rem] resize-none placeholder:text-center focus:outline-none rounded-3xl box-border p-3 overflow-y-auto'
                    onInput={handleInput}
                    value={activeLeg.legData.notes}
                    onChange={(e) => handleLegInputChange(activeLeg.id, 'notes', e.target.value)}
                />
                }
            </div>
        )
}

export default LegFifthLayer
