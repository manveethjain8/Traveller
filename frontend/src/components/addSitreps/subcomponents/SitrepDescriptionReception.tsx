import { useSitrepContext } from "../../../contexts/sitrepContext"
import uploadIcon from '../../../assets/icons/upload_50dp_E3E3E3_FILL0_wght700_GRAD200_opsz48.png'
import { useNavigate } from "react-router-dom"


const SitrepDescriptionReception = () => {

    const {activeSitrep, handleSitrepInputChange, handleSitrepSubmit, sitrepUploading} = useSitrepContext()

    const navigate = useNavigate()

    return (
        <div className="w-full h-full box-border p-2 z-1 flex flex-col items-center gap-y-3">
            <textarea 
                placeholder='Add a description'
                className='bg-[#36454F] w-full h-full text-center text-[1.1rem] resize-none placeholder:text-center focus:outline-none rounded-3xl box-border p-3'
                value={(activeSitrep && activeSitrep.sitrepData.description) ?? ""}
                onChange={(e) => handleSitrepInputChange(activeSitrep?.id as number,'description', e.target.value)}
            />

            <button className='flex flex-row h-fit w-fit p-2 rounded-full gap-x-1 items-center bg-red-500 hover:bg-red-700 active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer'>
                <strong>Upload</strong>
                <img 
                    src={uploadIcon} 
                    alt='upload icon' 
                    className='w-[2rem] h-[2rem]'
                    onClick={async() => {
                        const response = await handleSitrepSubmit()
                        if(response === 'success' && sitrepUploading === false){
                            localStorage.removeItem("sitrepData")
                            navigate('/home')
                        }
                        
                    }}
                />
            </button>
        </div>
    )
}

export default SitrepDescriptionReception
