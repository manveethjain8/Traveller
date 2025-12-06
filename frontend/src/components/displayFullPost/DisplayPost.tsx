import Sidebar from "../sidebar/Sidebar"
import TopBar from "../topbar/TopBar"
import DisplayFirstLayer from "./subcomponents/DisplayFirstLayer"
import DisplaySecondLayer from "./subcomponents/DisplaySecondLayer"
import DisplayThirdLayer from "./subcomponents/DisplayThirdLayer"


const DisplayPost = () => {
    return (
        <div className="w-screen h-screen">
            <TopBar/>
            <Sidebar/>
            <div 
                className="fixed bottom-0 right-0 flex flex-col gap-y-3 overflow-y-auto
                            2xl:top-[4rem] 2xl:left-[15rem]
                            3xl:top-[5rem] 3xl:left-[17rem]"
            >
                <div className="flex flex-row">
                    <DisplayFirstLayer/>
                </div>
                <div className="flex">
                    <DisplaySecondLayer/>
                </div>
                    
                <div className="flex">
                    <DisplayThirdLayer/>
                </div>
            </div>
        </div>
    )
}

export default DisplayPost