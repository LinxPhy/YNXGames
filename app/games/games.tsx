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
        <div className={styles.container}>

            <div className={styles.categoriesHeader} onClick={() => {
                open === "category" ? setOpen("") : setOpen("category")
            }}>
                <h4>Select a category ▾</h4>
                <div className={styles.options} style={{ display: open === "category" ? "flex" : "none" }}>
                    {DefaultOptions().map((option) => (
                        <button key={option.id}>{option.name}</button>
                    ))}
                </div>
            </div>

            <div className={styles.categoriesHeader} onClick={() => {
                open === "genre" ? setOpen("") : setOpen("genre")
            }}>
                <h4>Select a genre ▾</h4>

                <div className={styles.options} style={{ display: open === "genre" ? "flex" : "none" }}>
                    {randomOptions.map((option) => (
                        <button key={option.id}>{option.name}</button>
                    ))}
                </div>
            </div>

            {/* <div className={styles.categoriesHeader}>
                <h4>Select a theme ▾</h4>
            </div> */}

        </div>
    )

}