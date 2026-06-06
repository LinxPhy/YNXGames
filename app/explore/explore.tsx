'use client'
import { useInfiniteQuery } from '@tanstack/react-query'
import getGames from './getExploreGames'
import styles from './page.module.css'

export default function Explore({ popular }: { popular: Game[] }) {

    // const { data, loading, error } = useInfiniteQuery({

    // })

    return (
        <div className={styles.explore}>
            <h1>Explore</h1>
        </div>
    )
}