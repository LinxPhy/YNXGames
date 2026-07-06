'use client'
import Image from 'next/image'
import styles from './media.module.css'
import Carousel from '@/app/components/carousel/carousel'
import { useState } from 'react';
import Modal from './modal';

export default function Videos({ data }: { data: any }) {

    // const [playing, setPlaying]: any = useState(null);
    const [modal, setModal] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState<any>(null);
    const { videos } = data

    function getYoutubeID(url: string) {
        const regExp =
            /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]+)/;
        const match = url.match(regExp);
        return match ? match[1] : null;
    }

    return (
        <>
            <div className={styles.media}>
                <h3>Videos</h3>
                <Carousel>
                    <div className={styles.mediaItems}>
                        {videos && videos.map((video: Video, index: number) => (
                            <div key={video.video_id} className={`${styles.item} ${styles.videoItem}`}>
                                <Image
                                    src={`https://img.youtube.com/vi/${getYoutubeID(video.video_id)}/hqdefault.jpg`}
                                    onClick={() => {
                                        setSelectedMedia(index);
                                        setModal(true);
                                    }}
                                    width={400}
                                    height={400}
                                    alt="Screenshot"
                                    className={styles.screenshot}
                                />
                            </div>
                        ))}
                    </div>
                </Carousel>
            </div>
            {modal && <Modal data={videos} media={selectedMedia} type="video" modal={modal} setModal={setModal} />}
        </>
    )
}
//  {playing === video.video_id ? (
//                             <iframe
//                                 src={video.video_id}
//                                 frameBorder="0"
//                                 allow="autoplay; encrypted-media"
//                                 allowFullScreen
//                             ></iframe>
//                         ) : (
//                             <Image src={`https://img.youtube.com/vi/${getYoutubeID(video.video_id)}/hqdefault.jpg`} onClick={() => setPlaying(video.video_id)} width={300} height={300} alt="Screenshot" className={styles.screenshot} />
//                         )}