'use client'
import { useContext, useState } from 'react';
import styles from './sidebar.module.css'
import TwoRange from './range';
import { ExploreContextProvider } from '@/app/explore/exploreContext';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Sidebar(
    { genres, platforms, companies, themes, modes, initial_year, final_year }: {
        genres: Genre[],
        platforms: Platform[],
        companies: Company[],
        themes: Theme[],
        modes: Mode[],
        initial_year: number,
        final_year: number
    }
) {

    const { filters, setFilters }: any = useContext(ExploreContextProvider);

    const [Genres, setGenres] = useState(genres.slice(0, 5));
    const [Companies, setCompanies] = useState(companies.slice(0, 5));
    const [Themes, setThemes] = useState(themes.slice(0, 5));

    const [OpenSections, setOpenSections] = useState({
        genre: true,
        year: true,
        platform: true,
        company: true,
        theme: true,
        mode: true
    });

    const router = useRouter()
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const toggleSection = (section: keyof typeof OpenSections) => {
        setOpenSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    function HandleApply() {

        const params = new URLSearchParams();

        if (filters.genre.length) {
            params.set('genre', filters.genre.join(','));
        }

        if (filters.platform.length) {
            params.set('platform', filters.platform.join(','));
        }

        if (filters.company.length) {
            params.set('company', filters.company.join(','));
        }

        if (filters.theme.length) {
            params.set('theme', filters.theme.join(','));
        }

        if (filters.mode.length) {
            params.set('mode', filters.mode.join(','));
        }

        if (filters.initial_year) {
            params.set('initial_year', filters.initial_year);
        }

        if (filters.final_year) {
            params.set('final_year', filters.final_year);
        }

        if (filters.search_type) {
            params.set('search_type', filters.search_type);
        }

        // if (filters.unknown_releases) {
        // }
        params.set('unknown_releases', filters.unknown_releases);

        router.push(`${pathname}?${params.toString()}`);

    }

    function HandleSearchType(type: string) {

        const params = new URLSearchParams(searchParams.toString());
        // update params not replace

        params.set('search_type', type);
        router.replace(`${pathname}?${params.toString()}`);

    }

    function ClearFilters() {

        setFilters({ 
                genre: [], 
                platform: [], 
                company: [], 
                theme: [], 
                mode: [], 
                initial_year: initial_year, 
                final_year: final_year, 
                search_type: 'exact', 
                unknown_releases: true 
            });
    }

    return (
        <aside className={styles.sidebar}>
            <div className={styles.filters} >
                <h4>Filters</h4>
                <button className={styles.clear} onClick={ClearFilters}>Clear</button>
                {filters.search_type == 'exact' ? (
                    <>
                        <button className={styles.clear} onClick={() => {  setFilters({ ...filters, search_type: 'similar' }) }}>Exact Matches</button>
                        <span style={{ textAlign: 'center' }}>Match all selected filters</span>
                    </>
                ) :
                    <>
                        <button className={styles.clear} onClick={() => {  setFilters({ ...filters, search_type: 'exact' }) }}>Similar Matches</button>
                        <span style={{ textAlign: 'center' }}>Match any selected filters</span>
                    </>
                }
            </div>
            <div>
                <div className={styles.dropdownHeader} onClick={() => toggleSection('genre')}>
                    <h4>Genre</h4>
                    <span>{OpenSections.genre ? "▼" : "▶"}</span>
                </div>

                <div className={`${styles.dropdown} ${OpenSections.genre ? styles.open : styles.closed}`}>
                    <ul>
                        {Genres && Genres.map((genre: Genre) => (
                            // <li key={genre.id} onClick={() => setFilters({ ...filters, genre: filters.genre.includes(genre.id) ? filters.genre.filter((id: number) => id !== genre.id) : [...filters.genre, genre.id] })} >
                            //     <input type="checkbox" id={genre.id.toString()} defaultChecked={filters.genre.includes(genre.id)} name={genre.name} value={genre.id} />
                            //     <label htmlFor={genre.id.toString()}>{genre.name}</label>
                            // </li>
                            <li key={genre.id}>
                                <input
                                    type="checkbox" id={genre.id.toString()} checked={filters.genre.includes(genre.id)}
                                    onChange={() =>
                                        setFilters({
                                            ...filters,
                                            genre: filters.genre.includes(genre.id)
                                                ? filters.genre.filter((id: number) => id !== genre.id)
                                                : [...filters.genre, genre.id],
                                        })
                                    }
                                />

                                <label htmlFor={genre.id.toString()}>
                                    {genre.name}
                                </label>
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
                            // <li key={platform.id} onClick={() => setFilters({ ...filters, platform: filters.platform.includes(platform.id) ? filters.platform.filter((id: number) => id !== platform.id) : [...filters.platform, platform.id] })}>
                            //     <input type="checkbox" id={platform.id.toString()} defaultChecked={filters.platform.includes(platform.id)} name={platform.name} value={platform.id} />
                            //     <label htmlFor={platform.id.toString()}>{platform.name}</label>
                            // </li>
                            <li key={platform.id}>
                                <input
                                    type="checkbox"
                                    id={`platform_${platform.id.toString()}`}
                                    checked={filters.platform.includes(platform.id)}
                                    onChange={() =>
                                        setFilters({
                                            ...filters,
                                            platform: filters.platform.includes(platform.id)
                                                ? filters.platform.filter((id: number) => id !== platform.id)
                                                : [...filters.platform, platform.id],
                                        })
                                    }
                                />
                                <label htmlFor={`platform_${platform.id.toString()}`}>
                                    {platform.name}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div>
                <div className={styles.dropdownHeader} onClick={() => toggleSection('company')}>
                    <h4>Famous Companies</h4>
                    <span>{OpenSections.company ? "▼" : "▶"}</span>
                </div>

                <div className={`${styles.dropdown} ${OpenSections.company ? styles.open : styles.closed}`}>
                    <ul>
                        {Companies && Companies.map((company: Company) => (
                            // <li key={company.id} onClick={() => setFilters({ ...filters, company: filters.company.includes(company.id) ? filters.company.filter((id: number) => id !== company.id) : [...filters.company, company.id] })}>
                            //     <input type="checkbox" id={company.id.toString()} defaultChecked={filters.company.includes(company.id)} name={company.name} value={company.id} />
                            //     <label htmlFor={company.id.toString()}>{company.name}</label>
                            // </li>
                            <li key={company.id}>
                                <input
                                    type="checkbox"
                                    id={`company_${company.id.toString()}`}
                                    checked={filters.company.includes(company.id)}
                                    onChange={() =>
                                        setFilters({
                                            ...filters,
                                            company: filters.company.includes(company.id)
                                                ? filters.company.filter((id: number) => id !== company.id)
                                                : [...filters.company, company.id],
                                        })
                                    }
                                />
                                <label htmlFor={`company_${company.id.toString()}`}>
                                    {company.name}
                                </label>
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
                <div className={styles.dropdownHeader} onClick={() => toggleSection('year')}>
                    <h4>Release Year</h4>
                    <span>{OpenSections.year ? "▼" : "▶"}</span>
                </div>

                <div className={`${styles.dropdown} ${OpenSections.year ? styles.open : styles.closed}`}>
                    <TwoRange initial_year={initial_year} final_year={final_year} />
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
                            // <li key={theme.id} onClick={() => setFilters({ ...filters, theme: filters.theme.includes(theme.id) ? filters.theme.filter((id: number) => id !== theme.id) : [...filters.theme, theme.id] })}>
                            //     <input type="checkbox" id={theme.id.toString()} defaultChecked={filters.theme.includes(theme.id)} name={theme.name} value={theme.id} />
                            //     <label htmlFor={theme.id.toString()}>{theme.name}</label>
                            // </li>
                            <li key={theme.id}>
                                <input
                                    type="checkbox"
                                    id={`theme_${theme.id.toString()}`}
                                    checked={filters.theme.includes(theme.id)}
                                    onChange={() =>
                                        setFilters({
                                            ...filters,
                                            theme: filters.theme.includes(theme.id)
                                                ? filters.theme.filter((id: number) => id !== theme.id)
                                                : [...filters.theme, theme.id],
                                        })
                                    }
                                />
                                <label htmlFor={`theme_${theme.id.toString()}`}>
                                    {theme.name}
                                </label>
                            </li>
                        ))}
                    </ul>

                    <div style={{ display: OpenSections.theme ? 'block' : 'none' }}>
                        {Themes.length != themes.length ?
                            <p onClick={() => setThemes(themes)}>▼ Show More</p> :
                            <p onClick={() => setThemes(themes.slice(0, 5))}>▲ Show Less</p>
                        }
                    </div>
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
                            // <li key={mode.id} onClick={() => setFilters({ ...filters, mode: filters.mode.includes(mode.id) ? filters.mode.filter((id: number) => id !== mode.id) : [...filters.mode, mode.id] })}>
                            //     <input type="checkbox" id={mode.id.toString()} defaultChecked={filters.mode.includes(mode.id)} name={mode.name} value={mode.id} />
                            //     <label htmlFor={mode.id.toString()}>{mode.name}</label>
                            // </li>
                            <li key={mode.id}>
                                <input
                                    type="checkbox"
                                    id={`mode_${mode.id.toString()}`}
                                    checked={filters.mode.includes(mode.id)}
                                    onChange={() =>
                                        setFilters({
                                            ...filters,
                                            mode: filters.mode.includes(mode.id)
                                                ? filters.mode.filter((id: number) => id !== mode.id)
                                                : [...filters.mode, mode.id],
                                        })
                                    }
                                />
                                <label htmlFor={`mode_${mode.id.toString()}`}>
                                    {mode.name}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div>
                <button onClick={HandleApply} className={styles.apply}>Apply</button>
            </div>
        </aside>
    )
}