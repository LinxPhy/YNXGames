import styles from './hero.module.css'
import formatDateTime from '@/app/components/formatDateTime'
import Image from 'next/image'

export default function Hero({ data }: { data: any }) {

    const { themes, covers, genres, videos, screenshots, play } = data
    const cover = covers[0]
    const game = play

    return (
        <div className={styles.hero} id="top">
            <Image src={cover?.url} width={cover?.width || 500} height={cover?.height || 500} alt="Game Cover" className={styles.cover} />

            <div className={styles.info}>

                <h1>{game.name}</h1>

                <div className={styles.genres}>
                    {themes && themes.map((theme: Theme) => (
                        <p key={theme.id} className={styles.themes}>{theme.name}</p>
                    ))}
                    {genres && genres.map((genre: Genre) => (
                        <p key={genre.id} className={styles.genre}>{genre.name}</p>
                    ))}
                </div>

                <div className={styles.summary}>
                    <p>{game.summary}</p>
                </div>

                <div className={styles.ratings}>
                    <div className={styles.rating}>
                        {game.total_rating}
                    </div>

                    <div>
                        <p>External Ratings</p>
                        <span>{game.total_rating_count} ratings</span>
                    </div>
                </div>

                <div className={styles.releaseDate}>
                    <div>
                        <span>Release Date:</span>
                        <p>{formatDateTime(game?.first_release_date) || "Unknown"}</p>
                    </div>
                    <div>
                        <span>Last Updated:</span>
                        <p>{formatDateTime(game?.updated_at) || "Unknown"}</p>
                    </div>
                </div>

            </div>
        </div>
    )
}