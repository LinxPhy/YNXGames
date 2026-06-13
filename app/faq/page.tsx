import styles from './page.module.css'
import Link from 'next/link'

export default function FAQ() {

    return (
        <div className={styles.faq}>
            <h1>FAQ</h1>
            <div className={styles.content}>
                <div className={styles.section}>
                    <h3>What is YNXGames about?</h3>
                    <p>
                        YNXGames stands for Your Next Games - it is a website with the primary goal of helping you find the next game you want to play. <br />
                        We built this website because often people struggle to find something they might enjoy, our goal is to make it easy for users to find what they want and to do it as quickly as possible. <br />
                        To do so we have a website with a large database of games, which is consistently updated to keep up with the latest releases and updated with game changes.
                    </p>
                </div>

                <div className={styles.section}>
                    <h3>How do i contact YNXGames?</h3>
                    <p>
                        To contact us you can visit our <Link href="/contact_us">Contact Us</Link> page.
                        Feel free to reach out to us if you have any questions or concerns.
                    </p>
                </div>

                <div className={styles.section}>
                    <h3>I think there might be an error with some of the content?</h3>
                    <p>
                        YNXGames makes use of external source for its data. If an error is encountered, it could be due to the data collected from these sources. <br />
                        If that is the case, we may not be able to sort out the issue however we will do our best to fix it where possible. <br />
                        If you think there is an error with the data, you can contact us and we will look into it as soon as possible.
                    </p>
                </div>

                <div className={styles.section}>
                    <h3>When is the data updated/loaded</h3>
                    <p>
                        The data is updated every 24 hours.
                    </p>
                </div>

                <div className={styles.section}>
                    <h3>What is a deep search?</h3>
                    <p>
                        Deep search uses a search algorithm to find the best games that match your search query using AI.
                    </p>
                </div>

                <div className={styles.section}>
                    <h3>I am unable to find the game I am looking for</h3>
                    <p>
                        If you are unable to find the game you are looking for in our database, we suggest using deep search to find the game. <br />
                        Once the game is found, you may search for the game recommendations to find similar games.
                    </p>
                </div>
            </div>
        </div>
    )
}