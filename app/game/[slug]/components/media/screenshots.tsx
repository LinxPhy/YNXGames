'use client'
import Image from 'next/image'
import styles from './media.module.css'
import Carousel from '@/app/components/carousel/carousel'
import { useState } from 'react';
import Modal from './modal';

export default function Screenshots({ data }: { data: any }) {

    const [modal, setModal] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState<any>(null);
    const { videos, screenshots } = data

    return (
        <>
            <div className={styles.media} id="screenshots">
                <h3>Screenshots</h3>
                <Carousel>
                    <div className={styles.mediaItems}>
                        {screenshots && screenshots.map((screenshot: Screenshot, index: number) => (
                            <div key={screenshot.id} className={`${styles.item} ${styles.screenshotItem}`}>
                                <Image
                                    src={screenshot.url}
                                    width={screenshot.width || 300}
                                    height={screenshot.height || 300}
                                    alt="Screenshot"
                                    onClick={() => {
                                        setSelectedMedia(index);
                                        setModal(true);
                                    }}
                                    className={styles.screenshot}
                                />
                            </div>
                        ))}
                    </div>
                    {screenshots && screenshots?.length === 0 && <p>No screenshots available.</p>}
                </Carousel>
            </div>
            {modal && <Modal data={screenshots} media={selectedMedia} type="screenshot" modal={modal} setModal={setModal} />}
        </>
    )

}
