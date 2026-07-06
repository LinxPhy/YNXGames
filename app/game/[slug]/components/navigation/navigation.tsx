'use client'
import { useState } from 'react';
import styles from './navigation.module.css';
import Link from 'next/link';

export default function Navigation() {

    const [active, setActive] = useState("top");

    return (
        <div className={styles.navigation}>
            <ul >
                <li className={active === "top" ? styles.active : ""}>
                    <Link href="#top" onClick={() => setActive("top")}>Top</Link>
                </li>
                <li className={active === "overview" ? styles.active : ""}>
                    <Link href="#overview" onClick={() => setActive("overview")}>Overview</Link>
                </li>
                <li className={active === "screenshots" ? styles.active : ""}>
                    <Link href="#screenshots" onClick={() => setActive("screenshots")}>Screenshots</Link>
                </li>
                <li className={active === "details" ? styles.active : ""}>
                    <Link href="#details" onClick={() => setActive("details")}>Details</Link>
                </li>
                <li className={active === "ratings" ? styles.active : ""}>
                    <Link href="#ratings" onClick={() => setActive("ratings")}>Ratings</Link>
                </li>
                <li className={active === "developers" ? styles.active : ""}>
                    <Link href="#developers" onClick={() => setActive("developers")}>Developers</Link>
                </li>
                <li className={active === "videos" ? styles.active : ""}>
                    <Link href="#videos" onClick={() => setActive("videos")}>Videos</Link>
                </li>
                <li className={active === "recommendations" ? styles.active : ""}>
                    <Link href="#recommendations" onClick={() => setActive("recommendations")}>Recommendations</Link>
                </li>
            </ul>
        </div>
    )

}

