import homeIcon from '../../assets/icons/home_25dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png'
import exploreIcon from '../../assets/icons/explore_25dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png'
import profileIcon from '../../assets/icons/account_circle_25dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png'
import { useNavigationContext } from '../../contexts/navigationContext'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {

    const navigate = useNavigate()

    const {sideBarCategory, setSideBarCategory} = useNavigationContext()

    return (
        <div className="fixed
                        2xl:top-[4rem] 2xl:w-[15rem] 2xl:h-full
                        3xl:top-[5rem] 3xl:w-[17rem] 2xl:h-full">
            <div className="flex flex-col gap-y-2 w-full h-full box-border p-2 items-center overflow-y-auto
                            2xl:p-4
                            3xl:px-5">
                <button 
                    onClick={() => {
                        if(sideBarCategory !== 'home'){
                            setSideBarCategory('home')
                            navigate('/home')
                        }
                    }}
                    className="w-full flex justify-start items-center gap-x-5 p-1 rounded-2xl hover:bg-red-500 active:bg-red-700 transition-all duration-300 ease-in-out cursor-pointer
                    2xl:px-5 2xl:py-2
                    3xl:px-6 3xl:py-3 3xl:text-[1.2rem]"
                    style={sideBarCategory === 'home' ? {backgroundColor: "red"} : {}}
                >   
                    <img
                        className='align-center 3xl:w-[1.7rem] 3xl:h-[1.7rem]' 
                        src={homeIcon} 
                        alt="Home Icon" 
                    />
                    <p className='font-semibold'>Home</p>
                </button> 
                <button 
                    onClick={() => {
                        if(sideBarCategory !== 'explore'){
                            setSideBarCategory('explore')
                            navigate('/explore')
                        }
                    }} 
                    className="w-full flex justify-start items-center gap-x-5 p-1 rounded-2xl hover:bg-red-500 active:bg-red-700 transition-all duration-300 ease-in-out cursor-pointer
                    2xl:px-5 2xl:py-2
                    3xl:px-6 3xl:py-3 3xl:text-[1.2rem]"
                    style={sideBarCategory === 'explore' ? {backgroundColor: "red"} : {}}
                >   
                    <img 
                        className='align-center 3xl:w-[1.7rem] 3xl:h-[1.7rem]' 
                        src={exploreIcon} 
                        alt="Explore Icon"
                    />
                    <p className='font-semibold'>Explore</p>
                </button> 

                <div className='bg-red-500 h-[0.1rem] w-[90%] my-[1rem]'></div>

                <button 
                    onClick={() => {
                        if(sideBarCategory !== 'profile'){
                            setSideBarCategory('profile')
                            navigate('/profile')
                        }
                    }} 
                    className="w-full flex justify-start items-center gap-x-5 p-1 rounded-2xl hover:bg-red-500 active:bg-red-700 transition-all duration-300 ease-in-out cursor-pointer
                    2xl:px-5 2xl:py-2
                    3xl:px-6 3xl:py-3 3xl:text-[1.2rem]"
                    style={sideBarCategory === 'profile' ? {backgroundColor: "red"} : {}}
                >   
                    <img 
                        className='align-center 3xl:w-[1.7rem] 3xl:h-[1.7rem]' 
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

