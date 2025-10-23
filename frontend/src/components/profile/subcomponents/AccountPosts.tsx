import { useEffect, useState } from 'react'
import publicIcon from '../../../assets/icons/public_30dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png'
import privateIcon from '../../../assets/icons/public_off_30dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png'
import starIcon from '../../../assets/icons/star_30dp_E3E3E3_FILL1_wght400_GRAD0_opsz24 .png'
import { useDisplayPostContext } from '../../../contexts/displayPostContext'
import defaultTNP from '../../../assets/icons/image_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png'
import { useProfileContext } from '../../../contexts/profileContext'
import type { PostSummarySpecificAccount_Type } from '../../../configs/types_and_interfaces'

const AccountPosts = () => {

    const {postsCategory, setPostCategory} = useProfileContext()
    const {accountAllPosts} = useDisplayPostContext()

    const [publicPosts, setPublicPosts] = useState<PostSummarySpecificAccount_Type[] | undefined>(undefined)
    const [privatePosts, setPrivatePosts] = useState<PostSummarySpecificAccount_Type[] | undefined>(undefined)

    useEffect(() => {
        const postSeparator = (): void => {
            let pb: PostSummarySpecificAccount_Type[] = []
            let pr: PostSummarySpecificAccount_Type[] = []
            accountAllPosts?.forEach(p => {
                if(p.domainString === 'public'){
                    pb.push(p)
                }else{
                    pr.push(p)
                }
            })
            setPublicPosts(pb)
            setPrivatePosts(pr)
        }

        postSeparator()
    }, [accountAllPosts])


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
            <div className='relative flex-1 grid box-border overflow-y-auto justify-items-center
                            2xl:grid-cols-5 2xl:px-5 2xl:pb-[11rem] 2xl:gap-y-2
                            3xl:grid-cols-6 3xl:px-7 3xl:pb-[13rem] 2xl:gap-y-1'>
                {postsCategory === 'public' ? (
                    <>
                        {publicPosts && publicPosts.length > 0 ? (
                            publicPosts.map(p => (
                                <div 
                                    key={p._id}
                                    className='2xl:w-[17rem] 2xl:h-[25rem]
                                            3xl:w-[25rem] 3xl:h-[29rem]'
                                >
                                    <img 
                                        src={p.thumbnail ?? defaultTNP}
                                        className='w-full h-full object-center object-cover'
                                    />
                                </div>
                            ))
                        ) : (
                            <div className='absolute w-fit h-fit flex flex-col items-center top-[20%]'>
                                <img 
                                    src={defaultTNP}
                                    className='w-[5rem] h-[5rem]'    
                                />
                                <strong>Share your adventures</strong>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        {privatePosts && privatePosts.length > 0 ? (
                            privatePosts.map(p => (
                                <div 
                                    key={p._id}
                                    className='2xl:w-[17rem] 2xl:h-[25rem]
                                            3xl:w-[25rem] 3xl:h-[29rem]'
                                >
                                    <img 
                                        src={p.thumbnail ?? defaultTNP}
                                        className='w-full h-full object-center object-cover'
                                    />
                                </div>
                            ))
                        ) : (
                            <div className='absolute w-fit h-fit flex flex-col items-center top-[20%]'>
                                <img 
                                    src={defaultTNP}
                                    className='w-[5rem] h-[5rem]'    
                                />
                                <strong>Share your adventures</strong>
                            </div>
                        )}
                    </>
                )}
            </div>
            {/* Posts Display */}
        </div>
    )
}

export default AccountPosts
