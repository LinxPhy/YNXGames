import Image from "next/image";
import styles from "./page.module.css";
import Categories from "../components/categories/categories";
import Carousel from "../components/carousel/carousel";

export default function HomePage({ games }: { games: any }) {

    const { action, fantasy, mystery, open_world, new_releases, random, popular, old_games } = games

    return (
        <div className={styles.content}>

            <div className={styles.searchContainer}>
                <div className={styles.searchWrapper}>
                    <input type="search" placeholder="Search for games in our database" className={styles.search} />
                    <button className={styles.searchButton}>Search</button>
                </div>
            </div>

            <Categories />

            <div className={styles.games}>

                <div className={styles.gamesHeader}>
                    <h2>Popular Games</h2>
                    <span>Explore some of the most popular games</span>
                </div>

                <Carousel>
                    <div className={styles.gamesContainer}>
                        {popular.map((game : Game) => (
                            <div key={game.id} className={styles.gameCard}>
                                <Image
                                    src={game?.image || "/images/placeholder.png"}
                                    className={styles.gameImage}
                                    alt={game.name || "Game Image"}
                                    width={game.width || 600}
                                    height={game.height || 900} />

                                <div className={styles.gameInfo}>
                                    <h3 className={styles.gameTitle}>{game.name}</h3>
                                    <div className={styles.gameRating}>
                                        <div className={styles.gameGenre}>
                                            <p>{game.genre}</p>
                                        </div>
                                        <div className={styles.rating}>
                                            <Image src="/icons/star.png" alt="Star" width={16} height={16} />
                                            <p>{game?.total_rating || "N/A"}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </Carousel>
            </div>

            <div className={styles.games}>

                <div className={styles.gamesHeader}>
                    <h2>New Games</h2>
                    <span>View the latest releases</span>
                </div>

                <Carousel >
                    <div className={styles.gamesContainer}>
                        {new_releases.slice(10, 20).map((game : Game) => (
                            <div key={game.id} className={styles.gameCard}>
                                <Image
                                    src={game?.image || "/images/placeholder.png"}
                                    className={styles.gameImage}
                                    alt={game.name || "Game Image"}
                                    width={game.width || 600}
                                    height={game.height || 900}
                                />

                                <div className={styles.gameInfo}>
                                    <h3 className={styles.gameTitle}>{game.name}</h3>
                                    <div className={styles.gameRating}>
                                        <Image src="/icons/star.png" alt="Star" width={16} height={16} />
                                        <p>{game?.total_rating || "N/A"}</p>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </Carousel>
            </div>

        </div>
    );
}
