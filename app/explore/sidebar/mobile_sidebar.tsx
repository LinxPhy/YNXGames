'use client'
import { useEffect, useState } from 'react';
import styles from './mobile_sidebar.module.css'
import ModalSidebar from './modal_sidebar';

export default function MobileSideBar({ genres, platforms, companies, themes, modes, initial_year, final_year }: {
    genres: Genre[],
    platforms: Platform[],
    companies: Company[],
    themes: Theme[],
    modes: Mode[],
    initial_year: number,
    final_year: number
}) {

    const [modal, setModal] = useState(false);

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") {
                setModal(false);
            }
        }

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [setModal]);

    useEffect(() => {
        if (modal) {
            const prev = document.body.style.overflowY;
            document.body.style.overflowY = 'hidden';

            return () => {
                document.body.style.overflowY = prev;
            };
        }
    }, [modal]);


    return (
        <>
            <button className={styles.apply} onClick={() => setModal(true)}>Filters</button>
            {modal && <div className={styles.overlay} onClick={() => setModal(false)} />}
            {modal && <ModalSidebar setModal={setModal} genres={genres} platforms={platforms} companies={companies} themes={themes} modes={modes} initial_year={initial_year} final_year={final_year} />}
        </>
    )

}