'use client';
import Link from 'next/link';
import styles from './header.module.css';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Search from '../search/search';
import MobileHeader from './mobile';
import { useEffect, useRef, useState } from 'react';

export default function Header() {

    const pathname = usePathname();
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as Node;

            const clickedMenu = menuRef.current?.contains(target);
            const clickedButton = buttonRef.current?.contains(target);

            if (!clickedMenu && !clickedButton) {
                setOpen(false);
            }

        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <header className={styles.header}>

                <div className={styles.title}>
                    <Image src="/icons/logo.svg" alt="Logo" width={32} height={32} className={styles.logo} />
                    <h1>
                        <Link href="/"><span>YNX</span>Games</Link>
                    </h1>
                </div>

                <Search />

                <nav>
                    <Link href="/search" className={`${styles.mobile} ${pathname === '/search' ? styles.active : ''}`}>Search</Link>
                    <Link href="/" className={pathname === '/' ? styles.active : ''}>Home</Link>
                    <Link href="/games" className={pathname === '/games' ? styles.active : ''}>Games</Link>
                    <Link href="/explore" className={pathname === '/explore' ? styles.active : ''}>Explore</Link>
                    <Link href="/faq" className={pathname === '/faq' ? styles.active : ''}>FAQ</Link>
                    <Link href="/deep_search" className={pathname === '/deep_search' ? styles.active : ''}>
                        <button>Deep Search</button>
                    </Link>
                </nav>


                <MobileHeader open={open} setOpen={setOpen} buttonRef={buttonRef} />


            </header>

            {open && (
                <div className={styles.mobileOptions} ref={menuRef}>
                    <ul>
                        <li className={pathname === '/search' ? styles.mobile_active : ''} ><Link href="/search" onClick={() => setOpen(false)}>Search</Link></li>
                        <li className={pathname === '/' ? styles.mobile_active : ''}><Link href="/" onClick={() => setOpen(false)}>Home</Link></li>
                        <li className={pathname === '/games' ? styles.mobile_active : ''}><Link href="/games" onClick={() => setOpen(false)}>Games</Link></li>
                        <li className={pathname === '/explore' ? styles.mobile_active : ''}><Link href="/explore" onClick={() => setOpen(false)}>Explore</Link></li>
                        <li className={pathname === '/faq' ? styles.mobile_active : ''}><Link href="/faq" onClick={() => setOpen(false)}>FAQ</Link></li>
                        <li className={pathname === '/deep_search' ? styles.mobile_active : ''}><Link href="/deep_search" onClick={() => setOpen(false)}>Deep Search</Link></li>
                    </ul>
                </div>
            )}

        </>
    )

}