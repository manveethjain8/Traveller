import Sidebar from "../sidebar/Sidebar"
import TopBar from "../topbar/TopBar"
import SecondLayer from "./subcomponents/SecondLayer"
import TopLayer from "./subcomponents/TopLayer"


const AddPosts = () => {
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
                    <TopLayer/>
                </div>
                <div className="flex">
                    <SecondLayer/>
                </div>
                    
                <div className="bg-green-500"></div>
            </div>
        </div>
    )
}

export default AddPosts
