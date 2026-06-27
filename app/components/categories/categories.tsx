'use client'
import Image from "next/image";
import styles from './categories.module.css'
import Carousel from "../carousel/carousel";
import Link from "next/link";

export default function Categories({ data }: { data: any }) {


    return (
        <div className={styles.container}>

            <div className={styles.categoriesHeader}>
                <h2>Explore by genre</h2>
            </div>

            <Carousel>
                <div className={styles.categories} >
                    {data.map((image: any) => (
                        <Link href={`/games/?search_type=${image.slug}`}
                            className={styles.category}
                            key={image.id}
                        >
                            <Image src={image.url} width={784} height={1168} alt={image.name} />
                            <div className={styles.info}>
                                <h4>{image.advert}</h4>
                            </div>
                        </Link>
                    ))}
                </div>
            </Carousel>

        </div>
    )

}