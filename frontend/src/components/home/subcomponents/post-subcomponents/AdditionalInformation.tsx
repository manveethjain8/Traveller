import type { PostsSummary_Type } from "../../../../configs/types_and_interfaces"
import { useInteractionsContext } from "../../../../contexts/interactionsContext"
import moreIcon from '../../../../assets/icons/more_vert_50dp_FFFFFF_FILL0_wght700_GRAD0_opsz48.png'
import infoIcon from '../../../../assets/icons/article_50dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.png'

type PostsProviderProps = {
    post: PostsSummary_Type
}

const AdditionalInformation = ({post}: PostsProviderProps) => {

    const {toggleAdditionalInformation} = useInteractionsContext()

    return (
        <div className="w-full h-full border flex flex-col">
            <div className="flex-1 relative flex flex-row">
                <div className="w-full h-full flex items-center justify-center">
                    <div className="w-[5%] h-full flex flex-col items-center">
                        <img 
                            src={infoIcon}
                            alt="info icon"
                            className="w-[70%] h-[70%] hover:bg-red-500 hover:rounded-full p-[0.3rem] active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer" 
                        />
                        <strong className='text-[0.9rem]'>Info</strong>
                    </div>
                    <div 
                        onClick={() => toggleAdditionalInformation(post._id)}
                        className='absolute right-2 w-[2.5rem] hover:bg-red-500 hover:rounded-full p-[0.3rem] active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer'>
                        <img
                            className='w-full h-full' 
                            src={moreIcon} 
                            alt="menu icon" />
                    </div>
                </div>
            </div>
            <div className="flex-11">
            </div>
        </div>
    )
}

export default AdditionalInformation
