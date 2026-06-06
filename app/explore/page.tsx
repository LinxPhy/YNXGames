import axios from 'axios';
import styles from './page.module.css'
import Sidebar from '../components/sidebar/sidebar';
import Explore from './explore';

export default async function ExplorePage() {

    const request = await axios.get(`${process.env.SERVER_URL}/filters`);
    const data = request.data;

    const { genres, platforms, companies, themes, modes } = data.filters;

    return (
        <div className={styles.content}>
            <Sidebar genres={genres} platforms={platforms} companies={companies} themes={themes} modes={modes} />
            <Explore />
        </div>
    )

}