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
                        <p>Ladakh Dairies</p>
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
                    <div className="bg-blue-500 flex-1">
                        <div className='bg-green-500 w-full h-[70%] flex-1 flex box-border px-4 '>
                            <p className='w-full h-full line-clamp-3'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricies eu arcu et lobortis. In eu congue ligula. Sed neque libero, bibendum ac viverra quis, cursus vitae tellus. Mauris ac elit quis ante pretium molestie sit amet ac ligula. Nulla ligula mauris, varius in auctor eget, commodo blandit nibh. Nulla facilisi. Vestibulum in elit odio. Curabitur faucibus, lacus ut pellentesque egestas, erat libero rutrum tortor, at hendrerit urna orci id ligula. Nullam molestie dapibus nisl quis consequat. Phasellus non imperdiet diam, in convallis tellus. Duis non quam vel felis iaculis tristique dapibus dignissim lacus. Curabitur risus eros, hendrerit a suscipit id, commodo eu dolor. Nulla purus massa, maximus sed tincidunt ut, volutpat ac ante.
                            </p>
                        </div>
                        <div className='bg-red-500 w-full h-[30%] flex-1 flex box-border'>d</div>
                    </div>
                    <div className="bg-yellow-500 flex-1"></div>
                </div>
            </div>
            <div className="w-[80%] h-[95%] bg-green-500 flex-shrink-0"></div>
        </div>
    )
}

export default Posts
