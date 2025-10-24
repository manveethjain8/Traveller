import type { AddPost_Type } from "../../../../configs/types_and_interfaces"

type FirstLayerProps = {
    post: AddPost_Type
    handlePostInputChange: <K extends keyof AddPost_Type['postData']>(field: K, value: AddPost_Type['postData'][K]) => void
}



const Baits = ({post, handlePostInputChange}: FirstLayerProps) => {
    return (
        <>
            <div className='w-fit h-fit'>
                <p className='text-center font-bold'>Expedition Days</p>
                <input 
                    type="number" 
                    className='border w-fit h-fit border-red-500 border-2 rounded-3xl
                    focus:outline-none text-center box-border p-1
                    
                    appearance-none
                    [appearance:textfield]
                    [&::-webkit-inner-spin-button]:appearance-none
                    [&::-webkit-outer-spin-button]:appearance-none'
                    value={post.postData.days ?? ''}
                    onChange={(e) => handlePostInputChange('days', Number(e.target.value))}
                />
            </div>


            <div className='w-fit h-fit'>
                <p className='text-center font-bold'>Travel Distance (KM)</p>
                <input 
                    type="number" 
                    className='border w-fit h-fit border-red-500 border-2 rounded-3xl
                    focus:outline-none text-center box-border p-1
                    
                    appearance-none
                    [appearance:textfield]
                    [&::-webkit-inner-spin-button]:appearance-none
                    [&::-webkit-outer-spin-button]:appearance-none'
                    value={post.postData.totalDistance ?? ''}
                    onChange={(e) => handlePostInputChange('totalDistance', Number(e.target.value))}
                />
            </div>


            <div className='w-fit h-fit'>
                <p className='text-center font-bold'>Trip Expenses</p>
                <input 
                    type="number" 
                    className='border w-fit h-fit border-red-500 border-2 rounded-3xl
                    focus:outline-none text-center box-border p-1
                    
                    appearance-none
                    [appearance:textfield]
                    [&::-webkit-inner-spin-button]:appearance-none
                    [&::-webkit-outer-spin-button]:appearance-none'
                    value={post.postData.expenses ?? ''}
                    onChange={(e) => handlePostInputChange('expenses', Number(e.target.value))}
                />
            </div>


            <div className='w-fit h-fit'>
                <p className='text-center font-bold'>Amenities</p>
                <input 
                    type="text" 
                    className='border w-fit h-fit border-red-500 border-2 rounded-3xl
                    focus:outline-none text-center box-border p-1'
                    value={post.postData.amenities ?? ''}
                    onChange={(e) => handlePostInputChange('amenities', e.target.value)}
                />
            </div>


            <div className='w-fit h-fit'>
                <p className='text-center font-bold'>Season</p>
                <input 
                    type="text" 
                    className='border w-fit h-fit border-red-500 border-2 rounded-3xl
                    focus:outline-none text-center box-border p-1'
                    value={post.postData.season ?? ''}
                    onChange={(e) => handlePostInputChange('season', e.target.value)}
                />
            </div>


            <div className='w-fit h-fit'>
                <p className='text-center font-bold'>Environment</p>
                <input 
                    type="text" 
                    className='border w-fit h-fit border-red-500 border-2 rounded-3xl
                    focus:outline-none text-center box-border p-1'
                    value={post.postData.environment ?? ''}
                    onChange={(e) => handlePostInputChange('environment', e.target.value)}
                />
            </div>


            <div className='w-fit h-fit'>
                <p className='text-center font-bold'>Transport</p>
                <input 
                    type="text" 
                    className='border w-fit h-fit border-red-500 border-2 rounded-3xl
                    focus:outline-none text-center box-border p-1'
                    value={post.postData.transport ?? ''}
                    onChange={(e) => handlePostInputChange('transport', e.target.value)}
                />
            </div>


            <div className='w-fit h-fit'>
                <p className='text-center font-bold'>Landscape</p>
                <input 
                    type="text" 
                    className='border w-fit h-fit border-red-500 border-2 rounded-3xl
                    focus:outline-none text-center box-border p-1'
                    value={post.postData.landscape ?? ''}
                    onChange={(e) => handlePostInputChange('landscape', e.target.value)}
                />
            </div>


            <div className='w-fit h-fit'>
                <p className='text-center font-bold'>Level of Challenge</p>
                <input 
                    type="text" 
                    className='border w-fit h-fit border-red-500 border-2 rounded-3xl
                    focus:outline-none text-center box-border p-1'
                    value={post.postData.difficulty ?? ''}
                    onChange={(e) => handlePostInputChange('difficulty', e.target.value)}
                />
            </div>


            <div className='w-fit h-fit'>
                <p className='text-center font-bold'>Location</p>
                <input 
                    type="text" 
                    className='border w-fit h-fit border-red-500 border-2 rounded-3xl
                    focus:outline-none text-center box-border p-1'
                    value={post.postData.locationString ?? ''}
                    onChange={(e) => handlePostInputChange('locationString', e.target.value)}
                />
            </div>


            <div className='w-fit h-fit'>
                <p className='text-center font-bold'>Footfall</p>
                <input 
                    type="text" 
                    className='border w-fit h-fit border-red-500 border-2 rounded-3xl
                    focus:outline-none text-center box-border p-1'
                    value={post.postData.footfall ?? ''}
                    onChange={(e) => handlePostInputChange('footfall', e.target.value)}
                />
            </div>


            <div className='w-fit h-fit'>
                <p className='text-center font-bold'>Health Risks</p>
                <input 
                    type="text" 
                    className='border w-fit h-fit border-red-500 border-2 rounded-3xl
                    focus:outline-none text-center box-border p-1'
                    value={post.postData.healthRisks ?? ''}
                    onChange={(e) => handlePostInputChange('healthRisks', e.target.value)}
                />
            </div>
        </>
    )
}

export default Baits
