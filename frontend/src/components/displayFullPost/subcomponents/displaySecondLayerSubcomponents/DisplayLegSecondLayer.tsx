

import {useRef} from "react"
import type { IndividualLeg_Interface} from "../../../../configs/types_and_interfaces";


type DisplayThirdLayerProps = {
    activeDisplayLeg: IndividualLeg_Interface | undefined
}

const DisplayLegSecondLayer = ({activeDisplayLeg}: DisplayThirdLayerProps) => {


    const highlightsParagraphRef = useRef<(HTMLParagraphElement | null)[]>([])
    const challengesParagraphRef = useRef<(HTMLParagraphElement | null)[]>([])

    
    const handleHighlightsInput = (idx: number):void => {
        const highlightsParagraph = highlightsParagraphRef.current[idx]
        if(!highlightsParagraph) return

        highlightsParagraph.style.height = 'auto'
        highlightsParagraph.style.height = Math.min(highlightsParagraph.scrollHeight, 480) + 'px'
    }

    const handleChallengesInput = (idx: number):void => {
        const challengesParagraph = challengesParagraphRef.current[idx]
        if(!challengesParagraph) return

        challengesParagraph.style.height = 'auto'
        challengesParagraph.style.height = Math.min(challengesParagraph.scrollHeight, 480) + 'px'
    }


    return (
        <div className="flex flex-row w-full min-h-[10rem] max-h-fit gap-x-[2rem]">
            {activeDisplayLeg && 
                <>
                    <div className="relative flex-1">
                        {activeDisplayLeg.highlights.map((point, idx) => (
                            <div 
                                key={idx}
                                className="relative w-full mt-[1rem] flex items-center"
                            >
                                <p
                                    ref={(el) => {
                                        highlightsParagraphRef.current[idx] = el
                                        if(el){
                                            handleHighlightsInput(idx)
                                        }
                                    }}
                                    onInput={() => handleHighlightsInput(idx)}
                                    className="relative w-[95%] h-full resize-none placeholder:text-center focus:outline-none mt-[1rem]"
                                >
                                    {point}
                                </p>
                                    
                            </div>
                        ))}
                    </div>
                    <div className="relative flex-1">
                        {activeDisplayLeg.challenges.map((point, idx) => (
                            <div 
                                key={idx}
                                className="relative w-full mt-[1rem] flex items-center"
                            >
                                <p
                                    ref={(el) => {
                                        challengesParagraphRef.current[idx] = el
                                        if(el){
                                            handleChallengesInput(idx)
                                        }
                                    }}
                                    onInput={() => handleChallengesInput(idx)}
                                    className="relative w-[95%] h-full resize-none placeholder:text-center focus:outline-none mt-[1rem]"
                                >
                                    {point}
                                </p>
                                    
                            </div>
                        ))}
                    </div>
                </>
            }
        </div>
    )
}

export default DisplayLegSecondLayer
