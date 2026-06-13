'use client'
import { useQuery } from '@tanstack/react-query'
import getGames from './getExploreGames'
import styles from './page.module.css'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from './navigation'
import { ExploreContextProvider } from './exploreContext'
import { useContext, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const getPopularGames = async () => {
    const request = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/popular`);
    return request.json();
}

export default function Explore() {

    const searchParams = useSearchParams();
    const router = useRouter()

    const { filters }: any = useContext(ExploreContextProvider);
    const searchQuery = searchParams.toString()
    const page = searchParams.get('page') || 1

    const { data: popularGames, isLoading: isLoadingPopularGames } = useQuery({
        queryKey: ['popular-games'],
        queryFn: getPopularGames,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        enabled: searchQuery == '',
    });

    const { data: exploreGames, isLoading: isLoadingExploreGames } = useQuery({
        queryKey: ['explore', searchQuery],
        queryFn: ({ pageParam = page }: any) => getGames(filters, pageParam),
        enabled: searchQuery !== '',
        refetchOnWindowFocus: false,
        // placeholderData: (prev) => prev
    })

    if (isLoadingExploreGames || isLoadingPopularGames) {
        return (
            <div className={styles.games}>
                {Array.from({ length: 20 }).map((_, index) => (
                    <div key={index} className={`${styles.skeleton}`}></div>
                ))}
            </div>
        )
    }

    const games = searchQuery !== '' ? exploreGames.data ?? [] : popularGames ?? []

    return (
        <div className={styles.explore}>

            <div className={styles.games}>
                {games && games?.map((game: Game) => (
                    <Link href={`/game/${game?.slug}`} className={styles.gameCard} key={game.id} >
                        <Image
                            src={game?.image || "/images/placeholder.png"}
                            className={styles.gameImage}
                            alt={game.name || "Game Image"}
                            width={game.width || 600}
                            height={game.height || 900}
                        />

                        <div className={styles.gameInfo}>
                            <h3 className={styles.gameTitle}>
                                {game.name}
                            </h3>

                            <div className={styles.gameRating}>
                                <div className={styles.gameGenre}>
                                    <p>{game.genre}</p>
                                </div>

                                <div className={styles.rating}>
                                    <Image
                                        src="/icons/star.png"
                                        alt="Star"
                                        width={16}
                                        height={16}
                                    />

                                    <p>
                                        {game?.total_rating || "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>

                ))}
            </div>
            
            <Navigation
                currentPage={exploreGames?.currentPage || 1}
                hasMore={exploreGames?.hasMore|| false}
                nextPage={exploreGames?.nextPage || 1}
            />

        </div>
    )
}

