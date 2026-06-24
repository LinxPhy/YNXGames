'use client'
import { useContext, useState } from 'react'
import DefaultOptions from './defaultOptions'
import styles from './page.module.css'
import { useSearchParams } from 'next/navigation'
import { useInfiniteQuery } from '@tanstack/react-query'
import { GamesContextProvider } from './gamesContext'

const getGames = async (option: string, pageParam: number) => {
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/return_games/${option}?` + 
        new URLSearchParams({
            page: pageParam.toString(),
        })
    );
    return response.json();

}

export default function Games() {

    const searchParams = useSearchParams()
    
    const option = searchParams.get('search_type')
    const { genres, themes } : any = useContext(GamesContextProvider)

    // const { data, isLoading, isError } = useInfiniteQuery({
    //     queryKey: ['games', option],
    //     queryFn: ({ pageParam = 1 }) => getGames(option, pageParam),

    //     refetchOnWindowFocus: false,
    // })

    return (
        <div className={styles.games}>

        </div>
    )

}