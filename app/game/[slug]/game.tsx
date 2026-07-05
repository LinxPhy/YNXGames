import Company from './components/company/company'
import Details from './components/details/details'
import Hero from './components/hero/hero'
import Image from 'next/image'
import Navigation from './components/navigation/navigation'
import Overview from './components/overview/overview'
import Ratings from './components/ratings/ratings'
import Recommendations from './components/recommendations/recommendations'
import styles from './page.module.css'
import Screenshots from './components/media/screenshots'
import Videos from './components/media/videos'

export default function Game({ game }: { game: GameProps }) {

    const { themes, covers, genres, platforms, companies, modes, similar_games, videos, screenshots, franchises, collections, game: play } = game
    const hero = { themes, covers, genres, videos, screenshots, play }
    const media = { videos, screenshots }
    const overview = { play }
    const details = { themes, genres, platforms, companies, modes, franchises, collections, play }
    const ratings = { play }
    const similarGames = { similar_games }
    const company_values = { companies }

    return (
        <div className={styles.gamePage}>
            {/* <Image src={covers?.[0]?.url} width={500} height={500} className={styles.coverImage} alt={''} /> */}
            <div className={styles.content}>
                <Hero data={hero} />
                <Navigation />
                <Screenshots data={media} />
                <Videos data={media} />
                <Overview data={overview} />

                <Details data={details} />
                <Ratings data={ratings} />
                <Company data={company_values} />
                <Recommendations data={similarGames} />
            </div>
        </div>
    )
}