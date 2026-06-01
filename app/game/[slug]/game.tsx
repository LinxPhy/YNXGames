import Hero from './components/hero/hero'
import Media from './components/media/media'
import Navigation from './components/navigation/navigation'
import Overview from './components/overview/overview'
import styles from './page.module.css'

export default function Game({ game }: { game: GameProps }) {

    const { themes, covers, genres, platforms, companies, modes, videos, screenshots, franchises, collections, game: play } = game
    const hero = { themes, covers, genres, videos, screenshots, play }
    const media = { videos, screenshots }
    const overview = { play }

    return (
        <div className={styles.content}>
            <Hero data={hero}  />
            {/* <Media data={media} /> */}
            <Navigation />
            <Overview data={overview} />
        </div>
    )
}