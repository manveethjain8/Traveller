import { useSitrepContext } from "../../contexts/sitrepContext"
import Sidebar from "../sidebar/Sidebar"
import TopBar from "../topbar/TopBar"
import addIcon from '../../assets/icons/add_50dp_E3E3E3_FILL0_wght700_GRAD0_opsz48.png'
import deleteIcon from '../../assets/icons/close_50dp_E3E3E3_FILL0_wght700_GRAD200_opsz20.png'
import SitrepDescriptionReception from "./subcomponents/SitrepDescriptionReception"
import SitrepImagesReception from "./subcomponents/SitrepImagesReception"


const AddSitreps = () => {

    const {sitrepUploading, sitrepUploadable, handleSetSitreps, setActiveSitrepId, activeSitrepId, handleDeleteSitreps} = useSitrepContext()

    console.log(sitrepUploadable)

    return (
        <div className="w-screen h-screen flex">
            {sitrepUploading === true && 
                <div className='z-100 fixed w-screen h-screen bg-black/70 flex justify-center items-center'>
                    <strong className="text-[2rem]">Uploading...</strong>
                </div>
            }
            <TopBar/>
            <Sidebar/>
            <div 
                className="fixed bottom-0 right-0 flex flex-col gap-y-3
                            2xl:top-[4rem] 2xl:left-[15rem]
                            3xl:top-[5rem] 3xl:left-[17rem]"
            >
                    <div className="h-[60%] w-[3rem] fixed bottom-[30%] right-[5%]">
                    {sitrepUploadable.map((s => (
                        <div key={s.id} className="flex flex-col justify-center items-center w-full h-fit">
                            <div
                                className="min-h-[2rem] w-full text-center text-[1.5rem] hover:cursor-pointer flex flex-row"
                                style={s.id === activeSitrepId ? {backgroundColor: 'green'} : {backgroundColor: ''}}
                                onClick={() => setActiveSitrepId(s.id)}
                            >
                                <strong className="relative left-[32%]">{s.id}</strong>
                                <img
                                    className='relative w-[1.5rem] h-[1.5rem] rounded-full bg-red-500 hover:bg-red-700 active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer p-1 top-[-0.8rem] left-[40%]' 
                                    src={deleteIcon} 
                                    alt='add icon'
                                    onClick={() => handleDeleteSitreps(s.id)} 
                                />
                            </div>
                            <div className="w-full h-[0.2rem] bg-yellow-500 my-[0.2rem]"></div>
                        </div>
                    )))}
                    <div className="rounded-xl flex w-full h-fit items-center justify-center hover:bg-green-600 active:bg-green-700 transition-all duration-300 ease-in-out cursor-pointer">
                        <img
                            className='h-[2rem]' 
                            src={addIcon} 
                            alt='add icon'
                            onClick={handleSetSitreps}
                        />
                    </div>
                </div>
                <div className="flex flex-4 w-full max-h-[70%]">
                    <SitrepImagesReception/>
                </div>
                <div className="flex flex-1 w-full max-h-[20%]">
                    <SitrepDescriptionReception/>
                </div>
            </div>
        </div>
    )
}

export default AddSitreps
