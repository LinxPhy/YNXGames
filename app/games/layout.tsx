import Sidebar from "./sidebar"
import styles from './page.module.css'

export default async function GamesLayout({ children }: { children: React.ReactNode }) {

    const response = await fetch(
        `${process.env.SERVER_URL}/games_options`
    )

    const data = await response.json();

    return (
        <div className={styles.container}>
            <Sidebar options={data} />
            <>{children}</>
        </div>
    )

}