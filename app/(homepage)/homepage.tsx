import Image from "next/image";
import styles from "./page.module.css";
import Categories from "../components/categories/categories";

export default function HomePage({ games }: { games: Game[] }) {

    // popular games, 
    // by genre
    // new releases
    // 

    return (
        <div className={styles.content}>

            <div className={styles.searchContainer}>
                <div className={styles.searchWrapper}>
                    <input type="search" placeholder="Search for games in our database" className={styles.search} />
                    <button className={styles.searchButton}>Search</button>
                </div>
            </div>

            <Categories />

            {/* <div className={styles.games}>

                <div>
                    <h2>Popular Games</h2>
                </div>

                <div className={styles.gamesContainer}>
                    {games.slice(0, 10).map((game) => (
                        <div key={game.id} className={styles.gameCard}>
                            <Image src={game.image} className={styles.gameImage} alt={game.image} width={game.width} height={game.height} />

                            <div className={styles.gameInfo}>
                                <h3 className={styles.gameTitle}>{game.name}</h3>
                                <div className={styles.gameRating}>
                                    <Image src="/icons/star.png" alt="Star" width={16} height={16} />
                                    <p>{game?.total_rating?.toFixed(1)}</p>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div> */}

            {/* <div className={styles.games}>

                <div>
                    <h2>New Games</h2>
                </div>

                <Carousel >
                    <div className={styles.gamesContainer}>
                        {games.map((game) => (
                            <div key={game.id} className={styles.gameCard}>
                                <Image src={game.image} className={styles.gameImage} alt={game.image} width={game.width} height={game.height} />

                                <div className={styles.gameInfo}>
                                    <h3 className={styles.gameTitle}>{game.name}</h3>
                                    <div className={styles.gameRating}>
                                        <Image src="/icons/star.png" alt="Star" width={16} height={16} />
                                        <p>{game?.total_rating?.toFixed(1)}</p>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </Carousel>
            </div> */}

        </div>
    );
}
