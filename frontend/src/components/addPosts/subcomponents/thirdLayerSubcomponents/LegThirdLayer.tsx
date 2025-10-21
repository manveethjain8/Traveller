import type { IndividualLeg_type } from "../../../../configs/types_and_interfaces";

type ThirdLayerProps = {
    activeLeg: IndividualLeg_type | null
    handleLegInputChange: (
        legId: string,
        field: keyof IndividualLeg_type['legData'],
        value: any,
        index?: number
    ) => void;
}

const LegThirdLayer = ({activeLeg, handleLegInputChange}: ThirdLayerProps) => { 
    return (
        <div className="border border-red-500 min-h-[15rem] w-full rounded-xl">
            {activeLeg && 
                <div key={activeLeg.id} className="h-full w-full grid grid-cols-4 gap-x-[3rem] box-border p-2 ">
                    <div className="h-full w-full flex-col ">
                        <div className="flex flex-1 flex-col w-full gap-y-4">
                            <strong className="text-center">Restaurants</strong>
                            <div className="w-full h-fit flex flex-row gap-x-2 justify-center items-center">
                                <strong >Availability</strong>
                                <input
                                    type="text"
                                    placeholder="Enter status" 
                                    className="flex-1 border rounded-3xl focus:outline-none text-center box-border border-red-500 border-2"
                                    value={activeLeg.legData.restaurants.availability}
                                    onChange={(e) => handleLegInputChange(activeLeg.id, 'restaurants', e.target.value, 0)}
                                />
                            </div>
                            <div className="w-[80%] h-[0.2rem] bg-red-500 self-center"></div>
                            <div className="flex-1 flex w-full flex-col gap-x-2 justify-center items-center">
                                <strong >Recommendation</strong>
                                <textarea 
                                    className="bg-[#36454F] min-h-[8rem] w-full rounded-xl focus:outline-none text-center box-border p-2 resize-none"
                                    value={activeLeg.legData.restaurants.recommendation}
                                    onChange={(e) => handleLegInputChange(activeLeg.id, 'restaurants', e.target.value, 1)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex flex-1 flex-col w-full gap-y-4">
                            <strong className="text-center">Fuel and Services</strong>
                            <div className="w-full h-fit flex flex-row gap-x-2 justify-center items-center">
                                <strong >Availability</strong>
                                <input
                                    type="text"
                                    placeholder="Enter status" 
                                    className="flex-1 border rounded-3xl focus:outline-none text-center box-border border-red-500 border-2"
                                    value={activeLeg.legData.fuelAndServices.availability}
                                    onChange={(e) => handleLegInputChange(activeLeg.id, "fuelAndServices", e.target.value, 0)}
                                />
                            </div>
                            <div className="w-[80%] h-[0.2rem] bg-red-500 self-center"></div>
                            <div className="flex flex-1 w-full flex-col gap-x-2 justify-center items-center">
                                <strong >Recommendation</strong>
                                <textarea 
                                    className="bg-[#36454F] h-full w-full rounded-xl focus:outline-none text-center box-border p-2 resize-none"
                                    value={activeLeg.legData.fuelAndServices.recommendation}
                                    onChange={(e) => handleLegInputChange(activeLeg.id, "fuelAndServices", e.target.value, 1)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex flex-1 flex-col w-full gap-y-4">
                            <strong className="text-center">Stays</strong>
                            <div className="w-full h-fit flex flex-row gap-x-2 justify-center items-center">
                                <strong >Availability</strong>
                                <input
                                    type="text"
                                    placeholder="Enter status" 
                                    className="flex-1 border rounded-3xl focus:outline-none text-center box-border border-red-500 border-2"
                                    value={activeLeg.legData.stays.availability}
                                    onChange={(e) => handleLegInputChange(activeLeg.id, "stays", e.target.value, 0)}
                                />
                            </div>
                            <div className="w-[80%] h-[0.2rem] bg-red-500 self-center"></div>
                            <div className="flex flex-1 w-full flex-col gap-x-2 justify-center items-center">
                                <strong >Recommendation</strong>
                                <textarea 
                                    className="bg-[#36454F] h-full w-full rounded-xl focus:outline-none text-center box-border p-2 resize-none"
                                    value={activeLeg.legData.stays.recommendation}
                                    onChange={(e) => handleLegInputChange(activeLeg.id, "stays", e.target.value, 1)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex flex-1 flex-col w-full gap-y-4">
                            <strong className="text-center">Network</strong>
                            <div className="w-full h-fit flex flex-row gap-x-2 justify-center items-center">
                                <strong >Availability</strong>
                                <input
                                    type="text"
                                    placeholder="Enter status" 
                                    className="flex-1 border rounded-3xl focus:outline-none text-center box-border border-red-500 border-2"
                                    value={activeLeg.legData.network.availability}
                                    onChange={(e) => handleLegInputChange(activeLeg.id, "network", e.target.value, 0)}
                                />
                            </div>
                            <div className="w-[80%] h-[0.2rem] bg-red-500 self-center"></div>
                            <div className="flex flex-1 w-full flex-col gap-x-2 justify-center items-center">
                                <strong >Recommendation</strong>
                                <textarea 
                                    className="bg-[#36454F] h-full w-full rounded-xl focus:outline-none text-center box-border p-2 resize-none"
                                    value={activeLeg.legData.network.recommendation}
                                    onChange={(e) => handleLegInputChange(activeLeg.id, "network", e.target.value, 1)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default LegThirdLayer
