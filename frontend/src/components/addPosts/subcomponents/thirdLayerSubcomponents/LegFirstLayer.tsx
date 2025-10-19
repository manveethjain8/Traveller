import addIcon from '../../../../assets/icons/add_50dp_E3E3E3_FILL0_wght700_GRAD0_opsz48.png'
import deleteIcon from '../../../../assets/icons/close_50dp_E3E3E3_FILL0_wght700_GRAD0_opsz48.png'
import DI from '../../../../assets/icons/image_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png'
import type { IndividualLeg_type } from '../../../../configs/types_and_interfaces';
import { useAddPostContext } from '../../../../contexts/addPostContext';

type ThirdLayerProps = {
    activeLeg: IndividualLeg_type | null
    handleLegInputChange: (
        legId: string,
        field: keyof IndividualLeg_type['legData'],
        value: any,
        index?: number
    ) => void;
};

const LegFirstLayer = ({activeLeg, handleLegInputChange}: ThirdLayerProps) => {

    const {handleLegPhotoDelete} = useAddPostContext()

    return (
        <div className="flex flex-col gap-x-2">
            {activeLeg && 
                <div key={activeLeg.id} className='w-full h-fit flex flex-row'>
                    <div className="relative flex-[20rem] min-w-[10rem] min-h-[30rem] max-w-[60rem] max-h-[30rem] border border-red-500 border-2">
                        {activeLeg.legPreview.startPhoto && 
                            <div className='absolute top-1 right-1 bg-red-500 w-[2.5rem] h-[2.5rem] rounded-full flex justify-center items-center hover:bg-red-700 active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer'>
                            <img 
                                src={deleteIcon} 
                                alt='add icon'
                                className='w-[1.5rem] h-[1.5rem] object-center object-fit'
                                onClick={() => handleLegPhotoDelete(activeLeg.id, 0)}
                            />
                        </div>
                        }
                        {activeLeg.legPreview.startPhoto ? (
                            <img 
                                src={activeLeg.legPreview.startPhoto as string || ''} 
                                alt='Post Image'
                                className='w-full h-full object-center object-cover '
                            />
                        ) : (
                            <img 
                                src={DI} 
                                alt='Post Image'
                                className='mx-auto mt-[20%] object-center object-fit'
                            />
                        )}
                        <div className='absolute bottom-1 right-1 bg-red-500 w-[2.5rem] h-[2.5rem] rounded-full flex justify-center items-center hover:bg-red-700 active:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer'>
                            <input 
                                id={`legStartFileInput-${activeLeg.id}`}
                                type="file" 
                                className='hidden'
                                accept='image/*'
                                onChange={(e) => {
                                const file = e.target.files?.[0]
                                if(file){
                                    handleLegInputChange(activeLeg.id,'startPhoto', file)
                                }
                            }}
                            />
                            <label htmlFor={`legStartFileInput-${activeLeg.id}`}>
                                <img 
                                    src={addIcon} 
                                    alt='add icon'
                                    className='w-[1.5rem] h-[1.5rem] object-center object-fit cursor-pointer'
                                />
                            </label>
                        </div>
                        
                    </div>
                    <div className='flex-1 flex flex-col'>
                        <div className='flex-4 w-full box-border p-2'>
                            <textarea 
                                value={activeLeg.legData.legIntroduction}
                                placeholder='Add an introduction'
                                className='bg-[#36454F] w-full h-full resize-none placeholder:text-center focus:outline-none rounded-3xl box-border p-3 overflow-y-auto'
                                onChange={(e) => handleLegInputChange(activeLeg.id, 'legIntroduction', e.target.value)}
                            />
                        </div>
                        <div className='flex-5 mt-2 w-full h-full grid grid-cols-2 gap-y-[1rem] gap-x-[1rem] box-border p-2 place-items-center'>
                            <div className='w-fit h-fit'>
                                <p className='text-center font-bold'>Leg Start Date</p>
                                <input 
                                    value={activeLeg.legData.startDate}
                                    type="date" 
                                    className='border w-fit h-fit border-red-500 border-2 rounded-3xl
                                    focus:outline-none text-center box-border px-6 py-[0.4rem]'
                                    onChange={(e) => handleLegInputChange(activeLeg.id, 'startDate', e.target.value)}
                                />
                            </div>
                            <div className='w-fit h-fit'>
                                <p className='text-center font-bold'>Leg Distance (KM)</p>
                                <input 
                                    value={activeLeg.legData.legDistance}
                                    type="number" 
                                    className='border w-fit h-fit border-red-500 border-2 rounded-3xl
                                    focus:outline-none text-center box-border p-1
                                    
                                    appearance-none
                                    [appearance:textfield]
                                    [&::-webkit-inner-spin-button]:appearance-none
                                    [&::-webkit-outer-spin-button]:appearance-none'
                                    onChange={(e) => handleLegInputChange(activeLeg.id, 'legDistance', e.target.value)}
                                />
                            </div>
                            <div className='w-fit h-fit'>
                                <p className='text-center font-bold'>Environment</p>
                                <input 
                                    value={activeLeg.legData.environment}
                                    type="text" 
                                    className='border w-fit h-fit border-red-500 border-2 rounded-3xl
                                    focus:outline-none text-center box-border p-1'
                                    onChange={(e) => handleLegInputChange(activeLeg.id, 'environment', e.target.value)}
                                />
                            </div>
                            <div className='w-fit h-fit'>
                                <p className='text-center font-bold'>Landscape</p>
                                <input 
                                    value={activeLeg.legData.landscape}
                                    type="text" 
                                    className='border w-fit h-fit border-red-500 border-2 rounded-3xl
                                    focus:outline-none text-center box-border p-1'
                                    onChange={(e) => handleLegInputChange(activeLeg.id, 'landscape', e.target.value)}
                                />
                            </div>
                            <div className='w-fit h-fit'>
                                <p className='text-center font-bold'>Weather</p>
                                <input 
                                    value={activeLeg.legData.weather}
                                    type="text" 
                                    className='border w-fit h-fit border-red-500 border-2 rounded-3xl
                                    focus:outline-none text-center box-border p-1'
                                    onChange={(e) => handleLegInputChange(activeLeg.id, 'weather', e.target.value)}
                                />
                            </div>
                            <div className='w-fit h-fit'>
                                <p className='text-center font-bold'>Location</p>
                                <input 
                                    value={activeLeg.legData.location}
                                    type="text" 
                                    className='border w-fit h-fit border-red-500 border-2 rounded-3xl
                                    focus:outline-none text-center box-border p-1'
                                    onChange={(e) => handleLegInputChange(activeLeg.id, 'location', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default LegFirstLayer
