import { useEffect, useRef, useState} from 'react'
import type { MouseEvent } from "react";

import likeIcon from '../../../../assets/icons/favorite_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png'
import commentIcon from '../../../../assets/icons/comment_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png'
import shareIcon from '../../../../assets/icons/share_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png'
import bookmarkIcon from '../../../../assets/icons/bookmark_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png'
import sendIcon from '../../../../assets/icons/send_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png'

import WP from '../../../../assets/background_images/authenticate_page_background.jpg'
import { useInteractionsContext } from '../../../../contexts/interactionsContext';
import type { PostsSummary_Type } from '../../../../configs/types_and_interfaces';

type PostsProviderProps = {
    post: PostsSummary_Type
}

const PostInteractions = ({post}: PostsProviderProps) => {

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

    const l = 10000
    return (
        <>
            <div className="flex-1 w-full h-full flex flex-row gap-x-8 box-border px-4">
                <div className="w-full h-full flex flex-col items-center">
                    <img 
                        src={likeIcon} 
                        alt="like-icon"
                        className="w-[70%] h-[70%] hover:bg-red-500 hover:rounded-full p-[0.3rem] active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer" 
                    />
                    <p className='text-[0.9rem]'>{l > 0 ? l : ''}</p>
                </div>
                <div className="w-full h-full flex flex-col items-center">
                    <img 
                        ref={iconRef}
                        src={commentIcon} 
                        alt="like-icon"
                        className="w-[70%] h-[70%] hover:bg-red-500 hover:rounded-full p-[0.3rem] active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer" 
                        onClick={toggleCommentsSection}
                    />
                    <p className='text-[0.9rem]'>{l > 0 ? l : ''}</p>
                </div>
                <div className="w-full h-full flex flex-col items-center">
                    <img 
                        src={shareIcon} 
                        alt="like-icon"
                        className="w-[70%] h-[70%] hover:bg-red-500 hover:rounded-full p-[0.3rem] active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer" 
                        onClick={() => handleLikes(post._id)}
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
                                            }
                                        }
                                    />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='h-full w-full flex flex-col'>
                            <div className='flex flex-row w-full h-fit items-center mb-[0.2rem]'>
                                <div className='w-[2.5rem] h-[2.5rem] rounded-full'>
                                    <img 
                                        className='w-full h-full rounded-full object-cover object-center' 
                                        src={WP} 
                                        alt='profile picture' 
                                    />
                                </div>
                                <p className='ml-[0.3rem] font-bold text-[0.9rem]'>high_rider_8</p>
                            </div>
                            <div>
                                <p className='text-[0.8rem]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricies eu arcu et lobortis. In eu congue ligula. Sed neque libero, bibendum ac viverra quis, cursus vitae tellus. Mauris ac elit quis ante pretium molestie sit amet ac ligula. Nulla ligula mauris, varius in auctor eget, commodo blandit nibh. Nulla facilisi. Vestibulum in elit odio. Curabitur faucibus, lacus ut pellentesque egestas, erat libero rutrum tortor, at hendrerit urna orci id ligula. Nullam molestie dapibus nisl quis consequat. Phasellus non imperdiet diam, in convallis tellus. Duis non quam vel felis iaculis tristique dapibus dignissim lacus. Curabitur risus eros, hendrerit a suscipit id, commodo eu dolor. Nulla purus massa, maximus sed tincidunt ut, volutpat ac ante.</p>
                            </div>
                        </div>
                        <div className='h-fit w-full flex flex-col'>
                            <div className='flex flex-row w-full h-fit items-center mb-[0.2rem]'>
                                <div className='w-[2.5rem] h-[2.5rem] rounded-full'>
                                    <img 
                                        className='w-full h-full rounded-full object-cover object-center' 
                                        src={WP} 
                                        alt='profile picture' 
                                    />
                                </div>
                                <p className='ml-[0.3rem] font-bold text-[0.9rem]'>high_rider_8</p>
                            </div>
                            <div>
                                <p className='text-[0.8rem]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricies eu arcu et lobortis. In eu congue ligula. Sed neque libero, bibendum ac viverra quis, cursus vitae tellus. Mauris ac elit quis ante pretium molestie sit amet ac ligula. Nulla ligula mauris, varius in auctor eget, commodo blandit nibh. Nulla facilisi. Vestibulum in elit odio. Curabitur faucibus, lacus ut pellentesque egestas, erat libero rutrum tortor, at hendrerit urna orci id ligula. Nullam molestie dapibus nisl quis consequat. Phasellus non imperdiet diam, in convallis tellus. Duis non quam vel felis iaculis tristique dapibus dignissim lacus. Curabitur risus eros, hendrerit a suscipit id, commodo eu dolor. Nulla purus massa, maximus sed tincidunt ut, volutpat ac ante.</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default PostInteractions
