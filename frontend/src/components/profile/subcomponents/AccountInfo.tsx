import pp from '../../../assets/background_images/authenticate_page_background.jpg'
import { useProfileContext } from '../../../contexts/profileContext'

const AccountInfo = () => {

    const {setEditProfileClicked} = useProfileContext()

    return (
        <div className="flex flex-1 w-full justify-center
                        2xl:max-h-[10rem] 2xl:gap-x-10
                        3xl:max-h-[12rem]">
            <div className="flex flex-1 h-full box-border
                            2xl:p-2 2xl:gap-x-2>
                            2xl:p-3 2xl:gap-x-3">
                {/* Start of Profile Picture Box*/}
                <div className="flex flex-row">
                    <img
                        className='rounded-full
                                    2xl:w-[9rem] 2xl:h-[9rem]
                                    3xl:w-[11rem] 3xl:h-[11rem]' 
                        src={pp} 
                        alt="Profile Picture" />
                </div>
                {/* End of Profile Picture Box*/}

                {/* Start of User's Name and Native*/}
                <div className='flex flex-1 flex-col justify-center 2xl:gap-y-1'>
                    <div className='w-full flex flex-row
                                    2xl:gap-x-2'>
                        <strong className='3xl:text-[1.1rem]'>Manveeth</strong>
                        <p className='h-fit w-fit 2xl:mt-[-1.4rem] 2xl:text-[2rem] 3xl:mt-[-1.3rem]'>.</p>
                        <strong className='3xl:text-[1.1rem]'>Jain</strong>
                    </div>
                    <div className='w-full flex flex-row
                                    2xl:gap-x-2'>
                        <p className='3xl:text-[1.1rem]'>Mysuru</p>
                        <p className='h-fit w-fit 2xl:mt-[-1.4rem] 2xl:text-[2rem] 3xl:mt-[-1.3rem]'>.</p>
                        <p className='3xl:text-[1.1rem]'>Karnataka</p>
                    </div>
                    <div className='w-full flex flex-row
                                    2xl:gap-x-2'>
                        <p className='3xl:text-[1.1rem]'>India</p>
                    </div>
                    <button
                        onClick={() => setEditProfileClicked(prev => !prev)}
                        className='bg-red-500 w-full rounded-2xl mt-[0.2rem] hover:bg-white hover:text-red-500 active:text-white active:bg-red-700 transition-all duration-300 cursor-pointer
                                    2xl:h-[1.5rem]'
                    >
                        Edit Profile
                    </button>
                </div>
                {/* End of User's Name and Native*/}
            </div>

            {/* Start of User's tag line */}
            <div className="flex flex-2 justify-center items-center h-full box-border 2xl:p-2">
                <strong className='font-[Avenir] 2xl:text-[1rem] 3xl:text-[1.1rem]'>
                    <span className='text-red-500 2xl:text-[1rem]'>" </span>
                        Travel is not just about where you go, but how deeply the journey changes you. Every step holds a story, every mile a memory.
                    <span className='text-red-500 2xl:text-[1.2rem]'> "</span>
                </strong>
            </div>
            {/* Start of User's tag line */}

            {/* Start of Accounts Statisticks */}
            <div className="flex flex-[0.75] h-full box-border items-center justify-center
                            2xl:p-2 2xl:gap-x-5
                            3xl:text-[1.1rem]">
                <div className='flex flex-col items-center'>
                    <p>Posts</p>
                    <p>0</p>
                </div>
                <div className='flex flex-col items-center'>
                    <p>Followers</p>
                    <p>0</p>
                </div>
                <div className='flex flex-col items-center'>
                    <p>Following</p>
                    <p>0</p>
                </div>
            </div>
            {/* Start of Accounts Statisticks */}
        </div>
    )
}

export default AccountInfo
