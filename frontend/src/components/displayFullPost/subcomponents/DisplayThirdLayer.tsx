import likeIcon from '../../../assets/icons/favorite_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png'
import likeIconRed from '../../../assets/icons/favorite_50dp_EA3323_FILL1_wght400_GRAD0_opsz48.png'
import commentIcon from '../../../assets/icons/comment_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png'
import shareIcon from '../../../assets/icons/share_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png'
import bookmarkIcon from '../../../assets/icons/bookmark_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png'
import sendIcon from '../../../assets/icons/send_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png'

import WP from '../../../assets/background_images/authenticate_page_background.jpg'
import { useState } from "react"
import { useDisplayPostContext } from '../../../contexts/displayPostContext'
import { timeAgoFormat } from '../../../utils/formatUtils'
import { useStartupContext } from '../../../contexts/startupContext'
import { useInteractionsContext } from '../../../contexts/interactionsContext'


const DisplayThirdLayer = () => {


    const {fullPost} = useDisplayPostContext()
    const {handleLikes, handleComments} = useInteractionsContext()
    const {activeAccountId} = useStartupContext()
    const [addCommentsClicked, setaddCommentsClicked] = useState<boolean>(false)
    const [comment, setComment] = useState<string>('')

    return (
        <div className="max-h-[50rem] w-full pr-3">
            <div className="mt-[1%] flex-1 w-full max-h-[5rem] flex flex-row gap-x-8 box-border px-4">
                <div className="w-full h-full flex flex-col items-center">
                    <img 
                        src={fullPost?.interactions?.likes?.includes(activeAccountId) ? likeIconRed : likeIcon} 
                        alt="like-icon"
                        className="w-[15%] h-[15%] hover:bg-orange-400 hover:rounded-full p-[0.3rem] active:bg-orange-500 transition-all duration-300 ease-in-out cursor-pointer"
                        onClick={() => handleLikes(fullPost?._id as string)} 
                    />
                    <p className='text-[0.9rem]'>{fullPost?.interactions?.likes?.length ?? 0}</p>
                </div>
                <div className="w-full h-full flex flex-col items-center">
                    <img 
                        src={commentIcon} 
                        alt="like-icon"
                        className="w-[15%] h-[15%] hover:bg-red-500 hover:rounded-full p-[0.3rem] active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer" 
                        onClick={() => setaddCommentsClicked(prev => !prev)}
                    />
                    <p className='text-[0.9rem]'>{fullPost && fullPost?.interactions?.comments?.length > 0 ? fullPost?.interactions.comments.length: 0}</p>
                </div>
                <div className="w-full h-full flex flex-col items-center">
                    <img 
                        src={shareIcon} 
                        alt="like-icon"
                        className="w-[15%] h-[15%] hover:bg-red-500 hover:rounded-full p-[0.3rem] active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer" 
                    />
                    <p className='text-[0.9rem]'>{0}</p>
                </div>
                <div className="w-full h-full flex flex-col items-center">
                    <img 
                        src={bookmarkIcon} 
                        alt="like-icon"
                        className="w-[15%] h-[15%] hover:bg-red-500 hover:rounded-full p-[0.3rem] active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer" 
                    />
                    <p className='text-[0.9rem]'>{0}</p>
                </div>
            </div>
            <div className="bg-red-500 h-[0.05rem] w-[100%] m-1 box-border"></div>
            <div className="flex-8 flex flex-col w-full h-full box-border p-4 overflow-y-auto gap-y-5">
                {addCommentsClicked ? (
                    <div className="flex flex-col w-full min-h-[20rem] max-h-[20rem]">
                        <div 
                            className='flex flex-col w-full h-full box-border p-4 '
                        >
                            <div className='flex flex-15 overflow-y-auto '>
                                <textarea
                                    placeholder='Add a comment'
                                    className='w-full h-full text-[0.9rem] outline-none resize-none placeholder:text-white placeholder:text-center placeholder:align-center'
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                            </div>
                            <div className='flex flex-1 mt-[0.5rem] justify-center items-center'>
                                <button className='w-[4%] h-[100%] box-border p-1 hover:rounded-full hover:bg-red-500 active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer'>
                                    <img
                                        className='w-[80%] h-[100%] mx-auto' 
                                        src={sendIcon} 
                                        alt="send" 
                                        onClick={() => {
                                                handleComments(1, fullPost?._id as string, comment)
                                                setComment('')
                                                setaddCommentsClicked(prev => !prev)
                                            }
                                        }
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="overflow-y-auto max-h-[20rem] flex flex-col gap-y-10">
                        {fullPost?.interactions?.comments && fullPost.interactions.comments.length > 0 ?
                            (
                                    fullPost.interactions.comments.map(c => (
                                    <div className='h-full w-full flex flex-col' key={c._id}>
                                        <div className='flex flex-row w-full h-fit items-center mb-[0.2rem]'>
                                            <div className='w-[2.5rem] h-[2.5rem] rounded-full'>
                                                <img 
                                                    className='w-full h-full rounded-full object-cover object-center' 
                                                    src={c.account.profilePicture ?? WP} 
                                                    alt='profile picture' 
                                                />
                                            </div>
                                            <p className='ml-[0.3rem] font-bold text-[0.9rem]'>{c.account.userName}</p>
                                            <p className='ml-auto text-[0.9rem]'>{timeAgoFormat(c.createdAt)}</p>
                                        </div>
                                        <div>
                                            <p className='text-[0.9rem] mt-[0.5rem]'>{c.comment}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div>
                                    <p>"No Comments Yet"</p>
                                </div>
                            )
                        }
                    </div>
                )}
            </div>
        </div>
    )
}

export default DisplayThirdLayer
