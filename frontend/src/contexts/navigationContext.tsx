import { createContext, useContext, useEffect, useState, type Dispatch, type FC, type ReactNode, type SetStateAction } from "react";

interface NavigationContext_Interface {
    // Sidebar Category
    sideBarCategory: string,
    setSideBarCategory: Dispatch<SetStateAction<string>> 
    setNavigationCategorytoLocalStorage: (category: string) => void
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

    const setNavigationCategorytoLocalStorage = (category: string): void => {
        localStorage.setItem('sidebarCategory', category)
    }

    useEffect(() => {
        const value: string  = localStorage.getItem('sidebarCategory') ||  'home'
        if(value){
            setSideBarCategory(value)
        }
    }, [])

    return (
        <NavigationContext value={{
            sideBarCategory, setSideBarCategory,
            setNavigationCategorytoLocalStorage
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