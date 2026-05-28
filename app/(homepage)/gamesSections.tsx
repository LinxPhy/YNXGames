import styles from "./page.module.css";
import Image from "next/image";
import Carousel from "../components/carousel/carousel";
import Link from "next/link";

interface HeaderMessage {
    name: string;
    h2: string;
    span: string;
}

export default function GamesSections({ games }: { games: any }) {

    const { action, fantasy, mystery, open_world, new_releases, random, popular, old_games } = games

    const gameSections: any = {
        popular,
        action,
        fantasy,
        new_releases,
        open_world,
        mystery,
        old_games,
        random,
    };

    const headerMessages = [
        { name: "popular", h2: "Popular Games", span: "Explore some of the most popular games of all time" },
        { name: "new_releases", h2: "New Releases", span: "View the latest releases" },
        { name: "random", h2: "Random Game", span: "Still confused? Try a random game" },
        { name: "old_games", h2: "Old Games", span: "Discover old gems" },
        { name: "action", h2: "Action Games", span: "Try an action-packed experience" },
        { name: "fantasy", h2: "Fantasy Games", span: "Feeling magical? Try a fantasy game" },
        { name: "mystery", h2: "Mystery Games", span: "Feeling like a detective? Maybe a mystery game" },
        { name: "open_world", h2: "Open World Games", span: "Experience open world games" },
    ]

    return (
        <div className={styles.gamesContainer}>

            {headerMessages.map((section: HeaderMessage) => {
                const gamesList = gameSections[section.name];

                return (
                    <section key={section.name} className={styles.games}>
                        <div className={styles.gamesHeader}>
                            <h2>{section.h2}</h2>
                            <span>{section.span}</span>
                        </div>

                        <Carousel>
                            <div className={styles.game}>
                                {gamesList?.map((game: Game) => (
                                    <Link href={`/game/${game?.slug}`} className={styles.gameCard} key={game.id} >
                                        <Image
                                            src={game?.image || "/images/placeholder.png"}
                                            className={styles.gameImage}
                                            alt={game.name || "Game Image"}
                                            width={game.width || 600}
                                            height={game.height || 900}
                                        />

                                        <div className={styles.gameInfo}>
                                            <h3 className={styles.gameTitle}>
                                                {game.name}
                                            </h3>

                                            <div className={styles.gameRating}>
                                                <div className={styles.gameGenre}>
                                                    <p>{game.genre}</p>
                                                </div>

                                                <div className={styles.rating}>
                                                    <Image
                                                        src="/icons/star.png"
                                                        alt="Star"
                                                        width={16}
                                                        height={16}
                                                    />

                                                    <p>
                                                        {game?.total_rating || "N/A"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>

                                ))}
                            </div>
                        </Carousel>
                    </section>
                )
            })
            }

        </div>
    )
}