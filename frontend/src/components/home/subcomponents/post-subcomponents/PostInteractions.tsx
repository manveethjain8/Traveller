import { useEffect, useRef, useState} from 'react'
import type { MouseEvent } from "react";

import likeIcon from '../../../../assets/icons/favorite_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png'
import likeIconRed from '../../../../assets/icons/favorite_50dp_EA3323_FILL1_wght400_GRAD0_opsz48.png'
import commentIcon from '../../../../assets/icons/comment_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png'
import shareIcon from '../../../../assets/icons/share_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png'
import bookmarkIcon from '../../../../assets/icons/bookmark_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png'
import sendIcon from '../../../../assets/icons/send_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png'

import { useInteractionsContext } from '../../../../contexts/interactionsContext';
import type { PostsSummary_Type } from '../../../../configs/types_and_interfaces';
import { timeAgoFormat } from '../../../../utils/formatUtils';
import { useStartupContext } from '../../../../contexts/startupContext';

type PostsProviderProps = {
    post: PostsSummary_Type
}

const PostInteractions = ({post}: PostsProviderProps) => {

    const {activeAccountId} = useStartupContext()
    const {handleLikes, handleComments} = useInteractionsContext()

    const [commentsClicked, setCommentsClicked] = useState<boolean>(false)
    const [comment, setComment] = useState<string>('')
    const commentsRef = useRef<HTMLDivElement>(null)
    const iconRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        const handleCommentsClickOutside = (e: MouseEvent<any>) => {
            if (commentsRef.current && iconRef && !commentsRef.current.contains(e.target as Node) && !iconRef.current?.contains(e.target as Node)) {
                setCommentsClicked(false)
            }
        }

        if (commentsClicked) {
            document.addEventListener('mousedown', handleCommentsClickOutside as any)
        }

        return() => {
            document.removeEventListener('mousedown', handleCommentsClickOutside as any)
        }
    }, [commentsClicked])

    const toggleCommentsSection = (e: MouseEvent<HTMLImageElement>) => {
        e.stopPropagation()
        setCommentsClicked(prev => !prev)
    }

    console.log(post)

    const l = 10000
    return (
        <>
            <div className="flex-1 w-full h-full flex flex-row gap-x-8 box-border px-4">
                <div className="w-full h-full flex flex-col items-center">
                    <img 
                        src={post.interactions.likes.includes(activeAccountId) ? likeIconRed : likeIcon} 
                        alt="like-icon"
                        className="w-[70%] h-[70%] hover:bg-orange-400 hover:rounded-full p-[0.3rem] active:bg-orange-500 transition-all duration-300 ease-in-out cursor-pointer" 
                        onClick={() => handleLikes(post._id)}
                    />
                    <p className='text-[0.9rem]'>{post.interactions?.likes?.length > 0 ? post.interactions?.likes?.length  : 0}</p>
                </div>
                <div className="w-full h-full flex flex-col items-center">
                    <img 
                        ref={iconRef}
                        src={commentIcon} 
                        alt="like-icon"
                        className="w-[70%] h-[70%] hover:bg-red-500 hover:rounded-full p-[0.3rem] active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer" 
                        onClick={toggleCommentsSection}
                    />
                    <p className='text-[0.9rem]'>{post.interactions.comments.length> 0 ? post.interactions.comments.length: 0}</p>
                </div>
                <div className="w-full h-full flex flex-col items-center">
                    <img 
                        src={shareIcon} 
                        alt="like-icon"
                        className="w-[70%] h-[70%] hover:bg-red-500 hover:rounded-full p-[0.3rem] active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer" 
                    />
                    <p className='text-[0.9rem]'>{l > 0 ? l : ''}</p>
                </div>
                <div className="w-full h-full flex flex-col items-center">
                    <img 
                        src={bookmarkIcon} 
                        alt="like-icon"
                        className="w-[70%] h-[70%] hover:bg-red-500 hover:rounded-full p-[0.3rem] active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer" 
                    />
                    <p className='text-[0.9rem]'>{l > 0 ? l : ''}</p>
                </div>
            </div>
            <div className="bg-red-500 h-[0.05rem] w-[80%] m-1 box-border"></div>
            <div className="flex-8 flex flex-col w-full h-full box-border p-4 overflow-y-auto gap-y-5">
                {commentsClicked ? (
                    <>
                        <div 
                            ref={commentsRef}
                            className='flex flex-col w-full h-full box-border p-4'
                        >
                            <div className='flex flex-8 overflow-y-auto'>
                                <textarea
                                    placeholder='Comment'
                                    className='w-full h-full text-[0.9rem] outline-none resize-none placeholder:text-white placeholder:text-center placeholder:align-center'
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                            </div>
                            <div className='flex flex-1 mt-[0.5rem] justify-center items-center'>
                                <button className='w-[15%] h-[100%] box-border p-1 hover:rounded-full hover:bg-red-500 active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer'>
                                    <img
                                        className='w-[70%] h-[70%] mx-auto' 
                                        src={sendIcon} 
                                        alt="send" 
                                        onClick={() => {
                                                handleComments(1, post._id, comment)
                                                setComment('')
                                                setCommentsClicked(prev => !prev)
                                            }
                                        }
                                    />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        {post.interactions.comments && post.interactions.comments.map(c => (
                            <div className='h-fit w-full flex flex-col mb-[1rem]' key={c._id}>
                                <div className='flex flex-row w-full h-fit items-center mb-[0.2rem]'>
                                    <div className='w-[2.5rem] h-[2.5rem] rounded-full'>
                                        <img 
                                            className='w-full h-full rounded-full object-cover object-center' 
                                            src={c.account.profilePicture} 
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
                        ))}
                    </>
                )}
            </div>
        </>
    )
}

export default PostInteractions
