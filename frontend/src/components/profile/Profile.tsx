import TopBar from "../topbar/TopBar"
import Sidebar from "../sidebar/Sidebar"
import AccountInfo from "./subcomponents/AccountInfo"
import AccountPosts from "./subcomponents/AccountPosts"

const Profile = () => {
    return (
        <div className="w-screen h-screen">
            <TopBar/>
            <Sidebar/>
            <div 
                className="fixed bottom-0 right-0
                            2xl:top-[4rem] 2xl:left-[15rem]
                            3xl:top-[5rem] 3xl:left-[17rem]"
            >
                <div className="w-full h-full flex flex-col">
                    <AccountInfo/>
                    <AccountPosts/>
                </div>
            </div>
        </div>
    )
}

export default Profile
