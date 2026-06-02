import Link from 'next/link';
import styles from './details.module.css';
import formatDateTime from '@/app/components/formatDateTime'

export default function Details({ data }: { data: any }) {

    const { themes, genres, platforms, companies, modes, franchises, collections, play } = data

    return (
        <div className={styles.details}>
            <h3>Details</h3>

            <div className={styles.detailSection}>
                <div className={styles.item}>
                    <h4>Platforms:</h4>
                    <p>{platforms?.map((platform: any) => platform.name).join(', ')}</p>
                </div>

                <div className={styles.item}>
                    <h4>Release Date:</h4>
                    <p>{formatDateTime(play?.first_release_date)}</p>
                </div>

                <div className={styles.item}>
                    <h4>Modes:</h4>
                    <p>{modes?.map((mode: any) => mode.name).join(', ')}</p>
                </div>

                <div className={styles.item}>
                    <h4>Themes:</h4>
                    <p>{themes?.map((theme: any) => theme.name).join(', ')}</p>
                </div>

                <div className={styles.item}>
                    <h4>Genres:</h4>
                    <p className={styles.genres}>{genres?.map((genre: any) => genre.name).join(', ')}</p>
                </div>

                <div className={styles.item}>
                    <h4>Franchises:</h4>
                    <p>{franchises?.map((franchise: any) => franchise.name).join(', ')}</p>
                </div>

                <div className={styles.item}>
                    <h4>IGDB Website:</h4>
                    <p>
                        <Link href={play?.url || '#'} target="_blank" rel="noopener noreferrer">
                            {play?.url ? play.name : 'N/A'}
                        </Link>
                    </p>
                    {/* <p>{play?.url}</p> */}
                </div>
            </div>
        </div>

    )

}