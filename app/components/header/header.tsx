'use client';
import Link from 'next/link';
import styles from './header.module.css';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Header() {

    const pathname = usePathname();

    return (
        <header className={styles.header}>

            <div className={styles.title}>
                <Image src="/icons/logo.svg" alt="Logo" width={32} height={32} className={styles.logo} />
                <h1>
                    <Link href="/"><span>YNX</span>Games</Link>
                </h1>
            </div>

            <div className={styles.searchContainer}>
                <div className={styles.searchWrapper}>
                    <input type="search" placeholder="Search for games in our database" className={styles.search} />
                    <button className={styles.searchButton}>Search</button>
                </div>
            </div>

            <nav>
                <Link href="/" className={pathname === '/' ? styles.active : ''}>Home</Link>
                <Link href="/games" className={pathname === '/games' ? styles.active : ''}>Games</Link>
                <Link href="/discover" className={pathname === '/discover' ? styles.active : ''}>Discover</Link>
                <Link href="/faq" className={pathname === '/faq' ? styles.active : ''}>FAQ</Link>
            </nav>



        </header>
    )

}