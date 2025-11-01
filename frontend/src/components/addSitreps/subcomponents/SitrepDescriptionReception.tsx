import { useSitrepContext } from "../../../contexts/sitrepContext"


const SitrepDescriptionReception = () => {

    const {sitrep, handleSitrepInputChange} = useSitrepContext()

    return (
        <div className="w-full h-full box-border p-2 z-1">
            <textarea 
                placeholder='Add a description'
                className='bg-[#36454F] w-full h-full text-center text-[1.1rem] resize-none placeholder:text-center focus:outline-none rounded-3xl box-border p-3'
                value={sitrep.sitrepData.description || ""}
                onChange={(e) => handleSitrepInputChange('description', e.target.value)}
            />
        </div>
    )
}

export default SitrepDescriptionReception
