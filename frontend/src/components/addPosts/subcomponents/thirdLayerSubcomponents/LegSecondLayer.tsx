import { useEffect, useRef } from "react"


const LegSecondLayer = () => {

    const textareaRef = useRef<HTMLTextAreaElement>(null)
    
    const handleInput = ():void => {
        const textarea = textareaRef.current
        if(!textarea) return

        textarea.style.height = 'auto'
        textarea.style.height = Math.min(textarea.scrollHeight, 480) + 'px'
    }

    useEffect(() => {
        handleInput()
    },[])

    return (
        <div className="flex flex-row w-full min-h-[10rem] max-h-[30rem]">
            <div className="flex-1">
                <textarea 
                    ref={textareaRef}
                    placeholder="Highlights"
                    className="w-full h-full resize-none placeholder:text-center focus:outline-none"
                    onInput={handleInput}
                />
            </div>
            <div className="mx-[0.5rem] bg-red-500 w-[0.2rem]"></div>
            <div className="flex-1">
                <textarea 
                    ref={textareaRef}
                    placeholder="Challenges"
                    className="w-full h-full resize-none placeholder:text-center focus:outline-none"
                    onInput={handleInput}
                />
            </div>

        </div>
    )
}

export default LegSecondLayer
