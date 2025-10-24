import { useRef } from "react"
import Sidebar from "../sidebar/Sidebar"
import TopBar from "../topbar/TopBar"
import Posts from "./subcomponents/Posts"
import Sitrep from "./subcomponents/Sitrep"

const Home = () => {

    const scrollContainerRef = useRef<HTMLDivElement | null>(null)

    return (
        <div className="w-screen h-screen">
            <TopBar/>
            <Sidebar/>
            <div 
                className="fixed h-[90%] bottom-0 right-0 flex flex-col
                            2xl:top-[4rem] 2xl:left-[15rem]
                            3xl:top-[5rem] 3xl:left-[17rem]"
            >
                {/* Start of Sitrep display */}
                    <Sitrep/>
                {/* End of Sitrep display */}
                {/* Start of Posts display */}
                <div
                    ref={scrollContainerRef} 
                    className="flex-1 h-full flex overflow-y-auto">
                    <Posts scrollContainerRef={scrollContainerRef}/>
                </div>
                {/* End of Posts display */}
            </div>
        </div>
    )
}

export default Home
