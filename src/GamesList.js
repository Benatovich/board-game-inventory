import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getGames } from './services/fetch-utils';

// // functional component
// export function __GamesList({ games }) {

//     // this.setState({ count: count + 1 })
//   const [count, setCounter] = useState(0);

// //  function called componentDidMount
//   useEffect(() => {
//     console.log('this happens on load');
//   }, []);

//   // this happens in a function called componentDidUpdate
//   useEffect(() => {
//     console.log('nice job updating that counter!');
//   }, [count]);

//   // the JSX is rendered in a function called "render" (duh)
//   return <div>
//     <button onClick={() => setCounter(count + 1)}>Add to count</button>
//     {/* in CBC this.state.count */}
//     <h2>{count}</h2>
//     {
//       games.map(game => <Link key={game.id + game.title} to={`/board-games/${game.id}`}>
//         <div className='game'>
//           <h3>{game.title}</h3>
//           <p>A {game.genre} game</p> 
//           <p>Designed by {game.designer}</p>
//           <p>For {game.min_players} - {game.max_players} players</p>
//         </div>
//       </Link>)
//     }
//   </div>;
// }

export default class GamesList extends Component {
  constructor() {
    super();

    this.state = {
      count: 0,
      __stateGames: []
    };
  }


  async componentDidMount() {
    console.log('thank you for loading this component. this function will be called once and only once, when the component did mount (duh)');
    const games = await getGames();

    console.log(games);
    this.setState({ __stateGames: games });
  }

//   this is how you watch for a state change in oldschool react
  async componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.counter) {
      console.log('good job updating. nailed it, king.');
    }
  }

  render() {
    const { games } = this.props;
    const { count } = this.state;

    return <div>
      {/* we need a way to set state
        how does it know to set the count?
        what if we had more than one piece of state? oh shit that's nuts */}
      <button onClick={() => this.setState({ count: count + 1 })}>Add to Count</button>
      {/* in CBC this.state.count
      we need a way to get access to state */}
      <h2>{count}</h2>
      {
        //   games is a prop. we need a way to get access to props
        games.map(game => <Link key={game.id + game.title} to={`/board-games/${game.id}`}>
          <div className='game'>
            <h3>{game.title}</h3>
            <p>A {game.genre} game</p> 
            <p>Designed by {game.designer}</p>
            <p>For {game.min_players} - {game.max_players} players</p>
          </div>
        </Link>)
      }
    </div>;
  }
}