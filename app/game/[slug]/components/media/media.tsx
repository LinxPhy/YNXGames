import Image from 'next/image'
import styles from './media.module.css'

export default function Media({ data }: { data: any }) {

    const { videos, screenshots } = data

    return (
        <div className={styles.media}>
            {/* {videos && videos.map((video: Video) => (
                <div key={video.id} className={styles.video}>
                    <iframe src={video.url} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            ))} */}
            {screenshots && screenshots.map((screenshot: Screenshot) => (
                <div key={screenshot.id} className={styles.screenshot}>
                    <Image src={screenshot.url} width={screenshot.width} height={screenshot.height} alt="Screenshot" className={styles.screenshot} />
                </div>
            ))}
        </div>
    )

}