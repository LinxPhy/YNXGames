import Image from 'next/image'
import styles from '@/app/(homepage)/page.module.css'

export default function Banner() {

    return (
        <div className={styles.banner}>
            <Image src="/images/banners.png" width={1920} height={1080} alt="banner" />
        </div>
    )

}