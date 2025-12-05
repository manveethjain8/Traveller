import type {Posts_Interface } from "../../../../configs/types_and_interfaces"

type DisplayFirstLayerProps = {
    fullPost: Posts_Interface | undefined
}



const DisplayBaits = ({fullPost}: DisplayFirstLayerProps) => {
    return (
        <>
            <div className='min-w-[12rem]'>
                <p className='text-center font-bold'>Expedition Days</p>
                <p className='border w-full h-fit border-red-500 border-2 rounded-3xl focus:outline-none text-center box-border p-1'>
                    {fullPost?.days}
                </p>
            </div>


            <div className='min-w-[12rem]'>
                <p className='text-center font-bold'>Travel Distance (KM)</p>
                <p className='border w-full h-fit border-red-500 border-2 rounded-3xl focus:outline-none text-center box-border p-1'>
                    {fullPost?.totalDistance}
                </p>
            </div>


            <div className='min-w-[12rem]'>
                <p className='text-center font-bold'>Travel Expenses</p>
                <p className='border w-full h-fit border-red-500 border-2 rounded-3xl focus:outline-none text-center box-border p-1'>
                    {fullPost?.expenses}
                </p>
            </div>


            <div className='min-w-[12rem]'>
                <p className='text-center font-bold'>Amenities</p>
                <p className='border w-full h-fit border-red-500 border-2 rounded-3xl focus:outline-none text-center box-border p-1'>
                    {fullPost?.amenities}
                </p>
            </div>


            <div className='min-w-[12rem]'>
                <p className='text-center font-bold'>Season</p>
                <p className='border w-full h-fit border-red-500 border-2 rounded-3xl focus:outline-none text-center box-border p-1'>
                    {fullPost?.season}
                </p>
            </div>


            <div className='min-w-[12rem]'>
                <p className='text-center font-bold'>Environment</p>
                <p className='border w-full h-fit border-red-500 border-2 rounded-3xl focus:outline-none text-center box-border p-1'>
                    {fullPost?.environment}
                </p>
            </div>


            <div className='min-w-[12rem]'>
                <p className='text-center font-bold'>Transport</p>
                <p className='border w-full h-fit border-red-500 border-2 rounded-3xl focus:outline-none text-center box-border p-1'>
                    {fullPost?.transport}
                </p>
            </div>


            <div className='min-w-[12rem]'>
                <p className='text-center font-bold'>Landscape</p>
                <p className='border w-full h-fit border-red-500 border-2 rounded-3xl focus:outline-none text-center box-border p-1'>
                    {fullPost?.landscape}
                </p>
            </div>


            <div className='min-w-[12rem]'>
                <p className='text-center font-bold'>Level of Challenge</p>
                <p className='border w-full h-fit border-red-500 border-2 rounded-3xl focus:outline-none text-center box-border p-1'>
                    {fullPost?.difficulty}
                </p>
            </div>


            <div className='min-w-[12rem]'>
                <p className='text-center font-bold'>Location</p>
                <p className='border w-full h-fit border-red-500 border-2 rounded-3xl focus:outline-none text-center box-border p-1'>
                    {fullPost?.locationString}
                </p>
            </div>


            <div className='min-w-[12rem]'>
                <p className='text-center font-bold'>Footfall</p>
                <p className='border w-full h-fit border-red-500 border-2 rounded-3xl focus:outline-none text-center box-border p-1'>
                    {fullPost?.footfall}
                </p>
            </div>


            <div className='min-w-[12rem]'>
                <p className='text-center font-bold'>Dangers</p>
                <p className='border w-full h-fit border-red-500 border-2 rounded-3xl focus:outline-none text-center box-border p-1'>
                    {fullPost?.dangers}
                </p>
            </div>
        </>
    )
}

export default DisplayBaits
