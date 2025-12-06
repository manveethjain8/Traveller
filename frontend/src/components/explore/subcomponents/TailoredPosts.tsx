import { useDisplayPostContext } from "../../../contexts/displayPostContext"
import defaultPP from '../../../assets/icons/account_circle_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png'
import defaultTNP from '../../../assets/icons/image_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png'
import { dateFormater } from "../../../utils/formatUtils"
import { useStartupContext } from "../../../contexts/startupContext"
import { useNavigate } from "react-router-dom"
import TailoredPostsSummary from "./TailoredPostsSummary"


const TailoredPosts = () => {

    const {semanticPosts, getSpecificPost} = useDisplayPostContext()
    const {setNavigationCategorytoLocalStorage, setSideBarCategory} = useStartupContext()

    const navigate = useNavigate()

    return (
        <div className="w-full h-full">
            {semanticPosts && semanticPosts.map(p => (
                <div 
                    key={p._id}
                    className='w-full h-full flex flex-col gap-y-5 box-border items-center '
                >
                    <div className="w-full min-h-[100%] max-h-[100%] flex flex-col">
                        <div className='flex-1 flex max-h-[10%] w-full'>
                            <div className='flex-1 flex items-center box-border gap-x-4'>
                                <div className="w-[15%] aspect-square rounded-full">
                                    <img 
                                        className="w-full h-full rounded-full object-cover object-center"
                                        src={p.account.profilePicture ?? defaultPP} 
                                        alt="profile picture" 
                                    />
                                </div>
                                <p>{p.account.userName}</p>
                            </div>
                            <div className='flex-1 flex justify-center items-center box-border px-4'>
                                <p>{p.expeditionName}</p>
                            </div>
                            <div className='flex-1 flex justify-center items-center box-border px-4'>
                                <p>{p.date ? dateFormater(p.date) : 'Undefined'}</p>
                            </div>
                        </div>
                        <div 
                            className='flex-9 flex flex-row max-h-[90%] hover:cursor-pointer'
                            onClick={() => {
                                        getSpecificPost(p._id)
                                        setSideBarCategory(undefined)
                                        setNavigationCategorytoLocalStorage('undifined')
                                        navigate('/displayPost')
                                    }}
                        >
                            <div className="flex-1 h-full">
                                <img
                                    className='h-full w-full object-center object-cover' 
                                    src={p.thumbnail ?? defaultTNP} alt="post image" 
                                />
                            </div>
                            <div className='flex-1 h-full' >
                                <TailoredPostsSummary
                                    post={p}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TailoredPosts
