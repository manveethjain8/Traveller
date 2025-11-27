import homeIcon from '../../assets/icons/home_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png'
import exploreIcon from '../../assets/icons/explore_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png'
import profileIcon from '../../assets/icons/account_circle_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png'
import addPostIcon from '../../assets/icons/post_add_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png'
import addSitRepIcon from '../../assets/icons/amp_stories_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png'
import travellerIcon from '../../assets/icons/hiking_50dp_E3E3E3_FILL0_wght700_GRAD0_opsz40.png'

import { useNavigate } from 'react-router-dom'
import { useProfileContext } from '../../contexts/profileContext'
import { useStartupContext } from '../../contexts/startupContext'

const Sidebar = () => {

    const navigate = useNavigate()

    const {activeAccountId, sideBarCategory, setSideBarCategory, setNavigationCategorytoLocalStorage} = useStartupContext()
    const {getAccountDetails} = useProfileContext()

    return (
        <div className="fixed
                        2xl:top-[4rem] 2xl:w-[15rem] 2xl:h-full
                        3xl:top-[5rem] 3xl:w-[17rem] 2xl:h-full">
            <div className="flex flex-col gap-y-2 w-full h-full box-border p-2 items-center overflow-y-auto
                            2xl:p-4
                            3xl:px-5">
                <button 
                    onClick={() => {
                        setSideBarCategory('home')
                        setNavigationCategorytoLocalStorage('home')
                        navigate('/home')
                    }}
                    className="w-full flex justify-start items-center gap-x-5 p-1 rounded-2xl hover:bg-red-500 active:bg-red-700 transition-all duration-300 ease-in-out cursor-pointer
                    2xl:px-5 2xl:py-2 2xl:h-[6%]
                    3xl:px-6 3xl:py-3 3xl:text-[1.2rem]"
                    style={sideBarCategory === 'home' ? {backgroundColor: "red"} : {}}
                >   
                    <img
                        className='align-center 2xl:w-[2rem] 3xl:w-[1.7rem] 3xl:h-[1.7rem]' 
                        src={homeIcon} 
                        alt="Home Icon" 
                    />
                    <p className='font-semibold'>Home</p>
                </button> 

                <button 
                    onClick={() => {
                        setSideBarCategory('explore')
                        setNavigationCategorytoLocalStorage('explore')
                        navigate('/explore')
                    }} 
                    className="w-full flex justify-start items-center gap-x-5 p-1 rounded-2xl hover:bg-red-500 active:bg-red-700 transition-all duration-300 ease-in-out cursor-pointer
                    2xl:px-5 2xl:py-2 2xl:h-[6%]
                    3xl:px-6 3xl:py-3 3xl:text-[1.2rem]"
                    style={sideBarCategory === 'explore' ? {backgroundColor: "red"} : {}}
                >   
                    <img 
                        className='align-center 2xl:w-[2rem] 3xl:w-[1.7rem] 3xl:h-[1.7rem]' 
                        src={exploreIcon} 
                        alt="Explore Icon"
                    />
                    <p className='font-semibold'>Explore</p>
                </button> 

                <button 
                    onClick={() => {
                        setSideBarCategory('travellers')
                        setNavigationCategorytoLocalStorage('travellers')
                        navigate('/travellers')
                    }} 
                    className="w-full flex justify-start items-center gap-x-5 p-1 rounded-2xl hover:bg-red-500 active:bg-red-700 transition-all duration-300 ease-in-out cursor-pointer
                    2xl:px-5 2xl:py-2 2xl:h-[6%]
                    3xl:px-6 3xl:py-3 3xl:text-[1.2rem]"
                    style={sideBarCategory === 'travellers' ? {backgroundColor: "red"} : {}}
                >   
                    <img 
                        className='align-center 2xl:w-[2rem] 3xl:w-[1.7rem] 3xl:h-[1.7rem]' 
                        src={travellerIcon} 
                        alt="Travellers Icon"
                    />
                    <p className='font-semibold'>Travellers</p>
                </button> 

                <div className='bg-red-500 h-[0.1rem] w-[90%] my-[1rem]'></div>

                <button 
                    onClick={() => {
                        setSideBarCategory('addSitrep')
                        setNavigationCategorytoLocalStorage('addSitrep')
                        navigate('/addSitrep')
                    }} 
                    className="w-full flex justify-start items-center gap-x-5 p-1 rounded-2xl hover:bg-red-500 active:bg-red-700 transition-all duration-300 ease-in-out cursor-pointer
                    2xl:px-5 2xl:py-2 2xl:h-[6%]
                    3xl:px-6 3xl:py-3 3xl:text-[1.2rem]"
                    style={sideBarCategory === 'addSitrep' ? {backgroundColor: "red"} : {}}
                >   
                    <img 
                        className='align-center 2xl:w-[2rem] 3xl:w-[1.7rem] 3xl:h-[1.7rem]' 
                        src={addSitRepIcon} 
                        alt="Add Post Icon"
                    />
                    <p className='font-semibold'>Add Sitrep</p>
                </button> 

                <button 
                    onClick={() => {
                        setSideBarCategory('addPost')
                        setNavigationCategorytoLocalStorage('addPost')
                        navigate('/addPost')
                    }} 
                    className="w-full flex justify-start items-center gap-x-5 p-1 rounded-2xl hover:bg-red-500 active:bg-red-700 transition-all duration-300 ease-in-out cursor-pointer
                    2xl:px-5 2xl:py-2 2xl:h-[6%]
                    3xl:px-6 3xl:py-3 3xl:text-[1.2rem]"
                    style={sideBarCategory === 'addPost' ? {backgroundColor: "red"} : {}}
                >   
                    <img 
                        className='align-center 2xl:w-[2rem] 3xl:w-[1.7rem] 3xl:h-[1.7rem]' 
                        src={addPostIcon} 
                        alt="Add Post Icon"
                    />
                    <p className='font-semibold'>Add Post</p>
                </button> 

                <div className='bg-red-500 h-[0.1rem] w-[90%] my-[1rem]'></div>

                <button 
                    onClick={() => {
                        setSideBarCategory('profile')
                        setNavigationCategorytoLocalStorage('profile')
                        sessionStorage.removeItem('searchedAccountId')
                        getAccountDetails(activeAccountId)
                        navigate('/profile')

                    }} 
                    className="w-full flex justify-start items-center gap-x-5 p-1 rounded-2xl hover:bg-red-500 active:bg-red-700 transition-all duration-300 ease-in-out cursor-pointer
                    2xl:px-5 2xl:py-2 2xl:h-[6%]
                    3xl:px-6 3xl:py-3 3xl:text-[1.2rem]"
                    style={sideBarCategory === 'profile' ? {backgroundColor: "red"} : {}}
                >   
                    <img 
                        className='align-center 2xl:w-[2rem] 3xl:w-[1.7rem] 3xl:h-[1.7rem]' 
                        src={profileIcon} 
                        alt="profile Icon"
                    />
                    <p className='font-semibold'>Profile</p>
                </button>  

            </div>
        </div>
    )
}

export default Sidebar

