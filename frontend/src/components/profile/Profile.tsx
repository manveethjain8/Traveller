import TopBar from "../topbar/TopBar"
import Sidebar from "../sidebar/Sidebar"
import AccountInfo from "./subcomponents/AccountInfo"
import AccountPosts from "./subcomponents/AccountPosts"
import { useProfileContext } from "../../contexts/profileContext"
import EditProfile from "./subcomponents/EditProfile"
import { useEffect } from "react"


const Profile = () => {

    const {editProfileClicked, getAccountDetails} = useProfileContext()

    useEffect(() => {
        const surviveRefresh = (): void => {
            const saved = sessionStorage.getItem('searchedAccountId')
            if(saved){
                getAccountDetails(saved)
            }
        }
        setTimeout(() => {
            surviveRefresh()
        }, 1)
    },[])

    return (
        <div className="w-screen h-screen">
            <TopBar/>
            <Sidebar/>
            <div 
                className="fixed bottom-0 right-0
                            2xl:top-[4rem] 2xl:left-[15rem]
                            3xl:top-[5rem] 3xl:left-[17rem]"
            >
                {/* Start of Profile Display */}
                <AccountInfo/>
                <AccountPosts/>
                {/* End of Profile Display */}

            </div>
            {/* Start of Edit Profile */}
            {editProfileClicked === true ? <EditProfile/> : ''}
            {/* End of Edit Profile */}
        </div>
    )
}

export default Profile
