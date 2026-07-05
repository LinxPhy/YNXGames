import Image from 'next/image'
import styles from './media.module.css'
import { useEffect } from 'react';
import Carousel from '@/app/components/carousel/carousel';

export default function Modal({ data, media, modal, setModal }: { data: any; media: any; modal: boolean; setModal: (modal: boolean) => void }) {

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
                        {orderedMedia && orderedMedia.map((media: any) => (
                            <div key={media.id} className={styles.modalContent}>
                                <Image
                                    src={media.url}
                                    width={media.width || 300}
                                    height={media.height || 300}
                                    alt="media"
                                />
                            </div>
                        ))}
                    </div>
                </Carousel>
            </div>
        </>
    )

}