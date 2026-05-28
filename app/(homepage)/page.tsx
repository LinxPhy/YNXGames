import axios from 'axios'
import HomePage from './homepage';

export default async function Home() {

  const request = await axios.get(`${process.env.SERVER_URL}/games`);
  const games = request.data;

  return (
    <HomePage games={games}/> 
  );
}