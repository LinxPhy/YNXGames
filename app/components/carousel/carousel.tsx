'use client'
import { useMediaQuery } from 'usehooks-ts';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useState } from 'react';
import styles from './carousel.module.css'

export default function Carousel(
    { children }:
        { children: React.ReactNode }
) {

    const isDesktop = useMediaQuery('(width < 768px)');

    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        slidesToScroll: 'auto',
        containScroll: 'trimSnaps',
        loop: true,
        active: isDesktop,
    });

    useEffect(() => {
        if (!emblaApi) return;

        const updateButtons = () => {
            setCanScrollPrev(emblaApi.canScrollPrev());
            setCanScrollNext(emblaApi.canScrollNext());
        };

        updateButtons();

        emblaApi.on('select', updateButtons);
        emblaApi.on('reInit', updateButtons);

        return () => {
            emblaApi.off('select', updateButtons);
            emblaApi.off('reInit', updateButtons);
        };
    }, [emblaApi]);

    return (
        <div ref={emblaRef} className={styles.viewport}>
            {children}

            {canScrollPrev && (
                <div className={`${styles.navigation} ${styles.left}`} onClick={() => emblaApi?.scrollPrev()}>
                    <p>◀</p>
                </div>
            )}

            {canScrollNext && (
                <div className={`${styles.navigation} ${styles.right}`} onClick={() => emblaApi?.scrollNext()}>
                    <p>▶</p>
                </div>
            )}
        </div>
    )

}