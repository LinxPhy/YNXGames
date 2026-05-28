import styles from './hero.module.css'
import Image from 'next/image'

export default function Hero({ data }: { data: any }) {

    const { themes, covers, genres, videos, screenshots } = data
    // console.log(data)

    return (
        <div className={styles.hero}>
            {/* <Image src={covers[0].url} width={500} height={500} alt="Game Cover" className={styles.cover} /> */}
        </div>
    )
}