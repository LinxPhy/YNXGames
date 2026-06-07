'use client'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import getGames from './getExploreGames'
import styles from './page.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { ExploreContextProvider } from './exploreContext'
import { useContext } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const getPopularGames = async () => {
    const request = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/popular`);
    return request.json();
}

export default function Explore() {

    const searchParams = useSearchParams();
    const router = useRouter()
    
    const { filters }: any = useContext(ExploreContextProvider);
    
    const initialQuery = 
        searchParams.get('genres') || 
        searchParams.get('platforms') || 
        searchParams.get('companies') || 
        searchParams.get('themes') || 
        searchParams.get('modes') || 
        searchParams.get('initial_year') || 
        searchParams.get('final_year') || 
        searchParams.get('search_type') ||
        '';

    const { data: popularGames, isLoading: isLoadingPopularGames } = useQuery({
        queryKey: ['popular-games'],
        queryFn: getPopularGames,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        enabled: initialQuery.length === 0
    });

    const { data: exploreGames, isLoading: isLoadingExploreGames } = useQuery({
        queryKey: ['explore'],
        queryFn: ({ pageParam } : any) => getGames(filters, pageParam),
        enabled: initialQuery.length > 0,
        refetchOnWindowFocus: false,
        placeholderData: (prev) => prev
    })

    if (isLoadingPopularGames) {
        return (
            <div className={styles.loading}>
                <h1>Loading...</h1>
            </div>
        )
    }

    const games = initialQuery.length > 0 ? exploreGames ?? [] : popularGames ?? []

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

        </div>
    )
}

