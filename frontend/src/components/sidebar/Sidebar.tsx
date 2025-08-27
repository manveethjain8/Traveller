import homeIcon from '../../assets/icons/home_25dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png'
import exploreIcon from '../../assets/icons/explore_25dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png'

const Sidebar = () => {
    return (
        <div className="fixed bg-blue-500
                        2xl:top-[4rem] 2xl:w-[15rem] 2xl:h-full
                        3xl:top-[5rem] 3xl:w-[17rem] 2xl:h-full">
            <div className="flex flex-col gap-y-2 w-full h-full box-border p-2 items-center overflow-y-auto
                            2xl:p-4
                            3xl:px-5">
                <button 
                    className="w-full flex justify-start items-center gap-x-5 p-1 rounded-2xl hover:bg-red-500 active:bg-red-700 transition-all duration-400 ease-in-out cursor-pointer
                    2xl:px-5 2xl:py-2
                    3xl:px-6 3xl:py-3 3xl:text-[1.2rem]"
                >   
                    <img
                        className='align-center 3xl:w-[1.7rem] 3xl:h-[1.7rem]' 
                        src={homeIcon} 
                        alt="Home Icon" 
                    />
                    <p className='font-semibold'>Home</p>
                </button> 
                <button 
                    className="w-full flex justify-start items-center gap-x-5 p-1 rounded-2xl hover:bg-red-500 active:bg-red-700 transition-all duration-400 ease-in-out cursor-pointer
                    2xl:px-5 2xl:py-2
                    3xl:px-6 3xl:py-3 3xl:text-[1.2rem]"
                >   
                    <img 
                        className='align-center 3xl:w-[1.7rem] 3xl:h-[1.7rem]' 
                        src={exploreIcon} 
                        alt="Explore Icon"
                    />
                    <p className='font-semibold'>Explore</p>
                </button>  
            </div>
        </div>
    )
}

export default Sidebar

