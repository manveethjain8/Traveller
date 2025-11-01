import Sidebar from "../sidebar/Sidebar"
import TopBar from "../topbar/TopBar"
import SitrepDescriptionReception from "./subcomponents/SitrepDescriptionReception"
import SitrepImagesReception from "./subcomponents/SitrepImagesReception"


const AddSitreps = () => {
    return (
        <div className="w-screen h-screen">
            <TopBar/>
            <Sidebar/>
            <div 
                className="fixed bottom-0 right-0 flex flex-col gap-y-3
                            2xl:top-[4rem] 2xl:left-[15rem]
                            3xl:top-[5rem] 3xl:left-[17rem]"
            >
                <div className="flex flex-4 w-full max-h-[80%]">
                    <SitrepImagesReception/>
                </div>
                <div className="flex flex-1 w-full max-h-[20%]">
                    <SitrepDescriptionReception/>
                </div>
            </div>
        </div>
    )
}

export default AddSitreps
