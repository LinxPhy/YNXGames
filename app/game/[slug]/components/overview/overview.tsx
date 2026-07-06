'use client'
import styles from './overview.module.css'
import { useState } from "react";

function truncate(text: string, limit: number) {
    if (text.length <= limit) return text;
    return text.slice(0, limit) + "...";
}

function ReadMore({ text, limit = 300 }: { text: string; limit?: number }) {
    const [expanded, setExpanded] = useState(false);

    const shouldTruncate = text.length > limit;
    const displayText = expanded || !shouldTruncate
        ? text
        : truncate(text, limit);

    return (
        <>
            <p>{displayText}</p>

            {shouldTruncate && (
                <span
                    className={styles.readMore}
                    onClick={() => setExpanded(prev => !prev)}
                >
                    {expanded ? "Show less" : "Show more"}
                </span>
            )}
        </>
    );
}

export default function Overview({ data }: { data: any }) {
    const { play } = data;

    return (
        <>
            {play?.summary || play?.storyline ? (
                <div className={styles.overview} id="overview">

                    {play.summary && (
                        <div className={styles.summary}>
                            <h3>About this game</h3>
                            <ReadMore text={play.summary} limit={500} />
                        </div>
                    )}

                    {play.storyline && (
                        <div className={styles.storyline}>
                            <h3>Storyline</h3>
                            <ReadMore text={play.storyline} limit={500} />
                        </div>
                    )}

                </div>
            ) : null}
        </>
    );
}