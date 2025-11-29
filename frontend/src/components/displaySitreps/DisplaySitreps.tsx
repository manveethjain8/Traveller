import { useSitrepContext } from "../../contexts/sitrepContext"
import Sidebar from "../sidebar/Sidebar"
import TopBar from "../topbar/TopBar"
import SitrepDescriptionDisplay from "./subcomponents/SitrepDescriptionDisplay"
import SitrepImagesDisplay from "./subcomponents/SitrepImagesDisplay"


const DisplaySitreps = () => {

    const {displaySitreps, sitrepNumber, selectedSitrep} = useSitrepContext()

    let positions: number[] = []
    const total = displaySitreps && displaySitreps.length || 0
    const visibleRange = 1
    let start = 0
    let end = 0

    if (total > 0) {
        start = Math.max(1, sitrepNumber + 1 - visibleRange)
        end = Math.min(total, sitrepNumber + 1 + visibleRange)
        positions = Array.from({ length: end - start + 1 }, (_, i) => start + i)
    }

    return (
        <div className="w-screen h-screen flex">
            <TopBar/>
            <Sidebar/>
            <div 
                className="fixed bottom-0 right-0 flex flex-col gap-y-3
                            2xl:top-[4rem] 2xl:left-[15rem]
                            3xl:top-[5rem] 3xl:left-[17rem]"
            >
                    <div className="h-[60%] w-[3rem] fixed bottom-[30%] right-[5%]">
                </div>
                <div className="flex flex-4 w-full max-h-[80%]">
                    <SitrepImagesDisplay selectedSitrep={selectedSitrep} sitrepNumber={sitrepNumber} positions={positions} total={total}/>
                </div>
                <div className="flex flex-1 w-full max-h-[20%]">
                    <SitrepDescriptionDisplay selectedSitrep={selectedSitrep}/>
                </div>
            </div>
        </div>
    )
}

export default DisplaySitreps
