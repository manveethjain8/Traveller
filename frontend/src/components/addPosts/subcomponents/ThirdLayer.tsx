import addIcon from '../../../assets/icons/add_50dp_E3E3E3_FILL0_wght700_GRAD0_opsz48.png'
import deleteIcon from '../../../assets/icons/close_50dp_E3E3E3_FILL0_wght700_GRAD200_opsz20.png'
import { useAddPostContext } from '../../../contexts/addPostContext'
import LegFirstLayer from './thirdLayerSubcomponents/LegFirstLayer'
import LegSecondLayer from './thirdLayerSubcomponents/LegSecondLayer'
import LegThirdLayer from './thirdLayerSubcomponents/LegThirdLayer'

const ThirdLayer = () => {
    const {legs, activeLeg ,setActiveLegId, activeLegId, handleSetLegs, handleDeleteLegs, handleLegInputChange} = useAddPostContext()
    return (
        <div className="w-full h-fit flex flex-col mt-10 p-4">
            <div className="w-full h-fit flex flex-row border-b-2 border-red-500 items-center">
                {legs.map((l) => (
                    < div key={l.id} className='flex flex-row items-center'>
                        <div 
                            onClick={() => setActiveLegId(l.id)}
                            className="rounded-xl py-[0.5rem] pl-[1.5rem] pr-[0.5rem] flex flex-row items-center cursor-pointer"
                            style={l.id === activeLegId ? {backgroundColor: 'green'} : {backgroundColor: 'orange'}}
                        >
                            <p className='mr-[0.5rem]'>{l.name}</p>
                            <img
                                className='w-[1.7rem] h-[1.7rem] self-right rounded-full flex justify-center items-center hover:bg-red-700 active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer p-1' 
                                src={deleteIcon} 
                                alt='add icon'
                                onClick={() => handleDeleteLegs(l.id)} 
                            />
                        </div>
                        <div className="w-[0.4rem] h-[1.5rem] bg-yellow-500 mx-[0.2rem]"></div>
                    </div>
                ))}
                <div className="rounded-xl py-[0.5rem] px-[0.5rem] hover:bg-green-600 active:bg-green-700 transition-all duration-300 ease-in-out cursor-pointer p-1">
                    <img
                        className='w-[1.5rem] h-[1.5rem]' 
                        src={addIcon} 
                        alt='add icon'
                        onClick={handleSetLegs}
                    />
                </div>
            </div>
            <div className='flex flex-col w-full h-fit mt-[2rem]'>
                <LegFirstLayer 
                    activeLeg={activeLeg}
                    handleLegInputChange={handleLegInputChange}
                />
            </div>
            <div className='flex flex-col w-full h-fit mt-[2rem]'>
                <LegSecondLayer
                    activeLeg={activeLeg}
                    handleLegInputChange={handleLegInputChange}
                />
            </div>
            <div className='flex flex-col w-full h-fit mt-[2rem]'>
                <LegThirdLayer
                    
                />
            </div>
        </div>
    )
}

export default ThirdLayer
