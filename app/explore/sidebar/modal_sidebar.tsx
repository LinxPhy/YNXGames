'use client'
import { useContext, useState } from 'react';
import { ExploreContextProvider } from '@/app/explore/exploreContext';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import styles from './mobile_sidebar.module.css'
import TwoRange from './range';

export default function ModalSidebar({ setModal, genres, platforms, companies, themes, modes, initial_year, final_year }: {
    setModal: any,
    genres: Genre[],
    platforms: Platform[],
    companies: Company[],
    themes: Theme[],
    modes: Mode[],
    initial_year: number,
    final_year: number
}) {

    const { filters, setFilters }: any = useContext(ExploreContextProvider);

    const [Genres, setGenres] = useState(genres.slice(0, 5));
    const [Companies, setCompanies] = useState(companies.slice(0, 5));
    const [Themes, setThemes] = useState(themes.slice(0, 5));

    const [OpenSections, setOpenSections] = useState({
        genre: true,
        year: false,
        platform: false,
        company: false,
        theme: false,
        mode: false
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

        params.set('unknown_releases', filters.unknown_releases);

        router.push(`${pathname}?${params.toString()}`);

        setModal(false);
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
        <div className={styles.modal}>
            <div>
                <div className={styles.dropdownHeader} onClick={() => toggleSection('genre')}>
                    <div>
                        <Image src="/icons/genres.png" width={20} height={20} alt="genre" />
                        <h4>Genre</h4>
                    </div>
                    <p>{OpenSections.genre ? "▼" : "▶"}</p>
                </div>

                <div className={`${styles.dropdown} ${OpenSections.genre ? styles.open : styles.closed}`}>
                    <ul style={{ display: OpenSections.genre ? 'flex' : 'none' }}>
                        {Genres && Genres.map((genre: Genre) => (
                            <button
                                key={genre.id}
                                className={filters.genre.includes(genre.id) ? styles.selected : ''}
                                onClick={() =>
                                    setFilters({
                                        ...filters,
                                        genre: filters.genre.includes(genre.id)
                                            ? filters.genre.filter((id: number) => id !== genre.id)
                                            : [...filters.genre, genre.id],
                                    })
                                }
                            >
                                {genre.name}
                            </button>
                        ))}
                    </ul>

                    <div style={{ display: OpenSections.genre ? 'block' : 'none' }} className={styles.showMore}>
                        {Genres.length != genres.length ?
                            <span onClick={() => setGenres(genres)}>▼ Show More</span> :
                            <span onClick={() => setGenres(genres.slice(0, 5))}>▲ Show Less</span>
                        }
                    </div>
                </div>

            </div>
            <div>
                <div className={styles.dropdownHeader} onClick={() => toggleSection('platform')}>
                    <div>
                        <Image src="/icons/platforms.png" width={20} height={20} alt="platform" />
                        <h4>Platform</h4>
                    </div>
                    <p>{OpenSections.platform ? "▼" : "▶"}</p>
                </div>

                <div className={`${styles.dropdown} ${OpenSections.platform ? styles.open : styles.closed}`}>
                    <ul style={{ display: OpenSections.platform ? 'flex' : 'none' }}>
                        {platforms && platforms.map((platform: Platform) => (
                            <button
                                key={platform.id}
                                className={filters.platform.includes(platform.id) ? styles.selected : ''}
                                onClick={() =>
                                    setFilters({
                                        ...filters,
                                        platform: filters.platform.includes(platform.id)
                                            ? filters.platform.filter((id: number) => id !== platform.id)
                                            : [...filters.platform, platform.id],
                                    })
                                }
                            >
                                {platform.name}
                            </button>
                        ))}
                    </ul>
                </div>
            </div>
            <div>
                <div className={styles.dropdownHeader} onClick={() => toggleSection('company')}>
                    <div>
                        <Image src="/icons/developer.png" width={20} height={20} alt="mode" />
                        <h4>Famous Companies</h4>
                    </div>
                    <p>{OpenSections.company ? "▼" : "▶"}</p>
                </div>

                <div className={`${styles.dropdown} ${OpenSections.company ? styles.open : styles.closed}`}>
                    <ul style={{ display: OpenSections.company ? 'flex' : 'none' }}>
                        {Companies && Companies.map((company: Company) => (
                            <button
                                key={company.id}
                                className={filters.company.includes(company.id) ? styles.selected : ''}
                                onClick={() =>
                                    setFilters({
                                        ...filters,
                                        company: filters.company.includes(company.id)
                                            ? filters.company.filter((id: number) => id !== company.id)
                                            : [...filters.company, company.id],
                                    })
                                }
                            >
                                {company.name}
                            </button>
                        ))}
                    </ul>

                    <div style={{ display: OpenSections.company ? 'block' : 'none' }} className={styles.showMore}>
                        {Companies.length != companies.length ?
                            <span onClick={() => setCompanies(companies)}>▼ Show More</span> :
                            <span onClick={() => setCompanies(companies.slice(0, 5))}>▲ Show Less</span>
                        }
                    </div>
                </div>
            </div>
            <div>
                <div className={styles.dropdownHeader} onClick={() => toggleSection('year')}>
                    <div>
                        <Image src="/icons/release_date.png" width={20} height={20} alt="release date" />
                        <h4>Release Year</h4>
                    </div>
                    <p>{OpenSections.year ? "▼" : "▶"}</p>
                </div>

                <div className={`${styles.dropdown} ${OpenSections.year ? styles.open : styles.closed}`} >
                    <div style={{ display: OpenSections.year ? 'block' : 'none' }}>
                        <TwoRange initial_year={initial_year} final_year={final_year} />
                    </div>
                </div>
            </div>
            <div>
                <div className={styles.dropdownHeader} onClick={() => toggleSection('theme')}>
                    <div>
                        <Image src="/icons/themes.png" width={20} height={20} alt="theme" />
                        <h4>Theme</h4>
                    </div>
                    <p>{OpenSections.theme ? "▼" : "▶"}</p>
                </div>

                <div className={`${styles.dropdown} ${OpenSections.theme ? styles.open : styles.closed}`}>
                    <ul style={{ display: OpenSections.theme ? 'flex' : 'none' }}>
                        {Themes && Themes.map((theme: Theme) => (
                            <button
                                key={theme.id}
                                className={filters.theme.includes(theme.id) ? styles.selected : ''}
                                onClick={() =>
                                    setFilters({
                                        ...filters,
                                        theme: filters.theme.includes(theme.id)
                                            ? filters.theme.filter((id: number) => id !== theme.id)
                                            : [...filters.theme, theme.id],
                                    })
                                }
                            >
                                {theme.name}
                            </button>
                        ))}
                    </ul>

                    <div style={{ display: OpenSections.theme ? 'block' : 'none' }} className={styles.showMore}>
                        {Themes.length != themes.length ?
                            <span onClick={() => setThemes(themes)}>▼ Show More</span> :
                            <span onClick={() => setThemes(themes.slice(0, 5))}>▲ Show Less</span>
                        }
                    </div>
                </div>
            </div>
            <div>
                <div className={styles.dropdownHeader} onClick={() => toggleSection('mode')}>
                    <div>
                        <Image src="/icons/modes.png" width={20} height={20} alt="mode" />
                        <h4>Mode</h4>
                    </div>
                    <p>{OpenSections.mode ? "▼" : "▶"}</p>
                </div>

                <div className={`${styles.dropdown} ${OpenSections.mode ? styles.open : styles.closed}`}>
                    <ul style={{ display: OpenSections.mode ? 'flex' : 'none' }}>
                        {modes && modes.map((mode: Mode) => (
                            <button
                                key={mode.id}
                                className={filters.mode.includes(mode.id) ? styles.selected : ''}
                                onClick={() =>
                                    setFilters({
                                        ...filters,
                                        mode: filters.mode.includes(mode.id)
                                            ? filters.mode.filter((id: number) => id !== mode.id)
                                            : [...filters.mode, mode.id],
                                    })
                                }
                            >
                                {mode.name}
                            </button>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={styles.buttons}>
                <div>
                    <button className={styles.reset} onClick={ClearFilters}>Reset Filters</button>
                    {filters.search_type == 'exact' ? (
                        <>
                            <button className={styles.reset} onClick={() => { setFilters({ ...filters, search_type: 'similar' }) }}>Exact Matches</button>
                        </>
                    ) :
                        <>
                            <button className={styles.reset} onClick={() => { setFilters({ ...filters, search_type: 'exact' }) }}>Similar Matches</button>
                        </>
                    }
                </div>
                <button onClick={HandleApply} className={styles.apply}>Apply Filters</button>
            </div>
        </div>
    )

}