'use client'
import { useEffect, useState } from 'react';
import styles from './page.module.css'

export default function DeepSearch({ data }: { data: any }) {

    const { genres, platforms, themes } = data

    const [values, setValues] : any = useState({
        search: '',
        platforms: [6],
        genres: [],
        themes: [],
        similar_games: '',
    });

    useEffect(() => {
        console.log(values)
    }, [values])

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
                    >
                    </textarea>
                    <span>{values.search.length}/300</span>
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
                    {/* append to genres */}
                    <select name="genres" id="genres" onChange={(e) => setValues({ ...values, genres: [...values.genres, e.target.value] })}>
                        {genres.map((genre: any) => (
                            <option key={genre.id} value={genre.id}>{genre.name}</option>
                        ))}
                    </select>
                    
                    <div className={styles.content}>
                        {values?.genres?.map((genre: any) => (
                            <div key={genre.id} className={styles.genre}>
                                <p>{genre.name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h3>Please enter your themes you enjoy (optional)</h3>
                    <select name="themes" id="themes">
                        {themes.map((theme: any) => (
                            <option key={theme.id} value={theme.id}>{theme.name}</option>
                        ))}
                    </select>
                    <div className={styles.content}>
                        {values.themes.map((theme: any) => (
                            <div key={theme.id} className={styles.theme}>
                                <p>{theme.name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h3>Please enter any similar games (optional)</h3>
                    <input type="text" name="similar" placeholder="Red Dead Redemption 2, Elden Ring" id="similar" />
                    <div className={styles.content}></div>
                </div>

                <button className={styles.submit}>
                    Start Deep Search
                </button>
            </div>



        </div>
    )

}