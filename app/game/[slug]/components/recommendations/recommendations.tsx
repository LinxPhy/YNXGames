import Image from 'next/image'
import styles from './recommendations.module.css'
import Link from 'next/link'

export default function Recommendations({ data }: { data: any }) {

    const { similar_games } = data

    return (
        <div className={styles.recommendations} id="recommendations">
            <h3>Similar Games</h3>

            <div className={styles.recommendationSection}>
                {similar_games?.length > 0 ? (
                    similar_games.map((game: any) => (
                        <Link href={`/game/${game.slug}`} key={game.id}>
                            <Image src={game.url} width={300} height={300} alt={game.name} key={game.id} />
                            <div className={styles.content}>
                                <h4>{game.name}</h4>
                                <p>{game.storyline || game.summary}</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No similar games found.</p>
                )}
            </div>
        </div>
    )

}