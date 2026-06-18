'use client'
import { useEffect, useState } from 'react';
import styles from './page.module.css'
import { useQuery } from '@tanstack/react-query';

const fetchGames = async ({ values, page } : { values: any, page: number }) => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/deepsearch`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values, page }),
    });

    return response.json();

}

export default function DeepSearch({ data }: { data: any }) {

    const { genres, platforms, themes } = data
    const [page, setPage]: any = useState(1);
    const [similarGames, setSimilarGames]: any = useState("");

    const [values, setValues]: any = useState({
        search: '',
        platforms: [6],
        genres: [],
        themes: [],
        similar_games: [],
    });

    const { data: games, isLoading, isError } = useQuery({
        queryKey: ['deepsearch', page],
        queryFn: () => fetchGames({ values, page}),
        enabled: page > 1,
        refetchOnWindowFocus: false
    })

    console.log(games)

    return (
        <div className={styles.deepsearch}>
            <h1>Deep Search</h1>
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
                        rows={10}
                        maxLength={1000}
                    >
                    </textarea>
                    <span>{values.search.length}/1000</span>
                </div>

                <div className={styles.platforms}>
                    <h3>What platforms do you want to play on?</h3>
                    <div>
                        {platforms.map((platform: any) => (
                            <div key={platform.id} className={styles.platform}>
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
                                    // add if game is not in similar games
                                    if (!values.similar_games.includes(e.currentTarget.value)) {
                                        setValues({ ...values, similar_games: [...values.similar_games, e.currentTarget.value] });
                                        e.currentTarget.value = '';
                                    }
                                }
                            }}
                            onChange={(e) => setSimilarGames(e.target.value)}
                        />
                        <button onClick={() => {
                            // add if game is not in similar games
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
                </div>

                <button className={styles.submit} onClick={() => setPage((page: number) => page + 1)}>
                    Start Deep Search
                </button>
            </div>
        </div>

    )

}