import defaultPP from '../../../assets/icons/account_circle_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png'
import defaultTNP from '../../../assets/icons/image_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png'

import { useDisplayPostContext } from '../../../contexts/displayPostContext'
import { dateFormater } from '../../../utils/formatUtils'
import PostInteractions from './post-subcomponents/PostInteractions'
import PostQuickSummary from './post-subcomponents/PostQuickSummary'

const Posts = () => {

    const {allPosts} = useDisplayPostContext()

    return (
        <div className="w-screen h-full">
            {allPosts && allPosts.map(p => (
                <div 
                    key={p._id}
                    className='w-full h-full flex flex-col p-2 gap-y-5 box-border items-center '
                >
                    <div className="w-[80%] min-h-[100%] max-h-[100%] flex flex-col">
                        <div className='flex-1 flex max-h-[12%]'>
                            <div className='flex-1 flex items-center box-border px-4 gap-x-4'>
                                <div className="w-[15%] aspect-square rounded-full">
                                    <img 
                                        className="w-full h-full rounded-full object-cover object-center"
                                        src={p.account.profilePicture ?? defaultPP} 
                                        alt="profile picture" 
                                    />
                                </div>
                                <p>high_rider_8</p>
                            </div>
                            <div className='flex-1 flex justify-center items-center box-border px-4'>
                                <p>{p.expeditionName}</p>
                            </div>
                            <div className='flex-1 flex justify-center items-center box-border px-4'>
                                <p>{p.date ? dateFormater(p.date) : 'Undefined'}</p>
                            </div>
                        </div>
                        <div className='flex-9 flex flex-row max-h-[88%]'>
                            <div className="flex-1 h-full">
                                <img
                                    className='h-full w-full object-center object-cover' 
                                    src={p.thumbnail ?? defaultTNP} alt="post image" 
                                />
                            </div>
                            <div className='flex-1 h-full' >
                                <PostQuickSummary
                                    post={p}
                                />
                            </div>
                            <div className='flex-1 h-full flex flex-col items-center'>
                                <PostInteractions/>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Posts
