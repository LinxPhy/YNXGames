'use client'

import { useSearchParams } from 'next/navigation';
import { createContext, useEffect, useState } from 'react'

export const ExploreContextProvider = createContext({})

export function ExploreContext({ children, min, max }: { children: React.ReactNode, min: number, max: number }) {

    const searchParams = useSearchParams();
    const genre = searchParams.get('genre')?.split(',').map(Number) || [];
    const platform = searchParams.get('platform')?.split(',').map(Number) || [];
    const company = searchParams.get('company')?.split(',').map(Number) || [];
    const theme = searchParams.get('theme')?.split(',').map(Number) || [];
    const mode = searchParams.get('mode')?.split(',').map(Number) || [];
    const initial_year = searchParams.get('initial_year') || min;
    const final_year = searchParams.get('final_year') || max;
    const search_type = searchParams.get('search_type') || 'exact';
    const unknown_releases = searchParams.get('unknown_releases') == 'false' ? false : true;

    const [filters, setFilters] = useState({
        genre,
        platform,
        company,
        theme,
        mode,
        initial_year,
        final_year,
        search_type,
        unknown_releases
    });

    // useEffect(() => {
    //     console.log(filters)
    // }, [filters])

    return (
        <ExploreContextProvider.Provider value={{ filters, setFilters }} >
            {children}
        </ExploreContextProvider.Provider>
    )

}