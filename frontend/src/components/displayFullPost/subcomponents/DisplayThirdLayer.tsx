import { useDisplayPostContext } from "../../../contexts/displayPostContext"

import likeIcon from '../../../assets/icons/favorite_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png'
import commentIcon from '../../../assets/icons/comment_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png'
import shareIcon from '../../../assets/icons/share_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png'
import bookmarkIcon from '../../../assets/icons/bookmark_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png'
import sendIcon from '../../../assets/icons/send_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png'

import WP from '../../../assets/background_images/authenticate_page_background.jpg'
import { useState } from "react"


const DisplayThirdLayer = () => {

    const {fullPost} = useDisplayPostContext()

    const [addCommentsClicked, setaddCommentsClicked] = useState<boolean>(false)

    return (
        <div className="max-h-[50rem] w-full pr-3">
            <div className="mt-[1%] flex-1 w-full max-h-[5rem] flex flex-row gap-x-8 box-border px-4">
                <div className="w-full h-full flex flex-col items-center">
                    <img 
                        src={likeIcon} 
                        alt="like-icon"
                        className="w-[15%] h-[15%] hover:bg-red-500 hover:rounded-full p-[0.3rem] active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer" 
                    />
                    <p className='text-[0.9rem]'>{0}</p>
                </div>
                <div className="w-full h-full flex flex-col items-center">
                    <img 
                        src={commentIcon} 
                        alt="like-icon"
                        className="w-[15%] h-[15%] hover:bg-red-500 hover:rounded-full p-[0.3rem] active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer" 
                        onClick={() => setaddCommentsClicked(prev => !prev)}
                    />
                    <p className='text-[0.9rem]'>{0}</p>
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
                                />
                            </div>
                            <div className='flex flex-1 mt-[0.5rem] justify-center items-center'>
                                <button className='w-[4%] h-[100%] box-border p-1 hover:rounded-full hover:bg-red-500 active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer'>
                                    <img
                                        className='w-[80%] h-[100%] mx-auto' 
                                        src={sendIcon} 
                                        alt="send" 
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="overflow-y-auto max-h-[20rem] flex flex-col gap-y-10">
                        <div className='h-full w-full flex flex-col'>
                            <div className='flex flex-row w-full h-fit items-center mb-[0.2rem]'>
                                <div className='w-[2.5rem] h-[2.5rem] rounded-full'>
                                    <img 
                                        className='w-full h-full rounded-full object-cover object-center' 
                                        src={WP} 
                                        alt='profile picture' 
                                    />
                                </div>
                                <p className='ml-[0.3rem] font-bold text-[1rem]'>high_rider_8</p>
                            </div>
                            <div>
                                <p className='text-[0.9rem]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricies eu arcu et lobortis. In eu congue ligula. Sed neque libero, bibendum ac viverra quis, cursus vitae tellus. Mauris ac elit quis ante pretium molestie sit amet ac ligula. Nulla ligula mauris, varius in auctor eget, commodo blandit nibh. Nulla facilisi. Vestibulum in elit odio. Curabitur faucibus, lacus ut pellentesque egestas, erat libero rutrum tortor, at hendrerit urna orci id ligula. Nullam molestie dapibus nisl quis consequat. Phasellus non imperdiet diam, in convallis tellus. Duis non quam vel felis iaculis tristique dapibus dignissim lacus. Curabitur risus eros, hendrerit a suscipit id, commodo eu dolor. Nulla purus massa, maximus sed tincidunt ut, volutpat ac ante.</p>
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
                                <p className='ml-[0.3rem] font-bold text-[1rem]'>high_rider_8</p>
                            </div>
                            <div>
                                <p className='text-[0.9rem]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricies eu arcu et lobortis. In eu congue ligula. Sed neque libero, bibendum ac viverra quis, cursus vitae tellus. Mauris ac elit quis ante pretium molestie sit amet ac ligula. Nulla ligula mauris, varius in auctor eget, commodo blandit nibh. Nulla facilisi. Vestibulum in elit odio. Curabitur faucibus, lacus ut pellentesque egestas, erat libero rutrum tortor, at hendrerit urna orci id ligula. Nullam molestie dapibus nisl quis consequat. Phasellus non imperdiet diam, in convallis tellus. Duis non quam vel felis iaculis tristique dapibus dignissim lacus. Curabitur risus eros, hendrerit a suscipit id, commodo eu dolor. Nulla purus massa, maximus sed tincidunt ut, volutpat ac ante.</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DisplayThirdLayer
