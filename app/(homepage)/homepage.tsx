import styles from "./page.module.css";
import Categories from "../components/categories/categories";
import GamesSections from "./gamesSections";
import OtherCategories from "../components/categories/other_categories";
import Banner from "../components/banner/banner";

export default function HomePage({ games }: { games: any }) {

    const topCategories = [
        { id: 1, name: "Adventure", url: "/images/adventure.jpg", slug: "adventure", advert: "Epic Fantasy Adventures" },
        { id: 2, name: "Horror", url: "/images/horror.jpg", slug: "horror", advert: "Scary Horror Experiences" },
        { id: 3, name: "Romance", url: "/images/romance.jpg", slug: "romance", advert: "Romantic Encounters" },
        { id: 4, name: "Shooting", url: "/images/shooting.jpg", slug: "shooting", advert: "Action-Packed Shootouts" },
        { id: 5, name: "Racing", url: "/images/racing.jpg", slug: "racing", advert: "Speedy Racing Adventures" },
        { id: 6, name: "Survival", url: "/images/survival.jpg", slug: "survival", advert: "Survival Experiences" },
        { id: 7, name: "Puzzle", url: "/images/puzzle.jpg", slug: "puzzle", advert: "Puzzling Enquires" },
        { id: 8, name: "Arcade", url: "/images/arcade.jpg", slug: "arcade", advert: "Classicals" },
        { id: 18, name: "Fighting", url: "/images/fighting.jpg", slug: "fighting", advert: "Fighting Games" },
    ]

    const otherCategories = [
        { id: 9, name: "Strategy", url: "/images/strategy.jpg", slug: "strategy", advert: "Strategic Conquests" },
        { id: 10, name: "MOBA", url: "/images/moba.jpg", slug: "moba", advert: "Competitive MOBA Battles" },
        { id: 11, name: "Music", url: "/images/music.jpg", slug: "music", advert: "Rhythm and Music Games" },
        { id: 12, name: "Indie", url: "/images/indie.jpg", slug: "indie", advert: "From small teams" },
        { id: 13, name: "Sport", url: "/images/sport.jpg", slug: "sport", advert: "Sportive Experiences" },
        { id: 14, name: "Turn-based", url: "/images/turn-based.jpg", slug: "turn-based", advert: "One Turn Games" },
        { id: 15, name: "Simulator", url: "/images/simulator.jpg", slug: "simulator", advert: "Simulator Games" },
        { id: 16, name: "Tactical", url: "/images/tactical.jpg", slug: "tactical", advert: "Tactical Games" },
        { id: 17, name: "Cards", url: "/images/cards.jpg", slug: "cards", advert: "Card and Board Games" },
    ]

    const headerMessages = [
        { name: "popular", h2: "Popular Games", span: "Explore some of the most popular games of all time" },
        { name: "new_releases", h2: "New Releases", span: "View the latest releases" },
        { name: "random", h2: "Random Game", span: "Still confused? Try a random game" },
        { name: "action", h2: "Action Games", span: "Try an action-packed experience" },
    ]

    const moreHeaderMessages = [
        { name: "fantasy", h2: "Fantasy Games", span: "Feeling magical? Try a fantasy game" },
        { name: "mystery", h2: "Mystery Games", span: "Feeling like a detective? Maybe a mystery game" },
        { name: "open_world", h2: "Open World Games", span: "Experience open world games" },
        { name: "old_games", h2: "Old Games", span: "Discover old gems" },
    ]


    return (
        <div className={styles.content}>
            <Categories data={topCategories} />
            <GamesSections games={games} headerMessages={headerMessages} />
            <OtherCategories data={otherCategories} />
            <GamesSections games={games} headerMessages={moreHeaderMessages} />
            <Banner />
        </div>
    );
}
