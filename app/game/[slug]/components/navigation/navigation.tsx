import styles from './navigation.module.css';

export default function Navigation() {

    return (
        <div className={styles.navigation}>
            <ul >
                <li>Overview</li>
                <li>Details</li>
                <li>Ratings</li>
                <li>Websites</li>
                <li>Recommendations</li>
            </ul>
        </div>
    )

}