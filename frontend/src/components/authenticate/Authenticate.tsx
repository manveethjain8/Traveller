import WP from '../../assets/background_images/authenticate_page_background.jpg'
import GoogleIcon from '../../assets/logo/google.png'

const Authenticate = () => {
    return (
        <div className="fixed w-screen h-screen flex justify-center items-center">
            <div className="flex 2xl:w-[60%] 2xl:h-[80%] border-box">
                <div className='flex flex-1 h-full max-w-[50%] rounded-l-xl' style={{backgroundImage: `url(${WP})`, backgroundSize: 'cover', backgroundPosition: "center"}}>
                </div>
                <div className='relative flex flex-1 flex-col h-full max-w-[50%] box-border p-1
                                2xl:p-5'>
                    <p className='w-full h-fit m-0 p-0 self-center text-center text-[3rem] font-["Oddly-Calm"]
                                    2xl:max-h-[4.5rem] 2xl:text-[4rem]
                                    3xl:max-h-[5.5rem] 3xl:text-[4.5rem]'
                    >
                        Traveller
                    </p>
                    <p className='w-full h-fit text-center text-[1rem] font-["Byrophena"]
                                    2xl:h-[2rem] 2xl:text-[2rem]
                                    3xl:max-h-[3rem] 3xl:text-[2.5rem]'
                    >
                        What's Your Next Adventure?
                    </p>
                    <button 
                        onClick={() => window.location.href = "http://localhost:5000/auth/google"}
                        className='h-[2rem] w-[2rem] relative self-center top-[25%] rounded-full hover:bg-yellow-700 active:bg-yellow-800 transition-all duration-200 ease-in-out cursor-pointer
                                    2xl:h-[3rem] 2xl:w-[3rem] 2xl:px-2 2xl:py-2
                                    3xl:h-[4rem] 3xl:w-[4rem] 3xl:px-3 3xl:py-3'
                    >
                        <img className='h-full w-full' src={GoogleIcon} alt='Google' 
                    />
                    </button>
                    <p className='absolute font-["Avenir"]
                                    2xl:text-[1.1rem] 2xl:bottom-5
                                    3xl:text-[1.2rem]'
                    >
                        The journey, not the arrival, matters. While the destination may be the goal, the most valuable part of any trip is the experience of getting there. It's the people you meet, the lessons you learn, and the memories you make along the way. So don't rush through the journey; savor every moment.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Authenticate
