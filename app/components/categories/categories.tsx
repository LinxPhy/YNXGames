'use client'
import Image from "next/image";
import styles from './categories.module.css'
import useEmblaCarousel from 'embla-carousel-react';
import Carousel from "../carousel/carousel";

export default function Categories() {

    const images = [
        { id: 1, name: "Adventure", url: "/images/adventure.jpg", slug: "adventure", advert: "Epic Fantasy Adventures" },
        { id: 2, name: "Horror", url: "/images/horror.jpg", slug: "horror", advert: "Scary Horror Experiences" },
        { id: 3, name: "Romance", url: "/images/romance.jpg", slug: "romance", advert: "Romantic Encounters" },
        { id: 4, name: "Shooting", url: "/images/shooting.jpg", slug: "shooting", advert: "Action-Packed Shootouts" },
        { id: 5, name: "Racing", url: "/images/racing.jpg", slug: "racing", advert: "Speedy Racing Adventures" },
        { id: 6, name: "Survival", url: "/images/survival.jpg", slug: "survival", advert: "Challenging Experiences" },
        // { id: 7, name: "Shooting", url: "/images/shooting.jpg", slug: "shooting", advert: "Action-Packed Shootouts" },
        // { id: 8, name: "Racing", url: "/images/racing.jpg", slug: "racing", advert: "Speedy Racing Adventures" },
        // { id: 9, name: "Survival", url: "/images/survival.jpg", slug: "survival", advert: "Challenging Experiences" },
    ]

    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        slidesToScroll: 'auto',
        containScroll: 'trimSnaps',
        loop: true
    });

    return (
        <div className={styles.container}>

            <div className={styles.categoriesHeader}>
                <h2>Explore by genre</h2>
                <span>Start by selecting a genre</span>
            </div>

            {/* <Carousel>
            </Carousel> */}

            <div ref={emblaRef} className={styles.viewport}>
                <div className={styles.categories}>
                    {images.map((image) => (
                        <div className={styles.category} key={image.id}>
                            <Image src={image.url} width={784} height={1168} alt={image.name} />
                            <div className={styles.info}>
                                <h4>{image.advert}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button onClick={() => emblaApi?.scrollPrev()}>
                Prev
            </button>

            <button onClick={() => emblaApi?.scrollNext()}>
                Next
            </button>

            {/* <div className={styles.categories}>
                {images.map((image) => (
                    <div className={styles.category} key={image.id}>
                        <Image src={image.url} width={784} height={1168} alt={image.name} />
                        <div className={styles.info}>
                            <h4>{image.advert}</h4>
                        </div>
                    </div>
                ))}
            </div> */}

        </div>
    )

}