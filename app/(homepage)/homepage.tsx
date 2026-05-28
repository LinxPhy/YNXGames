import Image from "next/image";
import styles from "./page.module.css";
import Categories from "../components/categories/categories";
import Carousel from "../components/carousel/carousel";
import GamesSections from "./gamesSections";

export default function HomePage({ games }: { games: any }) {

    return (
        <div className={styles.content}>

            <div className={styles.searchContainer}>
                <div className={styles.searchWrapper}>
                    <input type="search" placeholder="Search for games in our database" className={styles.search} />
                    <button className={styles.searchButton}>Search</button>
                </div>
            </div>

            <Categories />
            <GamesSections games={games} />

        </div>
    );
}
