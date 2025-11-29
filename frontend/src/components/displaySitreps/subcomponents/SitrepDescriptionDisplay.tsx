
import type { Sitrep_Interface } from "../../../configs/types_and_interfaces"

type DisplaySitreps_Props = {
    selectedSitrep: Sitrep_Interface | undefined
}

const SitrepDescriptionDisplay = ({selectedSitrep}: DisplaySitreps_Props) => {

    return (
        <div className="w-full h-full box-border p-2 z-1 flex flex-col items-center gap-y-3">
            <p 
                className='w-full h-full text-center text-[1.1rem] resize-none focus:outline-none rounded-3xl box-border p-3'
            >
                {selectedSitrep?.description ?? ''}
            </p>

        </div>
    )
}

export default SitrepDescriptionDisplay
