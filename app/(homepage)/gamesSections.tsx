import styles from "./page.module.css";
import Image from "next/image";
import Carousel from "../components/carousel/carousel";
import Link from "next/link";

interface HeaderMessage {
    name: string;
    h2: string;
    span: string;
}

export default function GamesSections({ games, headerMessages }: { games: any; headerMessages: HeaderMessage[] }) {

    const { action, fantasy, mystery, open_world, new_releases, random, popular, old_games, romance, educational, science_fiction, drama } = games

    const gameSections: any = {
        popular,
        action,
        fantasy,
        new_releases,
        open_world,
        mystery,
        old_games,
        random,
        romance,
        educational,
        science_fiction,
        drama
    };

    return (
        <div className={styles.gamesContainer}>

            {headerMessages.map((section: HeaderMessage) => {
                const gamesList = gameSections[section.name];

                return (
                    <section key={section.name} className={styles.games}>
                        <Link href={`/games/?search_type=${section.name}`}>
                            <div className={styles.gamesHeader}>
                                <h2>{section.h2}</h2>
                                <button>▶</button>
                            </div>
                        </Link>

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
                                                    <p>{game?.genre || "N/A"}</p>
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