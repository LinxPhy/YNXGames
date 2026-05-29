import styles from './hero.module.css'
import Image from 'next/image'

export default function Hero({ data }: { data: any }) {

    const { themes, covers, genres, videos, screenshots, play } = data
    const cover = covers[0]
    const game = play[0]
//     total_rating
// : 
// 79.7593
// total_rating_count
// : 
// 993

    return (
        <div className={styles.hero}>
            <Image src={cover.url} width={cover.width} height={cover.height} alt="Game Cover" className={styles.cover} />

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
                        <span>{game.total_rating_count}</span>
                    </div>
                </div>

                {/* release date */}
                <div>
                    <span>Release Date: {game?.first_release_date || "Unknown"}</span>
                </div>

            </div>
        </div>
    )
}