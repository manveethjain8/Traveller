import WP from '../../../assets/background_images/authenticate_page_background.jpg'

const Posts = () => {
    return (
        <div className="w-full h-full flex flex-col p-2 gap-y-5 box-border items-center overflow-y-auto">
            <div className="w-[80%] h-[95%] flex-shrink-0 flex flex-col">
                <div className='flex-1 flex max-h-[12%]'>
                    <div className='flex-1 flex items-center box-border px-4 gap-x-1'>
                        <div className="w-[20%] aspect-square rounded-full">
                            <img 
                                className="w-full h-full rounded-full object-cover object-center"
                                src={WP} 
                                alt="profile picture" 
                            />
                        </div>
                        <p>User Name</p>
                    </div>
                    <div className='flex-1 flex justify-center items-center box-border px-4'>
                        <p>Ladakh Dairies</p>
                    </div>
                    <div className='flex-1 flex justify-center items-center box-border px-4'>
                        <p>Trip Date</p>
                    </div>
                </div>
                <div className='flex-9 flex flex-row max-h-[88%]'>
                    <div className="flex-1 h-full">
                        <img
                            className='h-full w-full object-center object-cover' 
                            src={WP} alt="post image" 
                        />
                    </div>
                    <div className="flex-1">
                        <div className='w-full h-[70%] flex-1 flex box-border px-4 '>
                            <p className='h-[94%] w-full line-clamp-15 text-[0.9rem]'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricies eu arcu et lobortis. In eu congue ligula. Sed neque libero, bibendum ac viverra quis, cursus vitae tellus. Mauris ac elit quis ante pretium molestie sit amet ac ligula. Nulla ligula mauris, varius in auctor eget, commodo blandit nibh. Nulla facilisi. Vestibulum in elit odio. Curabitur faucibus, lacus ut pellentesque egestas, erat libero rutrum tortor, at hendrerit urna orci id ligula. Nullam molestie dapibus nisl quis consequat. Phasellus non imperdiet diam, in convallis tellus. Duis non quam vel felis iaculis tristique dapibus dignissim lacus. Curabitur risus eros, hendrerit a suscipit id, commodo eu dolor. Nulla purus massa, maximus sed tincidunt ut, volutpat ac ante.
                            </p>
                        </div>
                        <div className='w-full h-[30%] flex-1 grid grid-cols-3 grid-rows-4 place-items-center box-border text-[0.9rem]'>
                            <div className='w-[6.5rem] h-[2rem] flex items-center justify-center rounded-3xl box-border p-1 border-2 border-red-500 relative group'>
                                <p className='w-fit h-full '>15 Days</p>

                                <div className='absolute bg-black/70 top-[-0.1rem] left-[-21.5rem] w-[21.15rem] h-[9rem] items-center box-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 rounded-xl'>
                                    <p className='text-center font-bold'>15 Days</p>
                                    <p className='w-fit h-full '>Represents the total duration of the trip, starting from the day of departure and ending on the day of return. This helps you plan your schedule, pack appropriately, and get a clear understanding of the entire trip experience.</p>
                                </div>
                            </div>
                            <div className='w-[6.5rem] h-[2rem] flex items-center justify-center rounded-3xl box-border p-1 border-2 border-red-500 relative group'>
                                <p className='w-fit h-full '>3567 Kms</p>

                                <div className='absolute bg-black/70 top-[-0.1rem] left-[-28.45rem] w-[21.15rem] h-[9rem] items-center box-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 rounded-xl'>
                                    <p className='text-center font-bold'>3567 Kms</p>
                                    <p className='w-fit h-full '>Indicates the total distance covered during the trip. This includes all travel between destinations, whether by road, rail, or air. It gives you an idea of how far you will be traveling overall and helps plan your time for the journey</p>
                                </div>
                            </div>
                            <div className='w-[6.5rem] h-[2rem] flex items-center justify-center rounded-3xl box-border p-1 border-2 border-red-500 relative group'>
                                <p className='w-fit h-full '>Rs 54320</p>

                                <div className='absolute bg-black/70 top-[-0.1rem] left-[-35.5rem] w-[21.15rem] h-[9rem] items-center box-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 rounded-xl'>
                                    <p className='text-center font-bold'>Rs 54320</p>
                                    <p className='w-fit h-full '>Indicates the estimated total cost of the trip, including travel, accommodation, meals, sightseeing, and other activities. This gives you an idea of how much money you may need to budget for the journey.</p>
                                </div>
                            </div>
                            <div className='w-[6.5rem] h-[2rem] flex items-center justify-center rounded-3xl box-border p-1 border-2 border-red-500 relative group'>
                                <p className='w-fit h-full '>Abundant</p>

                                <div className='absolute bg-black/70 top-[-2.3rem] left-[-21.45rem] w-[21.15rem] h-[9rem] items-center box-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 rounded-xl'>
                                    <p className='text-center font-bold'>Abundant</p>
                                    <p className='w-fit h-full '>Refers to the amenities and services available during the trip. This may include accommodations, rest stops, dining options, transport services, and other conveniences provided for travelers.</p>
                                </div>
                            </div>
                            <div className='w-[6.5rem] h-[2rem] flex items-center justify-center rounded-3xl box-border p-1 border-2 border-red-500 relative group'>
                                <p className='w-fit h-full '>Summer</p>

                                <div className='absolute bg-black/70 top-[-2.3rem] left-[-28.45rem] w-[21.15rem] h-[9rem] items-center box-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 rounded-xl'>
                                    <p className='text-center font-bold'>Summer</p>
                                    <p className='w-fit h-full '>Indicates the time of year when the trip took place. It affects the weather, climate, and overall travel experience, including temperature, rainfall, and daylight hours.</p>

                                </div>
                            </div>
                            <div className='w-[6.5rem] h-[2rem] flex items-center justify-center rounded-3xl box-border p-1 border-2 border-red-500 relative group'>
                                <p className='w-fit h-full '>Unpredictable</p>

                                <div className='absolute bg-black/70 top-[-2.3rem] left-[-35.5rem] w-[21.15rem] h-[9rem] items-center box-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 rounded-xl'>
                                    <p className='text-center font-bold'>Unpredictable</p>
                                    <p className='w-fit h-full '>Describe the overall environment and circumstances you may encounter during the trip. This includes weather, road or trail quality, safety, and any other factors that could affect your travel. Conditions helps you prepare properly.</p>
                                </div>
                            </div>
                            <div className='w-[6.5rem] h-[2rem] flex items-center justify-center rounded-3xl box-border p-1 border-2 border-red-500 relative group'>
                                <p className='w-fit h-full '>Motorcycle</p>

                                <div className='absolute bg-black/70 top-[-4.7rem] left-[-21.45rem] w-[21.15rem] h-[9rem] items-center box-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 rounded-xl'>
                                    <p className='text-center font-bold'>Motorcycle</p>
                                    <p className='w-fit h-full '>Refers to the type of transportation used during the trip, such as buses, trains, cars, boats, or airplanes. It gives you an idea of the comfort level, and the approximate time required for each leg of the journey.</p>
                                </div>
                            </div>
                            <div className='w-[6.5rem] h-[2rem] flex items-center justify-center rounded-3xl box-border p-1 border-2 border-red-500 relative group'>
                                <p className='w-fit h-full '>Mountains</p>

                                <div className='absolute bg-black/70 top-[-4.7rem] left-[-28.45rem] w-[21.15rem] h-[9rem] items-center box-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 rounded-xl'>
                                    <p className='text-center font-bold'>Mountains</p>
                                    <p className='w-fit h-full '>Describes the landscape you will encounter during the trip. This may include mountains, hills, plains, forests and so on. Helps to prepare for travel conditions, plan suitable clothing, and understand the physical demands of the journey.</p>
                                </div>
                            </div>
                            <div className='w-[6.5rem] h-[2rem] flex items-center justify-center rounded-3xl box-border p-1 border-2 border-red-500 relative group'>
                                <p className='w-fit h-full '>Hard</p>

                                <div className='absolute bg-black/70 top-[-4.7rem] left-[-35.5rem] w-[21.15rem] h-[9rem] items-center box-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 rounded-xl'>
                                    <p className='text-center font-bold'>Hard</p>
                                    <p className='w-fit h-full '>Indicates how challenging the trip or specific activities will be. It considers factors like terrain, physical effort required, altitude, and overall travel conditions.</p>
                                </div>
                            </div>
                            <div className='w-[6.5rem] h-[2rem] flex items-center justify-center rounded-3xl box-border p-1 border-2 border-red-500 relative group'>
                                <p className='w-fit h-full '>Remote</p>

                                <div className='absolute bg-black/70 top-[-7rem] left-[-21.45rem] w-[21.15rem] h-[9rem] items-center box-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 rounded-xl'>
                                    <p className='text-center font-bold'>Remote</p>
                                    <p className='w-fit h-full '>Indicates how far the location is from towns, cities, or civilization. It helps you understand the level of accessibility, availability of facilities, and how isolated the area may be.</p>
                                </div>
                            </div>
                            <div className='w-[6.5rem] h-[2rem] flex items-center justify-center rounded-3xl box-border p-1 border-2 border-red-500 relative group'>
                                <p className='w-fit h-full '>Crowd</p>

                                <div className='absolute bg-black/70 top-[-7rem] left-[-28.45rem] w-[21.15rem] h-[9rem] items-center box-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 rounded-xl'>
                                    <p className='text-center font-bold'>Crowd</p>
                                    <p className='w-fit h-full '>Indicates the number of people you are likely to encounter at the destination or during the trip. It helps you understand how busy or crowded the place might be, so you can plan your visit, activities, and expectations accordingly</p>
                                </div>
                            </div>
                            <div className='w-[6.5rem] h-[2rem] flex items-center justify-center rounded-3xl box-border p-1 border-2 border-red-500 relative group'>
                                <p className='w-fit h-full line-clamp-1'>{"Altitude Sickness".length > 12 ? "Altitude Sickness".slice(0, 12) + "..." : "Altitude Sickness"}</p>

                                <div className='absolute bg-black/70 top-[-7rem] left-[-35.5rem] w-[21.15rem] h-[9rem] items-center box-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 rounded-xl'>
                                    <p className='text-center font-bold'>Altitude Sickness</p>
                                    <p className='w-fit h-full '>Indicates any health issues or risks that travelers might experience. This may include altitude sickness, motion sickness, allergies, or other potential health concerns. Being aware of these conditions helps you take necessary precautions.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1"></div>
                </div>
            </div>
            <div className="w-[80%] h-[95%] bg-green-500 flex-shrink-0"></div>
        </div>
    )
}

export default Posts
