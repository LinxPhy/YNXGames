'use client'
import { useState } from "react";
import styles from "./header.module.css";
import Image from "next/image";

export default function MobileHeader({ open, setOpen, buttonRef }: { open: boolean, setOpen: any, buttonRef: any }) {

    return (
        <div className={styles.mobileHeader} ref={buttonRef} onClick={() => setOpen(!open)} >
            <Image src="/icons/hamburger.png" width={20} height={20} alt="hamburger" />
        </div>
    )

}