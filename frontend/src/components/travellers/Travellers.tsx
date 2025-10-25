import Sidebar from "../sidebar/Sidebar"
import TopBar from "../topbar/TopBar"


const Travellers = () => {
    return (
        <div className="w-screen h-screen">
            <TopBar/>
            <Sidebar/>
            <div 
                className="fixed h-[90%] bottom-0 right-0 flex flex-col
                            2xl:top-[4rem] 2xl:left-[15rem]
                            3xl:top-[5rem] 3xl:left-[17rem]"
            >

            </div>
        </div>
    )
}

export default Travellers
