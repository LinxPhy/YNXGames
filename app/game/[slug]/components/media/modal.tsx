import Image from 'next/image'
import styles from './media.module.css'
import { useEffect } from 'react';
import Carousel from '@/app/components/carousel/carousel';

export default function Modal({ data, media, type, modal, setModal }: { data: any; media: any; type: string; modal: boolean; setModal: (modal: boolean) => void }) {

    const orderedMedia = [
        ...data.slice(media),
        ...data.slice(0, media),
    ]

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") {
                setModal(false);
            }
        }

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [setModal]);

    useEffect(() => {
        if (modal) {
            const prev = document.body.style.overflowY;
            document.body.style.overflowY = 'hidden';

            return () => {
                document.body.style.overflowY = prev;
            };
        }
    }, [modal]);

    return (
        <>
            <div className={styles.overlay} onClick={() => setModal(false)}></div>
            <div className={styles.modal}>
                <Carousel>
                    <div className={styles.modalItems}>
                        {orderedMedia && orderedMedia.map((media: any, index: number) => (
                            <div key={index} className={styles.modalContent}>
                                {type === 'screenshot' ? (

                                    <Image
                                        src={media.url}
                                        width={media.width || 300}
                                        height={media.height || 300}
                                        alt="media"
                                    />


                                ) : (

                                    <iframe
                                        src={media.video_id}
                                        frameBorder="0"
                                        allow="autoplay; encrypted-media"
                                        allowFullScreen
                                        // onLoad={() => {}} add an onLoad event handler if needed
                                    ></iframe>

                                )}
                            </div>
                        ))}
                    </div>
                </Carousel>
            </div>
        </>
    )

}