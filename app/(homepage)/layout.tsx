import Sidebar from "../components/sidebar/sidebar";
import axios from "axios";

export default async function HomeLayout({ children }: { children: React.ReactNode }) {

    const request = await axios.get(`${process.env.SERVER_URL}/filters`);
    const data = request.data;
    const { genres, platforms, companies, themes, modes } = data.filters;

    return (
        <>
            <Sidebar genres={genres} platforms={platforms} companies={companies} themes={themes} modes={modes} />
            {children}
        </>
    )

}