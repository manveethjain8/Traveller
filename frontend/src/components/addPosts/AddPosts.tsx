import { useAddPostContext } from "../../contexts/addPostContext"
import Sidebar from "../sidebar/Sidebar"
import TopBar from "../topbar/TopBar"
import FirstLayer from "./subcomponents/FirstLayer"
import SecondLayer from "./subcomponents/SecondLayer"
import ThirdLayer from "./subcomponents/ThirdLayer"


const AddPosts = () => {

    const {uploading} = useAddPostContext()

    return (
        <div className="w-screen h-screen">
            {uploading && 
                <div className='z-100 fixed w-screen h-screen bg-black/70 flex justify-center items-center'>
                    <strong className="text-[2rem]">Uploading...</strong>
                </div>
            }
            <TopBar/>
            <Sidebar/>
            <div 
                className="fixed bottom-0 right-0 flex flex-col gap-y-3 overflow-y-auto
                            2xl:top-[4rem] 2xl:left-[15rem]
                            3xl:top-[5rem] 3xl:left-[17rem]"
            >
                <div className="flex flex-row">
                    <FirstLayer/>
                </div>
                <div className="flex">
                    <SecondLayer/>
                </div>
                    
                <div className="flex">
                    <ThirdLayer/>
                </div>
            </div>
        </div>
    )
}

export default AddPosts