import publicIcon from '../../../assets/icons/public_30dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png'
import privateIcon from '../../../assets/icons/public_off_30dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png'
import starIcon from '../../../assets/icons/star_30dp_E3E3E3_FILL1_wght400_GRAD0_opsz24 .png'
import { useProfileContext } from '../../../contexts/profileContext'

const AccountPosts = () => {

    const {postsCategory, setPostCategory} = useProfileContext()

    return (
        <div className="w-full h-full flex flex-col">
            
            {/* Start of switch bar */}
            <div className="w-full h-full flex justify-center
                            2xl:max-h-[4rem] 2xl:gap-x-[2rem]"
            >
                <button
                    onClick={() => {
                        if(postsCategory !== 'public'){
                            setPostCategory('public')
                        }
                    }}
                >   <img 
                        className='rounded-full hover:bg-red-500 active:bg-red-700 transition-all duration-300 ease-in-out cursor-pointer 
                                2xl:p-1'
                        style={postsCategory === 'public' ? {backgroundColor: 'red', padding: '5px'} : {}}
                        src={publicIcon} alt="Public" 
                    />
                </button>
                <button
                    onClick={() => {
                        if(postsCategory !== 'private'){
                            setPostCategory('private')
                        }
                    }}
                >
                    <img 
                        className='rounded-full hover:bg-red-500 active:bg-red-700 transition-all duration-300 ease-in-out cursor-pointer 
                                2xl:p-1'
                        style={postsCategory === 'private' ? {backgroundColor: 'red', padding: '5px'} : {}}
                        src={privateIcon} alt="Private" 
                    />
                </button>
                <button
                    onClick={() => {
                        if(postsCategory !== 'star'){
                            setPostCategory('star')
                        }
                    }}
                >
                    <img 
                        className='rounded-full hover:bg-red-500 active:bg-red-700 transition-all duration-300 ease-in-out cursor-pointer 
                                2xl:p-1'
                        style={postsCategory === 'star' ? {backgroundColor: 'red', padding: '5px'} : {}}
                        src={starIcon} alt="Star" 
                    />
                </button>
            </div>
            {/* End of switch bar */}

            {/* Posts Display */}
            <div className='flex-1 grid box-border overflow-y-auto justify-items-center
                            2xl:grid-cols-5 2xl:px-5 2xl:pb-[11rem] 2xl:gap-y-2
                            3xl:grid-cols-6 3xl:px-7 3xl:pb-[13rem] 2xl:gap-y-1'>
                <div className='bg-yellow-500
                                2xl:w-[15rem] 2xl:h-[20rem]
                                3xl:w-[16rem] 2xl:h-[22rem]'>
                </div>
                <div className='bg-yellow-500
                                2xl:w-[15rem] 2xl:h-[20rem]
                                3xl:w-[16rem] 2xl:h-[22rem]'>
                </div>
                <div className='bg-yellow-500
                                2xl:w-[15rem] 2xl:h-[20rem]
                                3xl:w-[16rem] 2xl:h-[22rem]'>
                </div>
                <div className='bg-yellow-500
                                2xl:w-[15rem] 2xl:h-[20rem]
                                3xl:w-[16rem] 2xl:h-[22rem]'>
                </div>
                <div className='bg-yellow-500
                                2xl:w-[15rem] 2xl:h-[20rem]
                                3xl:w-[16rem] 2xl:h-[22rem]'>
                </div>
                <div className='bg-yellow-500
                                2xl:w-[15rem] 2xl:h-[20rem]
                                3xl:w-[16rem] 2xl:h-[22rem]'>
                </div>
                <div className='bg-yellow-500
                                2xl:w-[15rem] 2xl:h-[20rem]
                                3xl:w-[16rem] 2xl:h-[22rem]'>
                </div>
                <div className='bg-yellow-500
                                2xl:w-[15rem] 2xl:h-[20rem]
                                3xl:w-[16rem] 2xl:h-[22rem]'>
                </div>
                <div className='bg-yellow-500
                                2xl:w-[15rem] 2xl:h-[20rem]
                                3xl:w-[16rem] 2xl:h-[22rem]'>
                </div>
                <div className='bg-yellow-500
                                2xl:w-[15rem] 2xl:h-[20rem]
                                3xl:w-[16rem] 2xl:h-[22rem]'>
                </div>
                <div className='bg-yellow-500
                                2xl:w-[15rem] 2xl:h-[20rem]
                                3xl:w-[16rem] 2xl:h-[22rem]'>
                </div>
                <div className='bg-yellow-500
                                2xl:w-[15rem] 2xl:h-[20rem]
                                3xl:w-[16rem] 2xl:h-[22rem]'>
                </div>
                <div className='bg-yellow-500
                                2xl:w-[15rem] 2xl:h-[20rem]
                                3xl:w-[16rem] 2xl:h-[22rem]'>
                </div>
                <div className='bg-yellow-500
                                2xl:w-[15rem] 2xl:h-[20rem]
                                3xl:w-[16rem] 2xl:h-[22rem]'>
                </div>
                <div className='bg-yellow-500
                                2xl:w-[15rem] 2xl:h-[20rem]
                                3xl:w-[16rem] 2xl:h-[22rem]'>
                </div>
                <div className='bg-yellow-500
                                2xl:w-[15rem] 2xl:h-[20rem]
                                3xl:w-[16rem] 2xl:h-[22rem]'>
                </div>
                <div className='bg-yellow-500
                                2xl:w-[15rem] 2xl:h-[20rem]
                                3xl:w-[16rem] 2xl:h-[22rem]'>
                </div>
                <div className='bg-yellow-500
                                2xl:w-[15rem] 2xl:h-[20rem]
                                3xl:w-[16rem] 2xl:h-[22rem]'>
                </div>
                
            </div>
            {/* Posts Display */}
        </div>
    )
}

export default AccountPosts
