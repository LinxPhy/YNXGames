'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import DefaultOptions from './defaultOptions'
import styles from './page.module.css'
import { useState } from 'react'

export default function Sidebar({ options }: { options: any }) {

    const { genres, themes } = options
    const searchParams = useSearchParams();
    const router = useRouter();
    // const [open, setOpen] = useState("category")

    const search_param = searchParams.get('search_type');
    const check_categories = DefaultOptions().find((option) => option.option === search_param)?.id
    const check_genres = genres.find((option: any) => option.slug === search_param)?.id
    const check_themes = themes.find((option: any) => option.slug === search_param)?.id

    const [open, setOpen] = useState(
        check_categories ? "category" : check_genres ? "genre" : check_themes ? "theme" : "category"
    );

    function HandleSearchType(type: string) {

        const params = new URLSearchParams(searchParams.toString());
        
        params.set('search_type', type);
        router.replace(`${window.location.pathname}?${params.toString()}`);

    }


    return (
        <div className={styles.sidebar}>

            <div className={styles.categoriesHeader} onClick={() => {
                open === "category" ? setOpen("") : setOpen("category")
            }}>
                <h4>Select a category ▾</h4>
                <div className={styles.options} style={{ display: open === "category" ? "flex" : "none" }}>
                    {DefaultOptions().map((option) => (
                        <button key={option.id} className={`${option.id === check_categories ? styles.active : ""}`} onClick={(e) => {e.stopPropagation(); HandleSearchType(option.option)}}>{option.name}</button>
                    ))}
                </div>
            </div>

            <div className={styles.categoriesHeader} onClick={() => {
                open === "genre" ? setOpen("") : setOpen("genre")
            }}>
                <h4>Select a genre ▾</h4>

                <div className={styles.options} style={{ display: open === "genre" ? "flex" : "none" }}>
                    {genres.map((genre : any) => (
                        <button key={genre.id} className={`${genre.id === check_genres ? styles.active : ""}`} onClick={(e) => {e.stopPropagation(); HandleSearchType(genre.slug)}}>{genre.name}</button>
                    ))}
                </div>
            </div>

            <div className={styles.categoriesHeader} onClick={() => {
                open === "theme" ? setOpen("") : setOpen("theme")
            }}>
                <h4>Select a theme ▾</h4>

                <div className={styles.options} style={{ display: open === "theme" ? "flex" : "none" }}>
                    {themes.map((theme : any) => (
                        <button key={theme.id} className={`${theme.id === check_themes ? styles.active : ""}`} onClick={(e) => {e.stopPropagation(); HandleSearchType(theme.slug)}}>{theme.name}</button>
                    ))}
                </div>
            </div>

        </div>
    )

}