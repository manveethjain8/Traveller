import type { AddPost_Type } from "../../../../configs/types_and_interfaces"

type FirstLayerProps = {
    newPost: AddPost_Type
    handleNewPostInputChange: <K extends keyof AddPost_Type['postData']>(field: K, value: AddPost_Type['postData'][K]) => void
}



const Baits = ({newPost, handleNewPostInputChange}: FirstLayerProps) => {
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
                    value={newPost.postData.days}
                    onChange={(e) => handleNewPostInputChange('days', Number(e.target.value))}
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
                    value={newPost.postData.totalDistance}
                    onChange={(e) => handleNewPostInputChange('totalDistance', Number(e.target.value))}
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
                    value={newPost.postData.expenses}
                    onChange={(e) => handleNewPostInputChange('expenses', Number(e.target.value))}
                />
            </div>


            <div className='w-fit h-fit'>
                <p className='text-center font-bold'>Amenities</p>
                <input 
                    type="text" 
                    className='border w-fit h-fit border-red-500 border-2 rounded-3xl
                    focus:outline-none text-center box-border p-1'
                    value={newPost.postData.amenities}
                    onChange={(e) => handleNewPostInputChange('amenities', e.target.value)}
                />
            </div>


            <div className='w-fit h-fit'>
                <p className='text-center font-bold'>Season</p>
                <input 
                    type="text" 
                    className='border w-fit h-fit border-red-500 border-2 rounded-3xl
                    focus:outline-none text-center box-border p-1'
                    value={newPost.postData.season}
                    onChange={(e) => handleNewPostInputChange('season', e.target.value)}
                />
            </div>


            <div className='w-fit h-fit'>
                <p className='text-center font-bold'>Environment</p>
                <input 
                    type="text" 
                    className='border w-fit h-fit border-red-500 border-2 rounded-3xl
                    focus:outline-none text-center box-border p-1'
                    value={newPost.postData.environment}
                    onChange={(e) => handleNewPostInputChange('environment', e.target.value)}
                />
            </div>


            <div className='w-fit h-fit'>
                <p className='text-center font-bold'>Transport</p>
                <input 
                    type="text" 
                    className='border w-fit h-fit border-red-500 border-2 rounded-3xl
                    focus:outline-none text-center box-border p-1'
                    value={newPost.postData.transport}
                    onChange={(e) => handleNewPostInputChange('transport', e.target.value)}
                />
            </div>


            <div className='w-fit h-fit'>
                <p className='text-center font-bold'>Landscape</p>
                <input 
                    type="text" 
                    className='border w-fit h-fit border-red-500 border-2 rounded-3xl
                    focus:outline-none text-center box-border p-1'
                    value={newPost.postData.landscape}
                    onChange={(e) => handleNewPostInputChange('landscape', e.target.value)}
                />
            </div>


            <div className='w-fit h-fit'>
                <p className='text-center font-bold'>Level of Challenge</p>
                <input 
                    type="text" 
                    className='border w-fit h-fit border-red-500 border-2 rounded-3xl
                    focus:outline-none text-center box-border p-1'
                    value={newPost.postData.difficulty}
                    onChange={(e) => handleNewPostInputChange('difficulty', e.target.value)}
                />
            </div>


            <div className='w-fit h-fit'>
                <p className='text-center font-bold'>Location</p>
                <input 
                    type="text" 
                    className='border w-fit h-fit border-red-500 border-2 rounded-3xl
                    focus:outline-none text-center box-border p-1'
                    value={newPost.postData.location}
                    onChange={(e) => handleNewPostInputChange('location', e.target.value)}
                />
            </div>


            <div className='w-fit h-fit'>
                <p className='text-center font-bold'>Footfall</p>
                <input 
                    type="text" 
                    className='border w-fit h-fit border-red-500 border-2 rounded-3xl
                    focus:outline-none text-center box-border p-1'
                    value={newPost.postData.footfall}
                    onChange={(e) => handleNewPostInputChange('footfall', e.target.value)}
                />
            </div>


            <div className='w-fit h-fit'>
                <p className='text-center font-bold'>Health Risks</p>
                <input 
                    type="text" 
                    className='border w-fit h-fit border-red-500 border-2 rounded-3xl
                    focus:outline-none text-center box-border p-1'
                    value={newPost.postData.healthRisks}
                    onChange={(e) => handleNewPostInputChange('healthRisks', e.target.value)}
                />
            </div>
        </>
    )
}

export default Baits
