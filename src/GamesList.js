import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Game from './Game';
import { getGames } from './services/fetch-utils';

// functional component
export function __GamesList({ games }) {

    // this.setState({ count: count + 1 })
  const [count, setCounter] = useState(0);

//  function called componentDidMount
  useEffect(() => {
    console.log('this happens on load');
  }, []);

  // this happens in a function called componentDidUpdate
  useEffect(() => {
    console.log('nice job updating that counter!');
  }, [count]);

  // the JSX is rendered in a function called "render" (duh)
  return <div>
    <button onClick={() => setCounter(count + 1)}>Add to count</button>
    {/* in CBC this.state.count */}
    <h2>{count}</h2>
    {
      games.map(game => <Game key={game.id} game={game}>)
    }
  </div>;
}