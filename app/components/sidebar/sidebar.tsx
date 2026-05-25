'use client'
import { useState } from 'react';
import styles from './sidebar.module.css'

export default function Sidebar(
    { genres, platforms, companies, themes, modes }: {
        genres: Genre[],
        platforms: Platform[],
        companies: Company[],
        themes: Theme[],
        modes: Mode[]
    }
) {

    const [Genres, setGenres] = useState(genres.slice(0, 5));
    const [OpenSections, setOpenSections] = useState({
        genre: true,
        platform: true,
        company: true,
        theme: true,
        mode: true
    });

    const toggleSection = (section: keyof typeof OpenSections) => {
        setOpenSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    return (
        <aside className={styles.sidebar}>
            {/* <div>
                <h4>Filters</h4>
                <button>Clear All</button>
            </div> */}
            <div>
                <div className={styles.dropdownHeader} onClick={() => toggleSection('genre')}>
                    <h4>Genre</h4>
                    <span>{OpenSections.genre ? "▼" : "▶"}</span>
                </div>

                <div className={`${styles.dropdown} ${OpenSections.genre ? styles.open : styles.closed}`}>
                    <ul>
                        {Genres && Genres.map((genre: Genre) => (
                            <li key={genre.id}>
                                <input type="checkbox" id={genre.id.toString()} name={genre.name} value={genre.id} />
                                <label htmlFor={genre.id.toString()}>{genre.name}</label>
                            </li>
                        ))}
                    </ul>

                    <div style={{ display: OpenSections.genre ? 'block' : 'none' }}>
                        {Genres.length != genres.length ?
                            <p onClick={() => setGenres(genres)}>▼ Show More</p> :
                            <p onClick={() => setGenres(genres.slice(0, 5))}>▲ Show Less</p>
                        }
                    </div>
                </div>

            </div>
            <div>
                <h4>Platform</h4>
                <ul>
                    {platforms && platforms.map((platform: Platform) => (
                        <li key={platform.id}>
                            <input type="checkbox" id={platform.id.toString()} name={platform.name} value={platform.id} />
                            <label htmlFor={platform.id.toString()}>{platform.name}</label>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h4>Company</h4>
                <ul>
                    {companies && companies.map((company: Company) => (
                        <li key={company.id}>
                            <input type="checkbox" id={company.id.toString()} name={company.name} value={company.id} />
                            <label htmlFor={company.id.toString()}>{company.name}</label>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h4>Theme</h4>
                <ul>
                    {themes && themes.map((theme: Theme) => (
                        <li key={theme.id}>
                            <input type="checkbox" id={theme.id.toString()} name={theme.name} value={theme.id} />
                            <label htmlFor={theme.id.toString()}>{theme.name}</label>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h4>Mode</h4>
                <ul>
                    {modes && modes.map((mode: Mode) => (
                        <li key={mode.id}>
                            <input type="checkbox" id={mode.id.toString()} name={mode.name} value={mode.id} />
                            <label htmlFor={mode.id.toString()}>{mode.name}</label>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    )
}