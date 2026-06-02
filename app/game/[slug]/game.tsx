import Details from './components/details/details'
import Hero from './components/hero/hero'
import Media from './components/media/media'
import Navigation from './components/navigation/navigation'
import Overview from './components/overview/overview'
import Ratings from './components/ratings/ratings'
import styles from './page.module.css'

export default function Game({ game }: { game: GameProps }) {

    const { themes, covers, genres, platforms, companies, modes, similar_games, videos, screenshots, franchises, collections, game: play } = game
    const hero = { themes, covers, genres, videos, screenshots, play }
    const media = { videos, screenshots }
    const overview = { play }
    const details = { themes, genres, platforms, companies, modes, franchises, collections, play }
    const ratings = { play }

    return (
        <div className={styles.content}>
            <Hero data={hero}  />
            {/* <Media data={media} /> */}
            <Navigation />
            <Overview data={overview} />
            <Details data={details} />
            <Ratings data={ratings} />
        </div>
    )
}