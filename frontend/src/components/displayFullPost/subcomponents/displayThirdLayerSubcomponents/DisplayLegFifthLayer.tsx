import { useEffect, useRef } from "react"
import type { IndividualLeg_Interface} from '../../../../configs/types_and_interfaces';

type DisplayThirdLayerProps = {
    activeDisplayLeg: IndividualLeg_Interface | undefined
}

const DisplayLegFifthLayer = ({activeDisplayLeg}: DisplayThirdLayerProps) => {
    const paragraphRef = useRef<HTMLParagraphElement>(null)
    
        const handleInput = ():void => {
            const paragraph = paragraphRef.current
            if(!paragraph) return
    
            paragraph.style.height = 'auto'
            paragraph.style.height = Math.min(paragraph.scrollHeight, 800) + 'px'
        }
    
        useEffect(() => {
            handleInput()
        },[])
    
        return (
            <div className="max-h-[50rem] w-full pr-3">
                {activeDisplayLeg && 
                    <p
                    key={activeDisplayLeg._id}
                    ref={paragraphRef} 
                    className='w-full max-h-[50rem] box-border p-3 overflow-y-auto'
                    onInput={handleInput}
                >
                    {activeDisplayLeg.notes}
                </p>
                }
            </div>
        )
}

export default DisplayLegFifthLayer
