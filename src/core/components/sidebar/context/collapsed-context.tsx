'use client'
import { createContext, ReactNode, useContext } from "react";
import { Tooltip } from "react-tooltip";

interface CollapsedContextType {
    collapsedContextValue: boolean
}

const CollapsedContext = createContext<CollapsedContextType | undefined>(undefined)

interface CollapsedProviderProps {
    children: ReactNode;
    collapsedContextValue: boolean
}

export const CollapsedProvider = ({ children, collapsedContextValue }: CollapsedProviderProps) => (
    <CollapsedContext.Provider value={{collapsedContextValue}}>
        {children}
        {collapsedContextValue && <CollapsedTooltip />}
    </CollapsedContext.Provider>
)

const CollapsedTooltip = () => (
    <Tooltip
        id="my-tooltip"
        place="right"
        style={{
            position: "absolute",
            zIndex: 15,
        }}
    />
);

export const useCollapsedContext = () => {
    const context = useContext(CollapsedContext)
    if(context === undefined){ 
        throw new Error('useCollapsedContext must be used within a CollapsedProvider')
    }
    return context
}
