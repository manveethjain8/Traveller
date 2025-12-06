import type { IndividualLeg_Interface} from "../../../../configs/types_and_interfaces";


type DisplayThirdLayerProps = {
    activeDisplayLeg: IndividualLeg_Interface | undefined
}

const DisplayLegThirdLayer = ({activeDisplayLeg}: DisplayThirdLayerProps) => { 
    return (
        <div className="border border-red-500 min-h-[15rem] w-full rounded-xl">
            {activeDisplayLeg && 
                <div key={activeDisplayLeg._id} className="h-full w-full grid grid-cols-4 gap-x-[3rem] box-border p-2 ">
                    <div className="h-full w-full flex-col ">
                        <div className="flex flex-1 flex-col w-full gap-y-4">
                            <strong className="text-center">Restaurants</strong>
                            <div className="w-full h-fit flex flex-row gap-x-2 justify-center items-center">
                                <strong >Availability</strong>
                                <p className="flex-1 border rounded-3xl focus:outline-none text-center box-border border-red-500 border-2">
                                    {activeDisplayLeg.restaurants.availability}
                                </p>
                            </div>
                            <div className="w-[80%] h-[0.2rem] bg-red-500 self-center"></div>
                            <div className="flex-1 flex w-full flex-col gap-x-2 justify-center items-center">
                                <strong >Recommendation</strong>
                                <p
                                    className="min-h-[8rem] w-full rounded-xl focus:outline-none text-center box-border p-2 resize-none"
                                >
                                    {activeDisplayLeg.restaurants.recommendation}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex flex-1 flex-col w-full gap-y-4">
                            <strong className="text-center">Fuel and Services</strong>
                            <div className="w-full h-fit flex flex-row gap-x-2 justify-center items-center">
                                <strong >Availability</strong>
                                <p className="flex-1 border rounded-3xl focus:outline-none text-center box-border border-red-500 border-2">
                                    {activeDisplayLeg.fuelAndServices.availability}
                                </p>
                            </div>
                            <div className="w-[80%] h-[0.2rem] bg-red-500 self-center"></div>
                            <div className="flex-1 flex w-full flex-col gap-x-2 justify-center items-center">
                                <strong >Recommendation</strong>
                                <p
                                    className="min-h-[8rem] w-full rounded-xl focus:outline-none text-center box-border p-2 resize-none"
                                >
                                    {activeDisplayLeg.fuelAndServices.recommendation}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex flex-1 flex-col w-full gap-y-4">
                            <strong className="text-center">Stays</strong>
                            <div className="w-full h-fit flex flex-row gap-x-2 justify-center items-center">
                                <strong >Availability</strong>
                                <p className="flex-1 border rounded-3xl focus:outline-none text-center box-border border-red-500 border-2">
                                    {activeDisplayLeg.stays.availability}
                                </p>
                            </div>
                            <div className="w-[80%] h-[0.2rem] bg-red-500 self-center"></div>
                            <div className="flex-1 flex w-full flex-col gap-x-2 justify-center items-center">
                                <strong >Recommendation</strong>
                                <p
                                    className="min-h-[8rem] w-full rounded-xl focus:outline-none text-center box-border p-2 resize-none"
                                >
                                    {activeDisplayLeg.stays.recommendation}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex flex-1 flex-col w-full gap-y-4">
                            <strong className="text-center">Network</strong>
                            <div className="w-full h-fit flex flex-row gap-x-2 justify-center items-center">
                                <strong >Availability</strong>
                                <p className="flex-1 border rounded-3xl focus:outline-none text-center box-border border-red-500 border-2">
                                    {activeDisplayLeg.network.availability}
                                </p>
                            </div>
                            <div className="w-[80%] h-[0.2rem] bg-red-500 self-center"></div>
                            <div className="flex-1 flex w-full flex-col gap-x-2 justify-center items-center">
                                <strong >Recommendation</strong>
                                <p
                                    className="min-h-[8rem] w-full rounded-xl focus:outline-none text-center box-border p-2 resize-none"
                                >
                                    {activeDisplayLeg.network.recommendation}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default DisplayLegThirdLayer
