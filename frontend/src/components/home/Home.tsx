import { useNavigationContext } from "../../contexts/navigationContext"
import Sidebar from "../sidebar/Sidebar"
import TopBar from "../topbar/TopBar"
import Posts from "./subcomponents/Posts"
import Sitrep from "./subcomponents/Sitrep"

const Home = () => {

    const {sideBarCategory} = useNavigationContext()

    return (
        <div className="w-screen h-screen">
            <TopBar/>
            <Sidebar/>
            <div 
                className="fixed bottom-0 right-0 flex flex-col
                            2xl:top-[4rem] 2xl:left-[15rem]
                            3xl:top-[5rem] 3xl:left-[17rem]"
            >
                {/* Start of Sitrep display */}
                {sideBarCategory === 'home' ? (
                    <Sitrep/>
                ) : ('')}
                {/* End of Sitrep display */}
                {/* Start of Posts display */}
                {sideBarCategory === 'home' ? (
                    <div className="flex-1 flex">
                        <Posts/>
                    </div>
                ) : ('')}
                {/* End of Posts display */}
            </div>
        </div>
    )
}

export default Home
