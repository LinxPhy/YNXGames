'use client'
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import styles from './page.module.css'

const fetchGames = async ({ values, page, prevGames }: { values: any, page: number, prevGames: any }) => {

    const input = {
        search: values.search,
        platforms: values.platforms.length > 0 ? values.platforms.map((platform: any) => platform.name) : [],
        genres: values.genres.length > 0 ? values.genres.map((genre: any) => genre.name) : [],
        themes: values.themes.length > 0 ? values.themes.map((theme: any) => theme.name) : [],
        similar_games: values.similar_games.length > 0 ? values.similar_games.map((game: any) => game.name) : [],
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/deepsearch`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values: input, page, prevGames }),
    });

    return response.json();

}

function MatchingRatingColor(rating: number) {
    if (!rating) return `${styles['nothing']}`
    if (rating < 30 ) return `${styles['red']}`
    if (rating < 50 ) return `${styles['orange']}`
    if (rating < 70 ) return `${styles['yellow']}`
    if (rating < 90 ) return `${styles['light-green']}`
    return `${styles['green']}`
}

export default function DeepSearch({ data }: { data: any }) {

    const { genres, platforms, themes } = data
    const [page, setPage]: any = useState(1);
    const [visitedPages, setVisitedPages]: any = useState([1]);
    const [prevGames, setPrevGames]: any = useState("");
    const [similarGames, setSimilarGames]: any = useState("");

    const [values, setValues]: any = useState({
        search: '',
        platforms: [],
        genres: [],
        themes: [],
        similar_games: [],
    });

    const { data: games, isLoading, error } = useQuery({
        queryKey: ['deepsearch', page],
        queryFn: () => fetchGames({ values, page, prevGames }),
        enabled: !visitedPages.includes(page),
        refetchOnWindowFocus: false
    })

    useEffect(() => {
        if (games) {
            setPrevGames(games.prevGames)
            setVisitedPages([...visitedPages, page]);
        }
    }, [games]);

    const results = games?.data?.items || [];
    console.log(results)

    return (
        <div className={styles.deepsearch}>
            <div className={styles.header}>
                <Image src={"/icons/stars.png"} alt="Logo" width={32} height={32} className={styles.logo} />
                <h1>Deep Search</h1>
            </div>
            {/* <p>Deep search uses AI to find games that can match your criteria. The more specific you are, the better game recommendations you will get. </p> */}

            <div className={styles.inputs}>
                <div className={styles.search}>
                    <h3>What kind of game experience are you looking for?</h3>
                    <textarea
                        name="search"
                        id="search"
                        placeholder="I am looking for a game that has lots of adventure and action. The game must have magical beasts and be set in a fantasy world"
                        value={values.search}
                        onChange={(e) => setValues({ ...values, search: e.target.value })}
                        rows={3}
                        maxLength={1000}
                    >
                    </textarea>
                    <span>{values.search.length}/1000</span>
                </div>

                {/* <div className={styles.platforms}>
                    <h3>What platforms do you want to play on?</h3>
                    <div>
                        {platforms.map((platform: any) => (
                            <div key={platform.id} className={styles.platform} onClick={() => setValues({ ...values, platforms: values.platforms.includes(platform) ? values.platforms.filter((p: any) => p.id !== platform.id) : [...values.platforms, platform] })}>
                                <p>{platform.alternative_name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.genres}>
                    <h3>Please enter your genres you enjoy (optional)</h3>

                    <select name="genres" id="genres"
                        onChange={(e) => {
                            const genre = genres.find((genre: any) => genre.id === parseInt(e.target.value));
                            if (genre && !values.genres.includes(genre)) {
                                setValues({ ...values, genres: [...values.genres, genre] });
                            }
                        }}

                    >
                        <option value="">Select a genre...</option>
                        {genres.map((genre: any) => (
                            <option key={genre.id} value={genre.id}>{genre.name}</option>
                        ))}
                    </select>

                    <div className={styles.content}>
                        {values?.genres?.map((genre: any) => (
                            <div onClick={() => setValues({ ...values, genres: values.genres.filter((g: any) => g.id !== genre.id) })} key={genre.id} className={styles.genre}>
                                <p>{genre.name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h3>Please enter your themes you enjoy (optional)</h3>
                    <select name="themes" id="themes"
                        onChange={(e) => {
                            const theme = themes.find((theme: any) => theme.id === parseInt(e.target.value));
                            if (theme && !values.themes.includes(theme)) {
                                setValues({ ...values, themes: [...values.themes, theme] });
                            }
                        }}
                    >
                        <option value="">Select a theme...</option>
                        {themes.map((theme: any) => (
                            <option key={theme.id} value={theme.id}>{theme.name}</option>
                        ))}
                    </select>
                    <div className={styles.content}>
                        {values?.themes?.map((theme: any) => (
                            <div onClick={() => setValues({ ...values, themes: values.themes.filter((t: any) => t.id !== theme.id) })} key={theme.id} className={styles.theme}>
                                <p>{theme.name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h3>Please enter any similar games (optional)</h3>
                    <div className={styles.similarInput}>
                        <input type="text" name="similar" value={similarGames} placeholder="Red Dead Redemption 2" id="similar"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    if (!values.similar_games.includes(e.currentTarget.value)) {
                                        setValues({ ...values, similar_games: [...values.similar_games, e.currentTarget.value] });
                                        e.currentTarget.value = '';
                                    }
                                }
                            }}
                            onChange={(e) => setSimilarGames(e.target.value)}
                        />
                        <button onClick={() => {
                            if (!values.similar_games.includes(similarGames) && similarGames !== '') {
                                setValues({ ...values, similar_games: [...values.similar_games, similarGames] });
                                setSimilarGames('');
                            }
                        }}  type="button">
                            +
                        </button>
                    </div>
                    <div className={styles.content}>
                        {values?.similar_games?.map((game: any, index: number) => (
                            <div onClick={() => setValues({ ...values, similar_games: values.similar_games.filter((g: any) => g !== game) })} key={index} className={styles.similar}>
                                <p>{game}</p>
                            </div>
                        ))}
                    </div>
                </div>  */}

                <div className={styles.submitContainer}>
                    <button className={styles.submit} onClick={() => setPage((page: number) => page + 1)} disabled={isLoading}>
                        Start Deep Search
                    </button>
                </div>
            </div>


            <div className={styles.topMatches}>
                <div className={styles.header}>
                    <Image src={"/icons/stars.png"} alt="Logo" width={32} height={32} className={styles.logo} />
                    <h2>Top Matches</h2>
                </div>

                <div className={styles.matches}>

                    {isLoading && <p>Loading...</p>}
                    {error && <p> No matches found</p>}

                    {results && results.map((game: any, index: number) => (
                        <div key={index} className={styles.game}>

                            <div className={styles.main}>
                                <h3>{game.name}</h3>

                                <div className={styles.themes}>
                                    {game.themes && game.themes.map((theme: any, index: number) => (
                                        <p key={index} className={styles.theme}>{theme}</p>
                                    ))}
                                    {game.genres && game.genres.map((genre: any, index: number) => (
                                        <p key={index} className={styles.genre}>{genre}</p>
                                    ))}
                                </div>

                                <p className={styles.description}>{game.description}</p>
                                
                                <div className={styles.game_platforms}>
                                    {game.platforms && game.platforms.map((platform: any, index: number) => (
                                        <p key={index} className={styles.game_platform}>{platform}</p>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.stats}>
                                <ul>
                                    <li>
                                        <h4>Match</h4>
                                        <p className={`${MatchingRatingColor(game.ai_match)} ${styles.match}`}>{game.ai_match}</p>
                                    </li>

                                    <li>
                                        <h4>Release Date</h4>
                                        <p>{game.release_date}</p>
                                    </li>
                                    <li>
                                        <h4>Developer</h4>
                                        <p>{game.developer}</p>
                                    </li>
                                    <li>
                                        <h4>Averate Playtime</h4>
                                        <p>{game.average_play_time}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </div>

    )

}