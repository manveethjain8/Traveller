import DI from '../../../assets/icons/image_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png'


import DisplayBaits from './displayFirstLayerSubcomponents/DisplayBaits'
import { useDisplayPostContext } from '../../../contexts/displayPostContext'

const DisplayFirstLayer = () => {

    const {fullPost} = useDisplayPostContext()

    return (
        <div className='flex h-[36rem] w-full flex-row'>
            <div className="relative flex-1 w-full h-full min-w-[22.6rem] min-h-[35.8rem]">
                <img 
                    src={fullPost?.thumbnail ?? DI} 
                    alt='Post Image'
                    className='w-full h-full object-center object-cover '
                />      
            </div>
            <div className="flex-3 flex flex-col">
                <div className='flex-2 flex flex-col box-border px-4'>
                    <div className='relative flex-1 flex flex-row w-full mb-1'>
                            <strong className='absolute left-[40%] text-center font-bold h-full rounded-3xl box-border'>
                                {fullPost?.expeditionName}
                            </strong>

                            <strong className='absolute right-[5%] text-center text-gray-400 h-full font-bold  rounded-3xl box-border px-2'>
                                {fullPost?.date}
                            </strong>
                    </div>

                    <div className='flex-5 w-full max-h-[18rem]'>
                        <p className='w-full h-full resize-none focus:outline-none box-border p-3 overflow-y-auto'>
                            {fullPost?.introduction}
                        </p>
                    </div>
                </div>
                <div className='flex-1 grid grid-cols-4 gap-y-[1.5rem] gap-x-[3rem] justify-center place-items-end box-border pt-4 pr-5'>
                    <DisplayBaits
                        fullPost={fullPost}
                    />
                </div>
            </div>
        </div>
    )
}

export default DisplayFirstLayer
