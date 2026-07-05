import Link from 'next/link';
import Image from 'next/image';
import styles from './details.module.css';
import formatDateTime from '@/app/components/formatDateTime'

export default function Details({ data }: { data: any }) {

    const { themes, genres, platforms, companies, modes, franchises, collections, play } = data

    return (
        <div className={styles.details}>
            <h3>Details</h3>

            <div className={styles.detailSection}>
                <div className={styles.item}>
                    <div className={styles.itemHeader}>
                        <Image src="/icons/platforms.png" width={20} height={20} alt="platform" />
                        <h4>Platforms:</h4>
                    </div>
                    <p>{platforms?.map((platform: any) => platform.name).join(', ')}</p>
                </div>

                <div className={styles.item}>
                    <div className={styles.itemHeader}>
                        <Image src="/icons/release_date.png" width={20} height={20} alt="release date" />
                        <h4>Release Date:</h4>
                    </div>
                    <p>{formatDateTime(play?.first_release_date)}</p>
                </div>

                <div className={styles.item}>
                    <div className={styles.itemHeader}>
                        <Image src="/icons/modes.png" width={20} height={20} alt="mode" />
                        <h4>Modes:</h4>
                    </div>
                    <p>{modes?.map((mode: any) => mode.name).join(', ')}</p>
                </div>

                <div className={styles.item}>
                    <div className={styles.itemHeader}>
                        <Image src="/icons/themes.png" width={20} height={20} alt="theme" />
                        <h4>Themes:</h4>
                    </div>
                    <p>{themes?.map((theme: any) => theme.name).join(', ')}</p>
                </div>

                <div className={styles.item}>
                    <div className={styles.itemHeader}>
                        <Image src="/icons/genres.png" width={20} height={20} alt="genre" />
                        <h4>Genres:</h4>
                    </div>
                    <p className={styles.genres}>{genres?.map((genre: any) => genre.name).join(', ')}</p>
                </div>

                <div className={styles.item}>
                    <div className={styles.itemHeader}>
                        <Image src="/icons/franchises.png" width={20} height={20} alt="franchise" />
                        <h4>Franchises:</h4>
                    </div>
                    <p>{franchises?.map((franchise: any) => franchise.name).join(', ')}</p>
                </div>

                <div className={styles.item}>
                    <div className={styles.itemHeader}>
                        <Image src="/icons/website.png" width={20} height={20} alt="IGDB" />
                        <h4>IGDB Website:</h4>
                    </div>
                    <p>
                        <Link href={play?.url || '#'} target="_blank" rel="noopener noreferrer" className={styles.link}>
                            {play?.url ? play.name : 'N/A'}
                        </Link>
                    </p>
                    {/* <p>{play?.url}</p> */}
                </div>
            </div>
        </div>

    )

}