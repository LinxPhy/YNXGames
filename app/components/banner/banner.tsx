'use client'
import Image from 'next/image'
import styles from '@/app/(homepage)/page.module.css'
import { useRouter } from 'next/navigation'

export default function Banner() {

    const router = useRouter()

    return (
        <div className={styles.banner} onClick={() => router.push('/deep_search')}>
            <Image src="/images/banners.png" width={1920} height={1080} alt="banner" />
        </div>
    )

}