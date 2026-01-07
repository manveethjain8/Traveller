import { useEffect, useMemo, useRef, useState } from "react"
import type { AdditionalInformationType, PlaceImage, PlaceInfo } from "../../../../../configs/types_and_interfaces"

import arrowBackward from '../../../../../assets/icons/arrow_back_ios_100dp_E3E3E3_FILL0_wght700_GRAD0_opsz48.png'
import arrowForward from '../../../../../assets/icons/arrow_forward_ios_100dp_E3E3E3_FILL0_wght700_GRAD0_opsz48.png'

type PlaceInfoProviderProps = {
    placeImages: PlaceImage[] | undefined
    placeText: PlaceInfo | undefined
}

const Introduction = ({placeImages, placeText}: PlaceInfoProviderProps) => {

    const [index, setIndex] = useState<number>(1)
    const timeOutId = useRef<ReturnType<typeof setTimeout> |  null>(null)
    const [transition, setTransition] = useState<boolean>(true)

    const images = useMemo(() => {
        const imgs = placeImages
        if (!Array.isArray(imgs) || imgs.length === 0) return []
        return [
            imgs[imgs.length - 1],
            ...imgs,
            imgs[0]
        ]
    },[placeImages, placeImages])

    useEffect(() => {
            timeOutId.current = setTimeout(() => {
                handleTransition(1)
            }, 5000)

            return () => {
                if(timeOutId.current){
                    clearTimeout(timeOutId.current)
                }
            }
        }, [index, images.length])

    const handleTransition = (type: number): void => {
        if(!images.length) return

        if(type === 0){
            setIndex(prev => prev - 1)
        }else if(type === 1){
            setIndex(prev => prev + 1)
        }else if(type === 2){
            if(index === images.length - 1){
                setTransition(false)
                setIndex(1)
            }

            if(index === 0){
                setTransition(false)
                setIndex(images.length - 2)
            }
        }
    }

    useEffect(() => {
        if(!transition){
            requestAnimationFrame(() => {
                requestAnimationFrame(() => setTransition(true))
            })
        }
    }, [transition])


    return (
        <div className="w-full h-full flex flex-col">
            <div className="w-full h-full flex-2 max-h-[27rem] flex flex-col py-2">
                <p className="w-full text-center font-bold">{placeText?.name}</p>
                <p className="w-full text-center">{placeText?.facts.state ?? 'state unknown'} , {placeText?.facts.country ??  'country unknown'}</p>
                <p className="w-full text-center ">{placeText?.coordinates.lat} , {placeText?.coordinates.lon}</p>
                <div className="relative w-full h-full max-h-[20rem] flex flex-row justify-center items-center gap-x-2 ">
                    <button
                        onClick={() => handleTransition(0)}
                        className="w-[4rem] h-[20%] hover:bg-red-600 active:bg-red-700 transition-all duration-200 ease-in-out cursor-pointer rounded-full p-2"
                    >
                        <img 
                            src={arrowBackward} 
                            alt="arrow-backward" 
                            className="w-full h-full pl-2"    
                        />
                    </button>
                    <div className="relative w-[50%] h-full overflow-hidden">
                        {images.length > 1 ? (
                            <div
                                className={`flex h-[100%] ${
                                    transition ? "transition-transform duration-500 ease-in-out" : ""
                                }`}
                                style={{ transform: `translateX(-${index * 100}%)` }}
                                onTransitionEnd={(_e) => handleTransition(2)}
                            >
                                {images.map((img, idx) => (
                                    <div key={idx} className="w-full h-full flex-shrink-0">
                                        <img
                                            src={img.url}
                                            alt="place image"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="w-full h-full text-center absolute top-[45%]">No Images Found!!!</p>
                        )}
                    </div>
                    <button
                        onClick={() => handleTransition(1)}
                        className="w-[4rem] h-[20%] hover:bg-red-600 active:bg-red-700 transition-all duration-200 ease-in-out cursor-pointer rounded-full p-2"
                    >
                        <img 
                            src={arrowForward} 
                            alt="arrow-backward" 
                            className="w-full h-full"    
                        />
                    </button>
                </div>
            </div>
            <div className="w-full h-full flex-1">
                <p className="text-[1rem] text-center">{placeText?.summary}</p>
            </div>
        </div>
    )
}

export default Introduction
