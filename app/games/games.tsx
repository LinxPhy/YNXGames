'use client'
import { useState } from 'react'
import DefaultOptions from './defaultOptions'
import styles from './page.module.css'

export default function Games() {

    const [open, setOpen] = useState("category")

    // random options
    const randomOptions = [
        { id: 10, option: "adventure", name: "Adventure" },
        { id: 11, option: "horror", name: "Horror" },
        { id: 12, option: "romance", name: "Romance" },
        { id: 13, option: "shooting", name: "Shooting" },
        { id: 14, option: "racing", name: "Racing" },
        { id: 15, option: "survival", name: "Survival" },
        { id: 16, option: "puzzle", name: "Puzzle" },
        { id: 17, option: "arcade", name: "Arcade" },
        { id: 18, option: "fighting", name: "Fighting" },
    ]


    return (
        <div className={styles.games}>

        </div>
    )

}