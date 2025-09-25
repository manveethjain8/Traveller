import WP from '../../../assets/background_images/authenticate_page_background.jpg'

const Posts = () => {
    return (
        <div className="w-full h-full flex flex-col p-2 gap-y-5 box-border items-center overflow-y-auto">
            <div className="w-[80%] h-[95%] bg-green-500 flex-shrink-0 flex flex-col">
                <div className='flex-1 flex max-h-[12%]'>
                    <div className='bg-yellow-500 flex-1 flex items-center box-border px-4 gap-x-1'>
                        <div className="w-[20%] aspect-square rounded-full">
                            <img 
                                className="w-full h-full rounded-full object-cover object-center"
                                src={WP} 
                                alt="profile picture" 
                            />
                        </div>
                        <p>User Name</p>
                    </div>
                    <div className='bg-pink-500 flex-1 flex justify-center items-center box-border px-4'>
                        <p>Trip Title</p>
                    </div>
                    <div className='bg-red-500 flex-1 flex justify-center items-center box-border px-4'>
                        <p>Trip Date</p>
                    </div>
                </div>
                <div className='flex-9 flex flex-row max-h-[88%]'>
                    <div className="flex-1 h-full">
                        <img
                            className='h-full w-full object-center object-cover' 
                            src={WP} alt="post image" 
                        />
                    </div>
                    <div className="bg-blue-500 flex-1"></div>
                    <div className="bg-yellow-500 flex-1"></div>
                </div>
            </div>
            <div className="w-[80%] h-[95%] bg-green-500 flex-shrink-0"></div>
        </div>
    )
}

export default Posts
