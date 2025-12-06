import type { PostsSummary_Type } from "../../../../configs/types_and_interfaces"

type PostsProviderProps = {
    post: PostsSummary_Type
}

const PostQuickSummary = ({post}: PostsProviderProps) => {
    return (
        <div key={post._id} className="flex flex-col h-full">
            <div className='w-full min-h-[70%] max-h-[70%] flex-1 flex box-border px-4'>
                <p className='h-[98%] w-full line-clamp-18 text-[0.9rem]'>
                    {post.description}
                </p>
            </div>
            <div className='w-full h-[30%] flex-1 grid grid-cols-3 grid-rows-4 place-items-center box-border text-[0.9rem] p-1 cursor-default'>
                <div className='w-[6.5rem] h-[2rem] flex items-center justify-center rounded-3xl box-border p-1 border-2 border-red-500 relative group'>
                    <p className='w-fit h-full '>{post.days} Days</p>

                    <div className='absolute bg-black/70 top-[1%] left-[-365%] w-[20rem] h-fit items-center box-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 rounded-xl text-center'>
                        <p className='text-center font-bold'>{post.days} Days</p>
                        <p className='w-fit h-full '>Represents the total duration of the trip, starting from the day of departure and ending on the day of return. This helps you plan your schedule, pack appropriately, and get a clear understanding of the entire trip experience.</p>
                    </div>
                </div>
                <div className='w-[6.5rem] h-[2rem] flex items-center justify-center rounded-3xl box-border p-1 border-2 border-red-500 relative group'>
                    <p className='w-fit h-full '>{post.totalDistance} Kms</p>

                    <div className='absolute bg-black/70 top-[1%] left-[-490%] w-[20rem] h-fit max-h-[10rem] items-center box-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 rounded-xl text-center'>
                        <p className='text-center font-bold'>{post.totalDistance} Kms</p>
                        <p className='w-fit h-full '>Indicates the total distance covered during the trip. This includes all travel between destinations, whether by road, rail, or air. It gives you an idea of how far you will be traveling overall and helps plan your time for the journey</p>
                    </div>
                </div>
                <div className='w-[6.5rem] h-[2rem] flex items-center justify-center rounded-3xl box-border p-1 border-2 border-red-500 relative group'>
                    <p className='w-fit h-full '>Rs {post.expenses}</p>

                    <div className='absolute bg-black/70 top-[1%] left-[-615%] w-[20rem] h-fit items-center box-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 rounded-xl text-center'>
                        <p className='text-center font-bold'>Rs {post.expenses}</p>
                        <p className='w-fit h-full '>Indicates the estimated total cost of the trip, including travel, accommodation, meals, sightseeing, and other activities. This gives you an idea of how much money you may need to budget for the journey.</p>
                    </div>
                </div>
                <div className='w-[6.5rem] h-[2rem] flex items-center justify-center rounded-3xl box-border p-1 border-2 border-red-500 relative group'>
                    <p className='w-fit h-full '>{post.amenities}</p>

                    <div className='absolute bg-black/70 top-[-100%] left-[-365%] w-[20rem] h-fit  items-center box-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 rounded-xl text-center'>
                        <p className='text-center font-bold'>{post.amenities}</p>
                        <p className='w-fit h-full '>Refers to the amenities and services available during the trip. This may include accommodations, rest stops, dining options, transport services, and other conveniences provided for travelers.</p>
                    </div>
                </div>
                <div className='w-[6.5rem] h-[2rem] flex items-center justify-center rounded-3xl box-border p-1 border-2 border-red-500 relative group'>
                    <p className='w-fit h-full '>{post.season}</p>

                    <div className='absolute bg-black/70 top-[-100%] left-[-490%] w-[20rem] h-fit items-center box-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 rounded-xl text-center'>
                        <p className='text-center font-bold'>{post.season}</p>
                        <p className='w-fit h-full '>Indicates the time of year when the trip took place. It affects the weather, climate, and overall travel experience, including temperature, rainfall, and daylight hours.</p>

                    </div>
                </div>
                <div className='w-[6.5rem] h-[2rem] flex items-center justify-center rounded-3xl box-border p-1 border-2 border-red-500 relative group'>
                    <p className='w-fit h-full '>{post.environment}</p>

                    <div className='absolute bg-black/70 top-[-180%] left-[-615%] w-[20rem] h-fit items-center box-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 rounded-xl text-center'>
                        <p className='text-center font-bold'>{post.environment}</p>
                        <p className='w-fit h-full '>Describe the overall environment and circumstances you may encounter during the trip. This includes weather, road or trail quality, safety, and any other factors that could affect your travel. Conditions helps you prepare properly.</p>
                    </div>
                </div>
                <div className='w-[6.5rem] h-[2rem] flex items-center justify-center rounded-3xl box-border p-1 border-2 border-red-500 relative group'>
                    <p className='w-fit h-full '>{post.transport}</p>

                    <div className='absolute bg-black/70 top-[-250%] left-[-365%] w-[20rem] h-fit items-center box-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 rounded-xl text-center'>
                        <p className='text-center font-bold'>{post.transport}</p>
                        <p className='w-fit h-full '>Refers to the type of transportation used during the trip, such as buses, trains, cars, boats, or airplanes. It gives you an idea of the comfort level, and the approximate time required for each leg of the journey.</p>
                    </div>
                </div>
                <div className='w-[6.5rem] h-[2rem] flex items-center justify-center rounded-3xl box-border p-1 border-2 border-red-500 relative group'>
                    <p className='w-fit h-full '>{post.landscape}</p>

                    <div className='absolute bg-black/70 top-[-300%] left-[-490%] w-[20rem] h-fit max-h-[10rem] items-center box-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 rounded-xl text-center'>
                        <p className='text-center font-bold'>{post.landscape}</p>
                        <p className='w-fit h-full '>Describes the landscape you will encounter during the trip. This may include mountains, hills, plains, forests and so on. Helps to prepare for travel conditions, plan suitable clothing, and understand the physical demands of the journey.</p>
                    </div>
                </div>
                <div className='w-[6.5rem] h-[2rem] flex items-center justify-center rounded-3xl box-border p-1 border-2 border-red-500 relative group'>
                    <p className='w-fit h-full '>{post.difficulty}</p>

                    <div className='absolute bg-black/70 top-[-250%] left-[-615%] w-[20rem] h-fit items-center box-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 rounded-xl text-center'>
                        <p className='text-center font-bold'>{post.difficulty}</p>
                        <p className='w-fit h-full '>Indicates how challenging the trip or specific activities will be. It considers factors like terrain, physical effort required, altitude, and overall travel conditions.</p>
                    </div>
                </div>
                <div className='w-[6.5rem] h-[2rem] flex items-center justify-center rounded-3xl box-border p-1 border-2 border-red-500 relative group'>
                    <p className='w-fit h-full '>{post.locationString}</p>

                    <div className='absolute bg-black/70 top-[-400%] left-[-365%] w-[20rem] h-fit items-center box-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 rounded-xl text-center'>
                        <p className='text-center font-bold'>{post.locationString}</p>
                        <p className='w-fit h-full '>Indicates how far the location is from towns, cities, or civilization. It helps you understand the level of accessibility, availability of facilities, and how isolated the area may be.</p>
                    </div>
                </div>
                <div className='w-[6.5rem] h-[2rem] flex items-center justify-center rounded-3xl box-border p-1 border-2 border-red-500 relative group'>
                    <p className='w-fit h-full '>{post.footfall}</p>

                    <div className='absolute bg-black/70 top-[-400%] left-[-490%] w-[20rem] h-fit max-h-[10rem] items-center box-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 rounded-xl text-center'>
                        <p className='text-center font-bold'>{post.footfall}</p>
                        <p className='w-fit h-full '>Indicates the number of people you are likely to encounter at the destination or during the trip. It helps you understand how busy or crowded the place might be, so you can plan your visit, activities, and expectations accordingly</p>
                    </div>
                </div>
                <div className='w-[6.5rem] h-[2rem] flex items-center justify-center rounded-3xl box-border p-1 border-2 border-red-500 relative group'>
                    <p className='w-fit h-full line-clamp-1'>{`${post.dangers}`.length > 12 ? `${post.dangers}`.slice(0, 12) + `...` : `${post.dangers}`}</p>

                    <div className='absolute bg-black/70 top-[-450%] left-[-615%] w-[20rem] h-fit max-h-[10rem] items-center box-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 rounded-xl text-center'>
                        <p className='text-center font-bold'>{post.dangers}</p>
                        <p className='w-fit h-full '>Indicates any dangers or risks that travelers might face during the journey. This may include wildlife encounters, landslides or other safety concerns. Being aware of these dangers helps you stay alert and take necessary precautions throughout the trip.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostQuickSummary
