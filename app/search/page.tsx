'use client'
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from './page.module.css'
import Image from "next/image";
import Link from "next/link";

const fetchGames = async (query: string, page: number) => {

    const limit = 10

    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/search/${query}?` +
        new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
        })
    );

    // add delay
    // await new Promise((resolve) => setTimeout(resolve, 100000));

    return response.json();
}

export default function Search() {

    const searchParams = useSearchParams();
    const router = useRouter()
    const initialQuery = searchParams.get('query') || '';

    const [inputValue, setInputValue] = useState(initialQuery);
    const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

    useEffect(() => {
        const delay = setTimeout(() => {
            setDebouncedQuery(inputValue.trim());
        }, 300); // debounce delay

        return () => clearTimeout(delay);
    }, [inputValue]);

    useEffect(() => {
        const params = new URLSearchParams();

        if (debouncedQuery) {
            params.set('query', debouncedQuery);
        }

        router.replace(`?${params.toString()}`, { scroll: false });
    }, [debouncedQuery, router]);

    useEffect(() => {
        setInputValue(initialQuery);
    }, [initialQuery]);

    const { data, fetchNextPage, isFetching, isError, isFetchingNextPage, isPending, hasNextPage } = useInfiniteQuery({
        queryKey: ['search', debouncedQuery],
        queryFn: ({ pageParam }) => fetchGames(debouncedQuery, pageParam),
        getNextPageParam: (lastPage) => {
            return lastPage.hasMore ? lastPage.nextPage : undefined
        },
        initialPageParam: 1,
        refetchOnWindowFocus: false,
        enabled: debouncedQuery.length > 0,
        // placeholderData: (prev) => prev,
    })

    const games = data?.pages.flatMap((page: any) => page.data)

    return (
        <div className={styles.content}>
            <div className={styles.searchWrapper}>
                <input
                    type="search"
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                    }}
                    placeholder="Search for games in our database"
                    className={styles.search}
                />
            </div>

            <div className={styles.games}>
                <div className={styles.results}>
                    {games && games.length > 0 && (
                        <div className={styles.searchResults}>
                            {games.map((game: any) => (
                                <Link href={`/game/${game.slug}`} key={game.id}>
                                    <Image src={game.url} width={200} height={200} alt={game.name} />
                                    <div>
                                        <div>
                                            <h4>{game.name}</h4>
                                            <span>{game.platforms}</span>
                                        </div>
                                        <p>{game.storyline || game.summary}</p>

                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {games && games?.length > 0 && (
                        <div className={styles.viewMore}>
                            <button
                                disabled={!hasNextPage || isFetchingNextPage}
                                onClick={() => fetchNextPage()}
                            >
                                {isFetchingNextPage
                                    ? 'Loading more...'
                                    : 'View More Results ▼'}
                            </button>
                        </div>
                    )}

                </div>
            </div>

            {isFetching && (
                <div className={styles.searchResults}>
                    <div className={styles.gameSkeletonResults}>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div key={index} className={`${styles.skeleton}`}></div>
                        ))}
                    </div>
                </div>
            )}

            {isError && (
                <div className={styles.searchResults}>
                    <p>Error fetching results.</p>
                </div>
            )}
        </div>
    )

}