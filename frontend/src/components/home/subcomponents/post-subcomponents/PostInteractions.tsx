import likeIcon from '../../../../assets/icons/favorite_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png'
import commentIcon from '../../../../assets/icons/comment_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png'
import shareIcon from '../../../../assets/icons/share_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png'
import bookmarkIcon from '../../../../assets/icons/bookmark_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png'


import WP from '../../../../assets/background_images/authenticate_page_background.jpg'
const PostInteractions = () => {
    const l = 10000
    return (
        <>
            <div className="flex-1 w-full flex flex-row gap-x-8 box-border px-4">
                <div className="w-full h-full flex flex-col items-center">
                    <img 
                        src={likeIcon} 
                        alt="like-icon"
                        className="w-[70%] h-[70%] hover:bg-red-500 hover:rounded-full p-[0.3rem] hover:cursor-pointer active:bg-red-800" 
                    />
                    <p className='text-[0.9rem]'>{l > 0 ? l : ''}</p>
                </div>
                <div className="w-full h-full flex flex-col items-center">
                    <img 
                        src={commentIcon} 
                        alt="like-icon"
                        className="w-[70%] h-[70%] hover:bg-red-500 hover:rounded-full p-[0.3rem] hover:cursor-pointer active:bg-red-800" 
                    />
                    <p className='text-[0.9rem]'>{l > 0 ? l : ''}</p>
                </div>
                <div className="w-full h-full flex flex-col items-center">
                    <img 
                        src={shareIcon} 
                        alt="like-icon"
                        className="w-[70%] h-[70%] hover:bg-red-500 hover:rounded-full p-[0.3rem] hover:cursor-pointer active:bg-red-800" 
                    />
                    <p className='text-[0.9rem]'>{l > 0 ? l : ''}</p>
                </div>
                <div className="w-full h-full flex flex-col items-center">
                    <img 
                        src={bookmarkIcon} 
                        alt="like-icon"
                        className="w-[70%] h-[70%] hover:bg-red-500 hover:rounded-full p-[0.3rem] hover:cursor-pointer active:bg-red-800" 
                    />
                    <p className='text-[0.9rem]'>{l > 0 ? l : ''}</p>
                </div>
            </div>
            <div className="bg-red-500 h-[0.05rem] w-[80%] m-1 box-border"></div>
            <div className="flex-8 flex flex-col w-full h-full box-border p-4 overflow-y-auto gap-y-5">
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
            </div>
        </>
    )
}

export default PostInteractions
