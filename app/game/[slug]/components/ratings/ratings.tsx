import styles from './ratings.module.css'

export default function Ratings({ data }: { data: any }) {

    const { play } = data

    function IGDBRatingColor(rating: number) {
        if (!rating) return `${styles['nothing']}`
        if (rating < 1.5) return `${styles['red']}`
        if (rating < 2.5) return `${styles['orange']}`
        if (rating < 3.5) return `${styles['yellow']}`
        if (rating < 4.5) return `${styles['light-green']}`
        return `${styles['green']}`
    }

    return (
        <div className={styles.ratings}>
            <h3>Ratings</h3>

            <div className={styles.ratingSection}>

                <div className={styles.item}>
                    <h4>IGDB User Rating</h4>
                    <p className={`${IGDBRatingColor(play.rating)}`}>{play.rating}</p>
                </div>

                <div className={styles.item}>
                    <h4>IGDB User Rating Count</h4>
                    <p>{play.rating_count}</p>
                </div>

                <div className={styles.item}>
                    <h4>Total Critics Rating:</h4>
                    <p className={`${IGDBRatingColor(play.total_rating)}`}>{play.total_rating}</p>
                </div>

                <div className={styles.item}>
                    <h4>Total Critics Rating Rank:</h4>
                    <p>{play.total_rating_count}</p>
                </div>


            </div>
        </div>
    )

}