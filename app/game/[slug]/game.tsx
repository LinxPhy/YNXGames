import Hero from './components/hero'
import styles from './page.module.css'

export default function Game({ game }: { game: GameProps }) {

    const { themes, covers, genres, platforms, companies, modes, videos, screenshots, franchises, collections } = game
    const hero = { themes, covers, genres, videos, screenshots }

    return (
        <div className={styles.content}>
            <Hero data={hero}  />
        </div>
    )
}