

export default async function getGames (
    page: number,
    genre: string,
    platform: string,
    company: string,
    initial_year: string,
    final_year: string,
    theme: string,
    mode: string
) {
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
