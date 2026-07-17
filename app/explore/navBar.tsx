'use client'
import { useEffect, useState } from "react";
import Sidebar from "./sidebar/sidebar";

export default function NavBar({ data }: any) {

    const { genres, platforms, companies, themes, modes, initial_year, final_year } = data.filters;

    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setMobileSidebarOpen(false);
            } else {
                setMobileSidebarOpen(true);
            }
        };

        handleResize(); // run on load
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [setMobileSidebarOpen]);

    return (
        <>
            {mobileSidebarOpen === true ? <div></div> : (
                <Sidebar genres={genres} platforms={platforms} companies={companies} themes={themes} modes={modes} initial_year={initial_year} final_year={final_year} />
            )}

        </>
    )

}