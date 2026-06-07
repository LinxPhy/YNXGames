
interface Filters {
    genre: string,
    platform: string,
    company: string,
    initial_year: string,
    final_year: string,
    theme: string,
    mode: string
}

export default async function getGames (filters: Filters, page: number) {

    const { genre, platform, company, initial_year, final_year, theme, mode } = filters

    const response = await fetch(`${process.env.SERVER_URL}/explore?` +
        new URLSearchParams({
            page: page.toString(),
            genre: genre,
            platform: platform,
            company: company,
            initial_year: initial_year,
            final_year: final_year,
            theme: theme,
            mode: mode,
        }));
        
    return response.json();
}

