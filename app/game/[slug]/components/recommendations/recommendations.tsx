import Image from 'next/image'
import styles from './recommendations.module.css'

export default function Recommendations({ data }: { data: any }) {

    const { similar_games } = data

    return (
        <div className={styles.recommendations}>
            <h3>Similar Games</h3>

            <div className={styles.recommendationSection}>
                {similar_games?.length > 0 ? (
                    similar_games.map((game: any) => (
                        <Image src={game.url} width={300} height={300} alt={game.name} key={game.id} />
                    ))
                ) : (
                    <p>No similar games found.</p>
                )}
            </div>
        </div>
    )

}