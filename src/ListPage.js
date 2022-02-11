import React, { useState, useEffect } from 'react';
import { getGames } from './services/fetch-utils';
import GamesList from './GamesList';
import Game from './Game';

export default function ListPage() {
  // you'll need some state to hold onto the array of games
  const [games, setGames] = useState([]);

  // fetch the games on load and inject them into state
  useEffect(() => {
    async function get() {
      const gotGames = await getGames();

      setGames(gotGames);
    }
    get();
  }, []);

  return (
    <div className='games'>
      {/* map through the games in state and render Game components */}
      <GamesList games={games} />
    </div>
  );
}
