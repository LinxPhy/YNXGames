import Sidebar from "./sidebar"
import styles from './page.module.css'
import { Suspense } from "react";
import { GamesContext } from "./gamesContext";

export default async function GamesLayout({ children }: { children: React.ReactNode }) {

    const response = await fetch(
        `${process.env.SERVER_URL}/games_options`
    )

    const data = await response.json();

    return (
        <div className={styles.container}>
            <GamesContext options={data}>
                <Suspense fallback={<div>Loading...</div>}>
                    <Sidebar />
                </Suspense>
                <>{children}</>
            </GamesContext>
        </div>
    )

}