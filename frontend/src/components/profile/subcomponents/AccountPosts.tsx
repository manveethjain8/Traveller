import publicIcon from '../../../assets/icons/public_30dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png'
import privateIcon from '../../../assets/icons/public_off_30dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png'
import starIcon from '../../../assets/icons/star_30dp_E3E3E3_FILL1_wght400_GRAD0_opsz24 .png'

const AccountPosts = () => {
    return (
        <div className="bg-red-500 w-full h-full flex flex-col">
            
            {/* Start of switch bar */}
            <div className="bg-green-500 w-full h-full flex justify-center
                            2xl:max-h-[2.5rem] 2xl:gap-x-[2rem]"
            >
                <button><img 
                    className='rounded-full hover:bg-red-500 active:bg-red-700 transition-all duration-300 ease-in-out cursor-pointer 
                                2xl:p-1'
                    src={publicIcon} alt="Public" 
                /></button>
                <button><img 
                    className='rounded-full hover:bg-red-500 active:bg-red-700 transition-all duration-300 ease-in-out cursor-pointer 
                                2xl:p-1'
                    src={privateIcon} alt="Private" 
                /></button>
                <button><img 
                    className='rounded-full hover:bg-red-500 active:bg-red-700 transition-all duration-300 ease-in-out cursor-pointer 
                                2xl:p-1'
                    src={starIcon} alt="Star" 
                /></button>
            </div>
            {/* End of switch bar */}

            {/* Posts Display */}
            <div className='bg-blue-500 flex-1 grid box-border overflow-y-auto justify-items-center
                            2xl:grid-cols-5 2xl:p-5 2xl:pb-[11rem] 2xl:gap-y-2'>
                <div className='bg-yellow-500
                                2xl:w-[15rem] 2xl:h-[20rem]'>
                </div>
                <div className='bg-yellow-500
                                2xl:w-[15rem] 2xl:h-[20rem]'>
                </div>
                <div className='bg-yellow-500
                                2xl:w-[15rem] 2xl:h-[20rem]'>
                </div>
                <div className='bg-yellow-500
                                2xl:w-[15rem] 2xl:h-[20rem]'>
                </div>
                <div className='bg-yellow-500
                                2xl:w-[15rem] 2xl:h-[20rem]'>
                </div>
                <div className='bg-yellow-500
                                2xl:w-[15rem] 2xl:h-[20rem]'>
                </div>
                <div className='bg-yellow-500
                                2xl:w-[15rem] 2xl:h-[20rem]'>
                </div>
                <div className='bg-yellow-500
                                2xl:w-[15rem] 2xl:h-[20rem]'>
                </div>
                <div className='bg-yellow-500
                                2xl:w-[15rem] 2xl:h-[20rem]'>
                </div>
                <div className='bg-yellow-500
                                2xl:w-[15rem] 2xl:h-[20rem]'>
                </div>
                <div className='bg-yellow-500
                                2xl:w-[15rem] 2xl:h-[20rem]'>
                </div>
                <div className='bg-yellow-500
                                2xl:w-[15rem] 2xl:h-[20rem]'>
                </div>
                <div className='bg-yellow-500
                                2xl:w-[15rem] 2xl:h-[20rem]'>
                </div>
            </div>
            {/* Posts Display */}
        </div>
    )
}

export default AccountPosts
