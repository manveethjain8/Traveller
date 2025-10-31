import { createContext, useContext, useState, type Dispatch, type FC, type ReactNode, type SetStateAction } from "react";
import type { AddSitrep_Type } from "../configs/types_and_interfaces";
import { sitrep_template } from "../configs/templates";

interface SitrepContext_Interface {
    sitrep: AddSitrep_Type
    setSitrep: Dispatch<SetStateAction<AddSitrep_Type>>
}

const SitrepContext = createContext<SitrepContext_Interface | undefined>(undefined)

interface SitRepProviderProps {
    children: ReactNode
}

export const SitrepContextProvider: FC<SitRepProviderProps> = ({children}) => {

    const [sitrep, setSitrep] = useState<AddSitrep_Type>(structuredClone(sitrep_template))

    return(
        <SitrepContext.Provider value={
            {
                sitrep, setSitrep
            }
        }>
            {children}
        </SitrepContext.Provider>
    )
}

export const useSitrepContext = () => {
    const context = useContext(SitrepContext)
    if (!context) {
        throw new Error("SitrepContext must be used within a SitrepContextProvider")
    }
    return context
}