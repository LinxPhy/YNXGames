'use client'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styles from './ratings.module.css'
import Image from 'next/image';

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

    function ProgressBarColor(rating: number) {
        if (!rating) return '#000'
        return `var(--primary)`
    }

    const percentage = play.rating ? Math.round(play.rating * 20) : 0
    const totalPercentage = play.total_rating ? Math.round(play.total_rating * 20) : 0

    return (
        <div className={styles.ratings}>

            <div className={styles.ratingSection}>
                <h3>IGDB Rating</h3>

                <div className={styles.progressBar}>
                    <CircularProgressbar
                        value={percentage}
                        text={`${play.rating} `}
                        strokeWidth={12}
                        styles={buildStyles({
                            pathColor: ProgressBarColor(percentage),
                            textColor: '#fff',
                            backgroundColor: '#333',
                            trailColor: '#2f2752',
                            textSize: '1.2rem',
                        })}
                    />;
                </div>

                <div className={styles.items}>
                    <div className={styles.item}>
                        <Image src="/icons/user.png" width={24} height={24} alt="IGDB User Rating" />
                        <p>{play.rating}</p>
                        <h4>User Rating</h4>
                    </div>

                    <div className={styles.item}>
                        <Image src="/icons/count.png" width={24} height={24} alt="IGDB User Rating Count" />
                        <p>{play.rating_count}</p>
                        <h4>User Rating Count</h4>
                    </div>

                    <div className={styles.item}>
                        <Image src="/icons/discount.png" width={24} height={24} alt="IGDB User Rating" />
                        <p>{percentage}%</p>
                        <h4>Rating %</h4>
                    </div>
                </div>

            </div>


            <div className={styles.ratingSection}>
                <h3>Critics Rating</h3>

                <div className={styles.progressBar}>
                    <CircularProgressbar
                        value={totalPercentage}
                        text={`${play.total_rating} `}
                        strokeWidth={12}
                        styles={buildStyles({
                            pathColor: ProgressBarColor(totalPercentage),
                            textColor: '#fff',
                            backgroundColor: '#333',
                            trailColor: '#2f2752',
                            textSize: '1.2rem',
                        })}
                    />;
                </div>

                <div className={styles.items}>
                    <div className={styles.item}>
                        <Image src="/icons/user.png" width={24} height={24} alt="IGDB User Rating" />
                        <p>{play.total_rating}</p>
                        <h4>Critics Rating</h4>
                    </div>

                    <div className={styles.item}>
                        <Image src="/icons/count.png" width={24} height={24} alt="IGDB User Rating Count" />
                        <p>{play.total_rating_count}</p>
                        <h4>Critics Rating Count</h4>
                    </div>

                    <div className={styles.item}>
                        <Image src="/icons/discount.png" width={24} height={24} alt="IGDB User Rating" />
                        <p>{totalPercentage}%</p>
                        <h4>Critics Rating %</h4>
                    </div>
                </div>

            </div>
        </div>
    )

}