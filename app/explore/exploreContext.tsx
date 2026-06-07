'use client'

import { useSearchParams } from 'next/navigation';
import { createContext, useEffect, useState } from 'react'

export const ExploreContextProvider = createContext({})

export function ExploreContext({ children }: { children: React.ReactNode }) {

    const searchParams = useSearchParams();
    const genres = searchParams.get('genres')?.split(',') || [];
    const platforms = searchParams.get('platforms')?.split(',') || [];
    const companies = searchParams.get('companies')?.split(',') || [];
    const themes = searchParams.get('themes')?.split(',') || [];
    const modes = searchParams.get('modes')?.split(',') || [];
    const initial_year = searchParams.get('initial_year') || 0;
    const final_year = searchParams.get('final_year') || 0;
    const search_type = searchParams.get('search_type') || 'strict';
    const unknown_releases = searchParams.get('unknown_releases') || true;

    const [filters, setFilters] = useState({
        genres,
        platforms,
        companies,
        themes,
        modes,
        initial_year,
        final_year,
        search_type,
        unknown_releases
    })

    useEffect(() => {
        console.log(filters)
    }, [filters])

    return (
        <ExploreContextProvider.Provider value={{ filters, setFilters }} >
            {children}
        </ExploreContextProvider.Provider>
    )

}