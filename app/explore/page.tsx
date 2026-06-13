import axios from 'axios';
import styles from './page.module.css'
import Sidebar from '../components/sidebar/sidebar';
import Explore from './explore';
import { ExploreContext } from './exploreContext';

export default async function ExplorePage() {

    const request = await axios.get(`${process.env.SERVER_URL}/filters`);
    const data = request.data;

    const { genres, platforms, companies, themes, modes, initial_year, final_year } = data.filters;

    return (
        <div className={styles.content}>
            <ExploreContext min={initial_year} max={final_year}>
                <Sidebar genres={genres} platforms={platforms} companies={companies} themes={themes} modes={modes} initial_year={initial_year} final_year={final_year} />
                <Explore  />
            </ExploreContext>
        </div>
    )

}