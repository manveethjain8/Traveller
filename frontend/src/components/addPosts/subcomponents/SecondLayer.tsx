import { useEffect, useRef } from "react"
import { useAddPostContext } from "../../../contexts/addPostContext"


const SecondLayer = () => {

    const {newPost, handleNewPostInputChange} = useAddPostContext()

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
            <textarea 
                ref={textareaRef} 
                placeholder="Add an description"
                className='bg-[#36454F] w-full max-h-[50rem] resize-none placeholder:text-center focus:outline-none rounded-3xl box-border p-3 overflow-y-auto'
                onInput={handleInput}
                value={newPost.postData.description}
                onChange={(e) => handleNewPostInputChange('description', e.target.value)}
            />
        </div>
    )
}

export default SecondLayer
