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
    const [Companies, setCompanies] = useState(companies.slice(0, 5));
    const [Themes, setThemes] = useState(themes.slice(0, 5));


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
            <div className={styles.filters} >
                <h4>Filters</h4>
                <button className={styles.clear}>Clear</button>
            </div>
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
                <div className={styles.dropdownHeader} onClick={() => toggleSection('platform')}>
                    <h4>Platform</h4>
                    <span>{OpenSections.platform ? "▼" : "▶"}</span>
                </div>

                <div className={`${styles.dropdown} ${OpenSections.platform ? styles.open : styles.closed}`}>
                    <ul>
                        {platforms && platforms.map((platform: Platform) => (
                            <li key={platform.id}>
                                <input type="checkbox" id={platform.id.toString()} name={platform.name} value={platform.id} />
                                <label htmlFor={platform.id.toString()}>{platform.name}</label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div>
                <div className={styles.dropdownHeader} onClick={() => toggleSection('company')}>
                    <h4>Company</h4>
                    <span>{OpenSections.company ? "▼" : "▶"}</span>
                </div>

                <div className={`${styles.dropdown} ${OpenSections.company ? styles.open : styles.closed}`}>
                    <ul>
                        {Companies && Companies.map((company: Company) => (
                            <li key={company.id}>
                                <input type="checkbox" id={company.id.toString()} name={company.name} value={company.id} />
                                <label htmlFor={company.id.toString()}>{company.name}</label>
                            </li>
                        ))}
                    </ul>

                    <div style={{ display: OpenSections.company ? 'block' : 'none' }}>
                        {Companies.length != companies.length ?
                            <p onClick={() => setCompanies(companies)}>▼ Show More</p> :
                            <p onClick={() => setCompanies(companies.slice(0, 5))}>▲ Show Less</p>
                        }
                    </div>
                </div>
            </div>

            <div>
                <div className={styles.dropdownHeader} onClick={() => toggleSection('theme')}>
                    <h4>Theme</h4>
                    <span>{OpenSections.theme ? "▼" : "▶"}</span>
                </div>

                <div className={`${styles.dropdown} ${OpenSections.theme ? styles.open : styles.closed}`}>
                    <ul>
                        {Themes && Themes.map((theme: Theme) => (
                            <li key={theme.id}>
                                <input type="checkbox" id={theme.id.toString()} name={theme.name} value={theme.id} />
                                <label htmlFor={theme.id.toString()}>{theme.name}</label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div>
                <div className={styles.dropdownHeader} onClick={() => toggleSection('mode')}>
                    <h4>Mode</h4>
                    <span>{OpenSections.mode ? "▼" : "▶"}</span>
                </div>

                <div className={`${styles.dropdown} ${OpenSections.mode ? styles.open : styles.closed}`}>
                    <ul>                        
                        {modes && modes.map((mode: Mode) => (
                            <li key={mode.id}>
                                <input type="checkbox" id={mode.id.toString()} name={mode.name} value={mode.id} />
                                <label htmlFor={mode.id.toString()}>{mode.name}</label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div>
                <button className={styles.apply}>Apply</button>
            </div>
        </aside>
    )
}