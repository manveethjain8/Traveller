import { useNavigate } from "react-router-dom"
import { useSitrepContext } from "../../../contexts/sitrepContext"
import { useStartupContext } from "../../../contexts/startupContext"

const Sitrep = () => {

    const {limitedUserInfo, setSideBarCategory} = useStartupContext()
    const {userSitreps, setDisplaySitreps, setSitrepNumber} = useSitrepContext()

    const navigate = useNavigate()

    console.log("User",userSitreps)

    return (
        <div className="w-full h-[15%] flex flex-row justify-center items-center">
            <div className="h-full flex flex-1 justify-center items-center">
                <div className="w-[70%] flex justify-center items-center aspect-square rounded-full ring-2 ring-orange-500 ring-offset-1 ring-offset-transparent">
                    <div className="w-[90%] aspect-square rounded-full"
                        onClick={() => {
                            setSideBarCategory('undifined')
                            setDisplaySitreps(userSitreps)
                            setSitrepNumber(0)
                            navigate('/displaySitrep')
                        }}
                    >
                        <img 
                            className="w-full h-full rounded-full object-cover object-center"
                            src={limitedUserInfo?.profilePicture} 
                            alt="profile picture" 
                        />
                    </div>
                </div>
            </div>
            <div className="bg-red-500 h-[80%] w-[0.1rem] mx-[0.1rem]"></div>
            <div className="h-full flex flex-10"></div>
        </div>
    )
}

export default Sitrep
