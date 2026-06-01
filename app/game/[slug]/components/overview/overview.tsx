import styles from './overview.module.css'

export default function Overview({ data }: { data: any }) {

    const { play } = data

    return (
        <>
            {play?.summary || play?.storyline ? (
                <div className={styles.overview} id="overview">
                    {play.summary && (
                        <div className={styles.summary}>
                            <h3>About this game</h3>
                            <p>{play.summary}</p>
                        </div>
                    )}

                    {play.storyline && (
                        <div className={styles.storyline}>
                            <h3>Storyline</h3>
                            <p>{play.storyline}</p>
                        </div>
                    )}
                </div>
            ): null}
        </>
    )

}
