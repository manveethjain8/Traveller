import { useEffect, useRef } from "react"
import { useDisplayPostContext } from "../../../contexts/displayPostContext"


const DisplaySecondLayer = () => {

    const displayParagraphRef = useRef<HTMLParagraphElement>(null)

    const {fullPost} = useDisplayPostContext()

    const handleInput = ():void => {
        const paragraph = displayParagraphRef.current
        if(!paragraph) return

        paragraph.style.height = 'auto'
        paragraph.style.height = Math.min(paragraph.scrollHeight, 800) + 'px'
    }

    useEffect(() => {
        handleInput()
    },[])

    return (
        <div className="max-h-[50rem] w-full pr-3">
            <p 
                ref={displayParagraphRef} 
                className='w-full min-h-[10rem] max-h-[50rem] box-border p-3 overflow-y-auto'
                onChange={handleInput}
            >
                {fullPost?.description}
            </p>
        </div>
    )
}

export default DisplaySecondLayer
