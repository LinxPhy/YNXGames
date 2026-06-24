'use client'

import { createContext } from "react"

export const GamesContextProvider = createContext({})

export function GamesContext({ children, options }: { children: React.ReactNode, options: any }) {

    const { genres, themes } = options

    return (
        <GamesContextProvider.Provider value={{ genres, themes }}>
            {children}
        </GamesContextProvider.Provider>
    )

}