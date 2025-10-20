
const LegThirdLayer = () => {
    return (
        <div className="border border border-2 min-h-[15rem] w-full grid grid-cols-4 gap-x-[3rem] border-red-500 box-border p-2 rounded-xl">
            <div className="flex flex-col">
                <div className="flex flex-1 flex-col w-full gap-y-4">
                    <strong className="text-center">Restaurant</strong>
                    <div className="w-full h-fit flex flex-row gap-x-2 justify-center items-center">
                        <strong >Availability</strong>
                        <input
                            type="text"
                            placeholder="Enter status" 
                            className="flex-1 border rounded-3xl focus:outline-none text-center box-border border-red-500 border-2"
                        />
                    </div>
                    <div className="w-[80%] h-[0.2rem] bg-red-500 self-center"></div>
                    <div className="flex flex-1 w-full flex-col gap-x-2 justify-center items-center">
                        <strong >Recommended</strong>
                        <textarea 
                            className="bg-[#36454F] h-full w-full rounded-xl focus:outline-none text-center box-border p-2 resize-none"
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col">
                <div className="flex flex-1 flex-col w-full gap-y-4">
                    <strong className="text-center">Fuel</strong>
                    <div className="w-full h-fit flex flex-row gap-x-2 justify-center items-center">
                        <strong >Availability</strong>
                        <input
                            type="text"
                            placeholder="Enter status" 
                            className="flex-1 border rounded-3xl focus:outline-none text-center box-border border-red-500 border-2"
                        />
                    </div>
                    <div className="w-[80%] h-[0.2rem] bg-red-500 self-center"></div>
                    <div className="flex flex-1 w-full flex-col gap-x-2 justify-center items-center">
                        <strong >Recommended</strong>
                        <textarea 
                            className="bg-[#36454F] h-full w-full rounded-xl focus:outline-none text-center box-border p-2 resize-none"
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col">
                <div className="flex flex-1 flex-col w-full gap-y-4">
                    <strong className="text-center">Stay</strong>
                    <div className="w-full h-fit flex flex-row gap-x-2 justify-center items-center">
                        <strong >Availability</strong>
                        <input
                            type="text"
                            placeholder="Enter status" 
                            className="flex-1 border rounded-3xl focus:outline-none text-center box-border border-red-500 border-2"
                        />
                    </div>
                    <div className="w-[80%] h-[0.2rem] bg-red-500 self-center"></div>
                    <div className="flex flex-1 w-full flex-col gap-x-2 justify-center items-center">
                        <strong >Recommended</strong>
                        <textarea 
                            className="bg-[#36454F] h-full w-full rounded-xl focus:outline-none text-center box-border p-2 resize-none"
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col">
                <div className="flex flex-1 flex-col w-full gap-y-4">
                    <strong className="text-center">ATMs</strong>
                    <div className="w-full h-fit flex flex-row gap-x-2 justify-center items-center">
                        <strong >Availability</strong>
                        <input
                            type="text"
                            placeholder="Enter status" 
                            className="flex-1 border rounded-3xl focus:outline-none text-center box-border border-red-500 border-2"
                        />
                    </div>
                    <div className="w-[80%] h-[0.2rem] bg-red-500 self-center"></div>
                    <div className="flex flex-1 w-full flex-col gap-x-2 justify-center items-center">
                        <strong >Recommended</strong>
                        <textarea 
                            className="bg-[#36454F] h-full w-full rounded-xl focus:outline-none text-center box-border p-2 resize-none"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LegThirdLayer
