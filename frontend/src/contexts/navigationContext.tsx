import { createContext, useContext, useState, type Dispatch, type FC, type ReactNode, type SetStateAction } from "react";

interface NavigationContext_Interface {
    // Sidebar Category
    sideBarCategory: string,
    setSideBarCategory: Dispatch<SetStateAction<string>> 
    // Sidebar Category
}

const NavigationContext = createContext<NavigationContext_Interface | undefined>(undefined)

interface NavigationProviderProps { 
    children: ReactNode
}

export const NavigationContextProvider: FC<NavigationProviderProps> = ({children}) => {

    // Sidebar Category
    const [sideBarCategory, setSideBarCategory] = useState<string>('home')
    // Sidebar Category

    return (
        <NavigationContext value={{
            sideBarCategory, setSideBarCategory
        }
    }>
        {children}
    </NavigationContext>
    )
}

export const useNavigationContext = (): NavigationContext_Interface => {
    const context = useContext(NavigationContext)
    if(!context){
        throw new Error("useNavigationContext must be used within a NavigationContextProvider")
    }
    return context
}