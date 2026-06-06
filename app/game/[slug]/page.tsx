import axios from "axios";
import Game from "./game";

export default async function GamePage({ params }: { params: { slug: string } }) {

    const { slug } = await params;

    const response = await fetch(
        `${process.env.SERVER_URL}/game/${slug}`,
        {
            next: {
                revalidate: 0 // cache for 1 hour
            }
        }
    );

    const game = await response.json();
    // console.log(game);

    return <Game game={game} />;

}