
interface Filters {
    genre: string,
    platform: string,
    company: string,
    initial_year: string,
    final_year: string,
    theme: string,
    mode: string,
    search_type: string,
    unknown_releases: string
}

export default async function getGames (filters: Filters, page: number) {

    const { genre, platform, company, theme, mode, initial_year, final_year, search_type, unknown_releases } = filters

    const request = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/explore?` +
        new URLSearchParams({
            page: page.toString(),
            genre: genre,
            platform: platform,
            company: company,
            theme: theme,
            mode: mode,
            initial_year: initial_year,
            final_year: final_year,
            search_type: search_type,
            unknown_releases: unknown_releases
        }));

    // add delay
    // await new Promise((resolve) => setTimeout(resolve, 100000));
        
    return request.json();
}

