import deleteIcon from '../../../../assets/icons/close_50dp_E3E3E3_FILL0_wght700_GRAD0_opsz48.png'

import {useRef} from "react"
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

const LegSecondLayer = ({activeLeg, handleLegInputChange}: ThirdLayerProps) => {

    const {handleDeleteLegPoints} = useAddPostContext()

    const highlightsTextareaRef = useRef<(HTMLTextAreaElement | null)[]>([])
    const challengesTextareaRef = useRef<(HTMLTextAreaElement | null)[]>([])

    
    const handleHighlightsInput = (idx: number):void => {
        const highlightsTextarea = highlightsTextareaRef.current[idx]
        if(!highlightsTextarea) return

        highlightsTextarea.style.height = 'auto'
        highlightsTextarea.style.height = Math.min(highlightsTextarea.scrollHeight, 480) + 'px'
    }

    const handleChallengesInput = (idx: number):void => {
        const challengesTextarea = challengesTextareaRef.current[idx]
        if(!challengesTextarea) return

        challengesTextarea.style.height = 'auto'
        challengesTextarea.style.height = Math.min(challengesTextarea.scrollHeight, 480) + 'px'
    }


    return (
        <div className="flex flex-row w-full min-h-[10rem] max-h-fit gap-x-[2rem]">
            {activeLeg && 
                <>
                    <div className="relative flex-1">
                        {activeLeg.legData.highlights.map((point, idx) => (
                            <div 
                                key={idx}
                                className="relative w-full mt-[1rem] flex items-center"
                            >
                                <textarea 
                                    
                                    ref={(el) => {
                                        highlightsTextareaRef.current[idx] = el
                                        if(el){
                                            handleHighlightsInput(idx)
                                        }
                                    }}
                                    onInput={() => handleHighlightsInput(idx)}
                                    placeholder="Highlights"
                                    className="relative w-[95%] h-full resize-none placeholder:text-center focus:outline-none mt-[1rem]"
                                    value={point}
                                    onChange={(e) => {
                                        handleLegInputChange(activeLeg.id, 'highlights', e.target.value, idx)
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.shiftKey && e.key === 'Enter') {
                                            e.preventDefault()
                                            handleLegInputChange(activeLeg.id, 'highlights', '', idx + 1)
                                            setTimeout(() => {
                                                highlightsTextareaRef.current[idx + 1]?.focus();
                                            }, 1)
                                        }
                                    }}
                                />
                                <button
                                    className='absolute top-0 right-0 w-[2rem] h-[2rem] p-1 rounded-full bg-red-500 hover:bg-red-700 active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer'
                                    onClick={() => handleDeleteLegPoints('highlights', idx)}
                                >
                                    <img src={deleteIcon} alt='delete icon' />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="relative flex-1">
                        {activeLeg.legData.challenges.map((point, idx) => (
                            <div
                                key={idx}
                                className="relative w-full mt-[1rem] flex items-center"
                            >
                                <textarea 
                                    ref={(el) => {
                                        challengesTextareaRef.current[idx] = el
                                        if(el){
                                            handleChallengesInput(idx)
                                        }
                                    }}
                                    onInput={() => handleChallengesInput(idx)}
                                    placeholder="Challenges"
                                    className="w-[95%] h-full resize-none placeholder:text-center focus:outline-none mt-[1rem]"
                                    value={point}
                                    onChange={(e) => {
                                        handleLegInputChange(activeLeg.id, 'challenges', e.target.value, idx)
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.shiftKey && e.key === 'Enter') {
                                            e.preventDefault()
                                            handleLegInputChange(activeLeg.id, 'challenges', '', idx + 1)
                                            setTimeout(() => {
                                                challengesTextareaRef.current[idx + 1]?.focus();
                                            }, 1)
                                        }
                                    }}
                                />
                                <button
                                    className='absolute top-0 right-0 w-[2rem] h-[2rem] p-1 rounded-full bg-red-500 hover:bg-red-700 active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer'
                                    onClick={() => handleDeleteLegPoints('challenges', idx)}
                                >
                                    <img src={deleteIcon} alt='delete icon' />
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            }
        </div>
    )
}

export default LegSecondLayer
