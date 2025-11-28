import { useStartupContext } from "../../contexts/startupContext"


const TopBar = () => {

    const{logoutFunction} = useStartupContext()

    return (
        <div className="fixed w-screen top-0 left-0 box-border
                        2xl:h-[4rem] 2xl:px-15
                        3xl:h-[5rem]">
            <button className="font-[Oddly-Calm] 2xl:text-[3rem] 3xl:text-[3.5rem]">Traveller</button>
            <button 
                className="relative left-[85%] font-[Oddly-Calm] my-auto h-fit 2xl:text-[2rem] 3xl:text-[1.5rem] w-fit p-2
                hover:bg-red-500 hover:rounded-3xl active:bg-red-700 transition-all duration-300 ease-in-out cursor-pointer"
                onClick={() => logoutFunction()}
            >
                Logout
            </button>
        </div>
    )
}

export default TopBar
