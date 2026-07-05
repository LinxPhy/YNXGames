import Image from 'next/image';
import styles from './company.module.css'

export default function Company({ data }: { data: any }) {

    const { companies } = data
    const developers = companies?.filter((c: any) => c.developer);
    const publishers = companies?.filter((c: any) => c.publisher);
    const supporting = companies?.filter((c: any) => c.supporting);

    return (
        <div className={styles.company}>
            {/* <h3>Company</h3> */}

            <div className={styles.companySection}>

                <div>
                    <Image src={'/icons/developer.png'} alt={''} width={62} height={62} className={styles.companyImage} />
                    <div className={styles.companyInfo}>
                        <h4>Main Developers</h4>
                        {developers?.map((company: any) => (
                            <p key={company.slug}>{company.name}</p>
                        ))}
                    </div>
                </div>

                <div>
                    <Image src={'/icons/collaboration.png'} alt={''} width={62} height={62} className={styles.companyImage} />
                    <div className={styles.companyInfo}>
                        <h4>Supporting Developers</h4>
                        {supporting?.map((company: any) => (
                            <p key={company.slug}>{company.name}</p>
                        ))}
                    </div>
                </div>

                <div>
                    <Image src={'/icons/publisher.png'} alt={''} width={62} height={62} className={styles.companyImage} />
                    <div className={styles.companyInfo}>
                        <h4>Publishers</h4>
                        {publishers?.map((company: any) => (
                            <p key={company.slug}>{company.name}</p>
                        ))}
                    </div>
                </div>



            </div>

        </div>
    )

}