import WP from '../../../assets/background_images/authenticate_page_background.jpg'
import PostInteractions from './post-subcomponents/PostInteractions'
import PostQuickSummary from './post-subcomponents/PostQuickSummary'

const Posts = () => {
    return (
        <div className="w-screen h-full flex flex-col p-2 gap-y-5 box-border items-center ">
            <div className="w-[80%] h-[100%] flex flex-col">
                <div className='flex-1 flex max-h-[12%]'>
                    <div className='flex-1 flex items-center box-border px-4 gap-x-1'>
                        <div className="w-[15%] aspect-square rounded-full">
                            <img 
                                className="w-full h-full rounded-full object-cover object-center"
                                src={WP} 
                                alt="profile picture" 
                            />
                        </div>
                        <p>high_rider_8</p>
                    </div>
                    <div className='flex-1 flex justify-center items-center box-border px-4'>
                        <p>Ladakh Dairies</p>
                    </div>
                    <div className='flex-1 flex justify-center items-center box-border px-4'>
                        <p>14 - 5 - 2026</p>
                    </div>
                </div>
                <div className='flex-9 flex flex-row max-h-[88%]'>
                    <div className="flex-1 h-full">
                        <img
                            className='h-full w-full object-center object-cover' 
                            src={WP} alt="post image" 
                        />
                    </div>
                    <div className='flex-1' >
                        <PostQuickSummary/>
                    </div>
                    <div className='flex-1 flex flex-col items-center'>
                        <PostInteractions/>
                    </div>
                </div>
            </div>
            <div className="w-[80%] h-[100%] flex flex-col">
                <div className='flex-1 flex max-h-[12%]'>
                    <div className='flex-1 flex items-center box-border px-4 gap-x-1'>
                        <div className="w-[15%] aspect-square rounded-full">
                            <img 
                                className="w-full h-full rounded-full object-cover object-center"
                                src={WP} 
                                alt="profile picture" 
                            />
                        </div>
                        <p>high_rider_8</p>
                    </div>
                    <div className='flex-1 flex justify-center items-center box-border px-4'>
                        <p>Ladakh Dairies</p>
                    </div>
                    <div className='flex-1 flex justify-center items-center box-border px-4'>
                        <p>14 - 5 - 2026</p>
                    </div>
                </div>
                <div className='flex-9 flex flex-row max-h-[88%]'>
                    <div className="flex-1 h-full">
                        <img
                            className='h-full w-full object-center object-cover' 
                            src={WP} alt="post image" 
                        />
                    </div>
                    <div className='flex-1' >
                        <PostQuickSummary/>
                    </div>
                    <div className='flex-1 flex flex-col items-center'>
                        <PostInteractions/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Posts
