import axios from 'axios';
import styles from './page.module.css'
import Sidebar from '../components/sidebar/sidebar';
import Explore from './explore';
import { ExploreContext } from './exploreContext';

export default async function ExplorePage() {

    const request = await axios.get(`${process.env.SERVER_URL}/filters`);
    const request2 = await axios.get(`${process.env.SERVER_URL}/popular`);

    const data = request.data;
    const popular = request2.data;

    const { genres, platforms, companies, themes, modes } = data.filters;

    return (
        <div className={styles.content}>
            <ExploreContext>
                <Sidebar genres={genres} platforms={platforms} companies={companies} themes={themes} modes={modes} />
                <Explore  />
            </ExploreContext>
        </div>
    )

}