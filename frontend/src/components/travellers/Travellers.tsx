import Sidebar from "../sidebar/Sidebar"
import TopBar from "../topbar/TopBar"

import searchIcon from '../../assets/icons/search_50dp_E3E3E3_FILL0_wght700_GRAD0_opsz48.png'
import deleteIcon from '../../assets/icons/close_50dp_E3E3E3_FILL0_wght700_GRAD200_opsz20.png'

import { useInteractionsContext } from "../../contexts/interactionsContext"

const Travellers = () => {

    const {searchedAccounts, setSearchedAccounts, handleAccountSearch, setAccountSearchText, accountSearchText} = useInteractionsContext()

    console.log(searchedAccounts)

    return (
        <div className="w-screen h-screen">
            <TopBar/>
            <Sidebar/>
            <div 
                className="fixed h-[100%] bottom-0 right-0 flex flex-col
                            2xl:top-[4rem] 2xl:left-[15rem]
                            3xl:top-[5rem] 3xl:left-[17rem]"
            >
                <div className="w-full flex-1 flex flex-row justify-center items-center box-border">
                    <div className="min-w-[30rem] flex flex-row justify-center items-center border-2 border-red-500 rounded-3xl px-5 py-2">
                        <img 
                            src={searchIcon} 
                            alt="search icon" 
                            className="max-w-[2rem] flex-1 hover:cursor-pointer"
                            onClick={() => handleAccountSearch()}
                        />
                        <div className="bg-red-500 w-[0.1rem] h-[2rem] mx-[1rem]"></div>
                        <input 
                            type="text" 
                            placeholder="Search for travellers"
                            className="h-full w-full flex-1 focus:outline-none"
                            value={accountSearchText !== undefined ? accountSearchText : ''}
                            onChange={(e) => setAccountSearchText(e.target.value)}
                        />
                        <img 
                            src={deleteIcon} 
                            alt="close icon" 
                            className="max-w-[2rem] flex-1 rounded-full hover:bg-red-500 active:bg-red-700 transition-all duration-300 ease-in-out cursor-pointer"
                            onClick={() => {
                                setAccountSearchText(undefined)
                                setSearchedAccounts([])
                            }}
                        />
                    </div>
                </div>
                <div className="relative w-full h-full grid grid-cols-4 auto-rows-min box-border p-5 gap-x-3 gap-y-3 overflow-y-auto">
                    {searchedAccounts.length > 0 ? (
                        <>
                            {searchedAccounts.map(s => (
                                <div 
                                    key={s._id}
                                    className="h-[5rem] box-border p-2 px-5 flex flex-row items-center gap-x-3 hover:cursor-pointer"
                                >
                                    <div className="w-[4rem] rounded-full h-full">
                                        <img 
                                            src={s.profilePicture} 
                                            alt="profile picture" 
                                            className="w-full h-full rounded-full object-center object-cover"
                                        />
                                    </div>
                                    <strong>
                                        {s.userName}
                                    </strong>
                                </div>
                            ))}
                        </>
                    ) : (
                        <div className="absolute w-fit h-fit top-[35%] left-[40%]">
                            <p className="font-[Oddly-Calm] text-[2rem]">No travellers in sight ! ! !</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Travellers
