import Link from 'next/link'
import Image from 'next/image'
import styles from './footer.module.css'

export default function Footer() {

    return (
        <footer className={styles.footer}>
            <div className={styles.links}>
                <div>
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link href="/">HomePage</Link></li>
                        <li><Link href="/games">Games</Link></li>
                        <li><Link href="/explore">Explore</Link></li>
                        <li><Link href="/search">Search</Link></li>
                    </ul>
                </div>
                <div>
                    <h4>Additional Links</h4>
                    <ul>
                        <li><Link href="/contact_us">Contact Us</Link></li>
                        <li><Link href="/faq">FAQ</Link></li>
                    </ul>
                </div>
                <div>
                    <h4>Extra Content</h4>
                    <ul>
                        <li><a href='https://www.selectivedream.com/' target='_blank'>SelectiveDream</a></li>
                    </ul>
                </div>
                <div>
                    <h4>Support Us</h4>
                    <ul>
                        <li><a href='https://buymeacoffee.com/footiehangout' target='_blank' >Donate</a></li>
                    </ul>
                </div>
            </div>

            <div className={styles.copyright}>
                <p>YNXGames © 2026 - All Rights Reserved.</p>
            </div>
        </footer>
    )

}