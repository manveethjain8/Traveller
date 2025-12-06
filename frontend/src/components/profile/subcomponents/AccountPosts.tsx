import { useEffect, useState } from 'react'
import publicIcon from '../../../assets/icons/public_30dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png'
import privateIcon from '../../../assets/icons/public_off_30dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png'
import starIcon from '../../../assets/icons/star_30dp_E3E3E3_FILL1_wght400_GRAD0_opsz24 .png'
import peopleIcon from '../../../assets/icons/emoji_people_50dp_E3E3E3_FILL0_wght700_GRAD0_opsz48.png'
import DPP from '../../../assets/icons/account_circle_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png'
import { useDisplayPostContext } from '../../../contexts/displayPostContext'
import defaultTNP from '../../../assets/icons/image_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png'
import { useProfileContext } from '../../../contexts/profileContext'
import type {PostSummarySpecificAccount_Type } from '../../../configs/types_and_interfaces'
import {useNavigate } from 'react-router-dom'
import { useStartupContext } from '../../../contexts/startupContext'

const AccountPosts = () => {

    const navigate = useNavigate()

    const {profileCategory, setProfileCategory, userInfo, getAccountDetails} = useProfileContext()
    const {getSpecificPost} = useDisplayPostContext()
    const {activeAccountId, setNavigationCategorytoLocalStorage, setSideBarCategory} = useStartupContext()

    const [publicPosts, setPublicPosts] = useState<PostSummarySpecificAccount_Type[] | undefined>(undefined)
    const [privatePosts, setPrivatePosts] = useState<PostSummarySpecificAccount_Type[] | undefined>(undefined)

    useEffect(() => {
        const postSeparator = (): void => {
            let pb: PostSummarySpecificAccount_Type[] = []
            let pr: PostSummarySpecificAccount_Type[] = []
            userInfo.posts?.forEach(p => {
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
    }, [userInfo.posts])


    return (
        <div className="relative w-full h-full flex flex-col">
            
            {/* Start of switch bar */}
            <div className="w-full h-full flex justify-center border-b-2 border-red-500 mb-[1rem]
                            2xl:max-h-[4rem] 2xl:gap-x-[2rem]"
            >
                <button
                    onClick={() => {
                        if(profileCategory !== 'public'){
                            setProfileCategory('public')
                        }
                    }}
                >   <img 
                        className='rounded-full hover:bg-red-500 active:bg-red-700 transition-all duration-300 ease-in-out cursor-pointer 
                                2xl:p-1'
                        style={profileCategory === 'public' ? {backgroundColor: 'red', padding: '5px'} : {}}
                        src={publicIcon} alt="Public" 
                    />
                </button>

                {activeAccountId === userInfo._id &&
                    <button
                        onClick={() => {
                            if(profileCategory !== 'private'){
                                setProfileCategory('private')
                            }
                        }}
                    >
                        <img 
                            className='rounded-full hover:bg-red-500 active:bg-red-700 transition-all duration-300 ease-in-out cursor-pointer 
                                    2xl:p-1'
                            style={profileCategory === 'private' ? {backgroundColor: 'red', padding: '5px'} : {}}
                            src={privateIcon} alt="Private" 
                        />
                    </button>
                }
                {activeAccountId === userInfo._id &&
                    <button
                        onClick={() => {
                            if(profileCategory !== 'star'){
                                setProfileCategory('star')
                            }
                        }}
                    >
                        <img 
                            className='rounded-full hover:bg-red-500 active:bg-red-700 transition-all duration-300 ease-in-out cursor-pointer 
                                    2xl:p-1'
                            style={profileCategory === 'star' ? {backgroundColor: 'red', padding: '5px'} : {}}
                            src={starIcon} alt="Star" 
                        />
                    </button>
                }
                {activeAccountId === userInfo._id &&
                    <button
                        onClick={() => {
                            if(profileCategory !== 'people'){
                                setProfileCategory('people')
                            }
                        }}
                    >
                        <img 
                            className='rounded-full hover:bg-red-500 active:bg-red-700 transition-all duration-300 ease-in-out cursor-pointer w-[2.5rem]
                                    2xl:p-1'
                            style={profileCategory === 'people' ? {backgroundColor: 'red', padding: '5px'} : {}}
                            src={peopleIcon} alt="people" 
                        />
                    </button>
                }

            </div>
            {/* End of switch bar */}

            {/* Posts Display */}
            <div className='relative flex-1 grid box-border overflow-y-auto justify-items-center
                            2xl:grid-cols-5 2xl:px-5 2xl:pb-[11rem] 2xl:gap-y-2
                            3xl:grid-cols-6 3xl:px-7 3xl:pb-[13rem] 2xl:gap-y-1'>
                {profileCategory === 'public' && (
                    <>
                        {publicPosts && publicPosts.length > 0 ? (
                            publicPosts.map(p => (
                                <div 
                                    key={p._id}
                                    className='2xl:w-[17rem] 2xl:h-[25rem]
                                            3xl:w-[25rem] 3xl:h-[29rem]
                                            hover:cursor-pointer'
                                    onClick={() => {
                                        getSpecificPost(p._id)
                                        setSideBarCategory(undefined)
                                        setNavigationCategorytoLocalStorage('undifined')
                                        navigate('/displayPost')
                                    }}
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
                {profileCategory === 'private' && (
                    <>
                        {privatePosts && privatePosts.length > 0 ? (
                            privatePosts.map(p => (
                                <div 
                                    key={p._id}
                                    className='2xl:w-[17rem] 2xl:h-[25rem]
                                            3xl:w-[25rem] 3xl:h-[29rem]
                                            hover:cursor-pointer'
                                    onClick={() => {
                                        getSpecificPost(p._id)
                                        navigate('/displayPost')
                                    }}
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

                {profileCategory === 'people' && (
                <div className='absolute w-full h-full flex box-border py-4'>
                    <div className='relative w-full h-full flex flex-col w-[50%] box-border '>
                        <strong className='text-center text-[1.3rem]'>Followers</strong>
                        <div className='p-2 grid grid-cols-3 gap-x-3'>
                            {userInfo.followers && userInfo.followers?.length > 0 ? (
                                <>
                                    {userInfo.followers?.map(f => (
                                        <div 
                                            key={f._id}
                                            className='h-fit flex flex-row gap-x-2 box-border px-5 items-center'
                                        >
                                            <img 
                                                src={f.profilePicture !== '' ? f.profilePicture : DPP} 
                                                className='w-[4rem] h-[4rem] hover:cursor-pointer rounded-full object-center object-cover' 
                                                onClick={() => {
                                                    getAccountDetails(f._id)
                                                    sessionStorage.setItem('searchedAccountId', f._id)
                                                    navigate('/profile')
                                                }}   
                                            />
                                            <p
                                                className='font-semibold text-[1.1rem] hover:cursor-pointer'
                                                onClick={() => {
                                                    getAccountDetails(f._id)
                                                    sessionStorage.setItem('searchedAccountId', f._id)
                                                    navigate('/profile')
                                                }} 
                                            >
                                                {f.userName}
                                            </p>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <div className='absolute w-fit h-fit left-[35%] top-[35%]'>
                                    <strong className='text-[1rem]'>No Followers Yet. Keep Exploring</strong>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='relative w-full h-full flex flex-col w-[50%] box-border '>
                        <strong className='text-center text-[1.3rem]'>Followings</strong>
                        <div className='p-2 grid grid-cols-3 gap-x-3'>
                            {userInfo.followings && userInfo.followings?.length > 0 ? (
                                <>
                                    {userInfo.followings?.map(f => (
                                        <div 
                                            key={f._id}
                                            className='h-fit flex flex-row gap-x-2 box-border px-5 items-center'
                                        >
                                            <img 
                                                src={f.profilePicture !== '' ? f.profilePicture : DPP} 
                                               className='w-[4rem] h-[4rem] hover:cursor-pointer rounded-full object-center object-cover'   
                                                onClick={() => {
                                                    getAccountDetails(f._id)
                                                    sessionStorage.setItem('searchedAccountId', f._id)
                                                    navigate('/profile')
                                                }}   
                                            />
                                            <p
                                                className='font-semibold text-[1.1rem] hover:cursor-pointer'
                                                onClick={() => {
                                                    getAccountDetails(f._id)
                                                    sessionStorage.setItem('searchedAccountId', f._id)
                                                    navigate('/profile')
                                                }} 
                                            >
                                                {f.userName}
                                            </p>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <div className='absolute w-fit h-fit left-[35%] top-[35%]'>
                                    <strong className='text-[1rem]'>No Followings Yet. Keep Exploring</strong>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            )}
            </div>
            {/* Posts Display */}
            
        </div>
    )
}

export default AccountPosts
