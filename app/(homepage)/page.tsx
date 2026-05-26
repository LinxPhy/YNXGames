import axios from 'axios'
import HomePage from './homepage';

export default async function Home() {

  const request = await axios.get(`${process.env.SERVER_URL}/games`);
  const data = request.data;

  return (
    <HomePage games={data.games} /> 
  );
}