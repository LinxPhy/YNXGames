import axios from 'axios';
import styles from './page.module.css'
import Sidebar from './sidebar/sidebar';
import Explore from './explore';
import { ExploreContext } from './exploreContext';
import NavBar from './navBar';
import { Suspense } from 'react';

export default async function ExplorePage() {

    const request = await axios.get(`${process.env.SERVER_URL}/filters`);
    const data = request.data;

    const { initial_year, final_year } = data.filters;

    return (
        <div className={styles.content}>
            <Suspense fallback={<div>Loading...</div>}>
                <ExploreContext min={initial_year} max={final_year}>
                    <NavBar data={data} />
                    <Explore />
                </ExploreContext>
            </Suspense>
        </div>
    )

}