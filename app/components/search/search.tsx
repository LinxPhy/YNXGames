'use client'
import { useQuery } from "@tanstack/react-query"
import styles from '../header/header.module.css';
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const fetchGames = async (query: string) => {
    const page = 1
    const limit = 6
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/search/${query}?` + 
        new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
        })
    );
    return response.json();
}

export default function Search() {

    const wrapperRef = useRef<HTMLDivElement>(null);

    const [inputValue, setInputValue] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [showResults, setShowResults] = useState(false);

    const router = useRouter()

    const { data, isLoading, error } = useQuery({
        queryKey: ['search', debouncedQuery, 1],
        queryFn: () => fetchGames(debouncedQuery),
        enabled: debouncedQuery.length > 0,
        refetchOnWindowFocus: false
    })

    useEffect(() => {
        const delay = setTimeout(() => {
            setDebouncedQuery(inputValue.trim());
        }, 300); // debounce delay

        return () => clearTimeout(delay);
    }, [inputValue]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => { document.removeEventListener("mousedown", handleClickOutside); };
    }, []);

    const { data: games, hasMore } = data || {};

    return (
        <div className={styles.searchContainer}>
            <div className={styles.searchWrapper} ref={wrapperRef}>
                <input
                    type="search"
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                        setShowResults(true);
                    }}
                    onFocus={() => setShowResults(true)}
                    placeholder="Search for games in our database"
                    className={styles.search}
                />
                <button 
                    className={styles.searchButton}
                    onClick={() => router.push(`/search/${debouncedQuery}`)}
                >
                    Search
                </button>

                {isLoading && (
                    <div className={styles.searchResults}>
                        <div className={styles.loading}>
                            <p>Loading results...</p>
                        </div>
                    </div>
                )}

                {error && (
                    <div className={styles.searchResults}>
                        <p>Error fetching results.</p>
                    </div>
                )}

                {showResults && games && games.length > 0 && (
                    <div className={styles.searchResults}>
                        {games.map((game: any) => (
                            <Link href={`/game/${game.slug}`} key={game.id} onClick={() => setShowResults(false)}>
                                <Image src={game?.url} width={60} height={60} alt={game.name} />
                                <div>
                                    <p>{game.name}</p>
                                    <span>{game.platforms}</span>
                                </div>
                            </Link>
                        ))}

                        {hasMore && (
                            <Link href={`/search/${debouncedQuery}`} className={styles.viewMore}>
                                <p>View More Results</p>
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    )

}