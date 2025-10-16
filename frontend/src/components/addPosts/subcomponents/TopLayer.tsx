import PI from '../../../assets/background_images/1302525-3840x2160-desktop-4k-anime-background-image.jpg'
import Baits from './topLayerSubcomponents/Baits'

const TopLayer = () => {
    return (
        <div className='flex h-[36rem] flex-row'>
            <div className="flex-1">
                <img 
                    src={PI} 
                    alt='Post Image'
                    className='w-full h-full object-center object-cover border border-red-500 border-2'
                />
            </div>
            <div className="flex-3 flex flex-col">
                <div className='flex-2 flex flex-col box-border px-4'>
                    <div className='relative flex-1 flex flex-row w-full mb-1'>
                            <input 
                                type="text"
                                placeholder='Name of Expedition'
                                className='bg-[#36454F] absolute left-[40%] text-center font-bold h-full placeholder:font-bold focus:outline-none rounded-3xl box-border'
                            />

                            <input 
                                type="date"
                                className='bg-[#36454F] absolute right-[5%] text-center text-gray-400 h-full font-bold focus:outline-none rounded-3xl box-border px-2'
                            />
                    </div>
                    <div className='flex-5 w-full'>
                        <textarea 
                            placeholder='Add an introduction'
                            className='bg-[#36454F] w-full h-full resize-none placeholder:text-center focus:outline-none rounded-3xl box-border p-3'
                        />
                    </div>
                </div>
                <div className='flex-1 grid grid-cols-4 gap-y-[1rem] gap-x-[3rem] justify-center place-items-end box-border pt-4 pr-5'>
                    <Baits/>
                </div>
            </div>
        </div>
    )
}

export default TopLayer
