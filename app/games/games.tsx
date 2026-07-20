'use client'
import { useContext, useState } from 'react'
import Image from 'next/image'
import styles from './page.module.css'
import { useSearchParams } from 'next/navigation'
import { useInfiniteQuery } from '@tanstack/react-query'
import { GamesContextProvider } from './gamesContext'
import Link from 'next/link'
import InfiniteScrollContainer from '../components/infiniteScroll'

// add delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const getGames = async (option: string, pageParam: number, type: string, genres: any, themes: any) => {

    const getType = genres.find((genre: any) => genre.slug === option) ? 'genre' : themes.find((theme: any) => theme.slug === option) ? 'theme' : ''

    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/return_games/${option}?` +
        new URLSearchParams({
            page: pageParam.toString(),
            type: getType ? getType.toString() : type
        })
    );

    return response.json();

}

export default function Games() {

    const searchParams = useSearchParams()

    const option: any = searchParams.get('search_type')
    const { genres, themes }: any = useContext(GamesContextProvider)

    function HandleSearchName(name: string){

        if (!name) return ""
        
        let new_name = decodeURIComponent(name).replace(/%20/g, ' ');
        new_name = new_name.charAt(0).toUpperCase() + new_name.slice(1);
        new_name = new_name.split('-').join(' ');
        new_name = new_name.split('_').join(' ');

        return new_name
    }

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching, isLoading, error } = useInfiniteQuery({
        queryKey: ['games', option],
        queryFn: ({ pageParam = 1 }) => getGames(option, pageParam, "", genres, themes),
        getNextPageParam: (lastPage) => {
            return lastPage.hasMore ? lastPage.nextPage : undefined
        },
        initialPageParam: 1,
        refetchOnWindowFocus: false,
        enabled: option !== null
    })

    if (isLoading) return (
        <div className={styles.gamesContainer}>
            <div className={styles.games}>
                {Array.from({ length: 20 }).map((_, index) => (
                    <div key={index} className={`${styles.skeleton}`}></div>
                ))}
            </div>
        </div>
    )
    if (error) return <div>Error</div>;

    const games = data?.pages.flatMap((page: any) => page.games);

    return (
        <div className={styles.gamesContainer}>

            <h2>{HandleSearchName(option)}</h2>

            <InfiniteScrollContainer onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()} >
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

                    {isFetchingNextPage && (
                        <>
                            {Array.from({ length: 10 }).map((_, index) => (
                                <div key={index} className={`${styles.skeleton}`}></div>
                            ))}
                        </>
                    )}
                </div>


            </InfiniteScrollContainer>

        </div>
    )

}