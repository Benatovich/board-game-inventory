import { useState, useEffect } from 'react';
import { getUser } from './services/fetch-utils';
import {
  BrowserRouter as Router,
  Switch,
  NavLink,
  Route,
  Redirect,
} from 'react-router-dom';
import AuthPage from './AuthPage';
import DetailPage from './DetailPage';
import ListPage from './ListPage';
import CreatePage from './CreatePage';

import './App.css';
import { logout } from './services/fetch-utils';

export default function App() {
  // You'll need to track the user in state
  const [user, setUser] = useState('');

  // add a useEffect to get the user and inject the user object into state on load
  useEffect(() => {
    async function fetch() {
      const user = await getUser();

      if (user) setUser(user);
    }

    fetch();
  }, []);

  async function handleLogout() {
    // call the logout function
    await logout();
    // clear the user in state
    setUser('');
  }

  return (
    <Router>
      <div className='App'>
        <header>
          {/* if there is a user in state, render out a link to the board games list, the create page, and add a button to let the user logout */}
          {
            user &&
            <div>
              <NavLink exact activeClassName='active-link' to="/board-games">Games List</NavLink>
              <NavLink exact activeClassName='active-link' to="/create">Create</NavLink>
              <a onClick={handleLogout}>Logout</a>
            </div>
          }
        </header>
        <main>
          <Switch>
            <Route exact path="/">
              {/* if there is a user, redirect to the board games list. Otherwise, render the auth page. Note that the AuthPage will need a function called setUser that can set the user state in App.js */}
              {
                user
                  ? <Redirect to="/board-games" />
                  : <AuthPage setUser={setUser}/>
              }
            </Route>
            <Route exact path="/board-games">
              {/* if there is a user, render the board games list. Otherwise, redirect to the home route/auth page */}
              {
                user
                  ? <ListPage/>
                  : <Redirect to="/" />
              }
            </Route>
            <Route exact path="/board-games/:id">
              {/* if there is a user, render the detail page. Otherwise, redirect to the home route/auth page */}
              {
                user 
                  ? <DetailPage />
                  : <Redirect to="/" />
              }
            </Route>
            <Route exact path="/create">
              {/* if there is a user, render the create page. Otherwise, redirect to the home route/auth page */}
              {
                user
                  ? <CreatePage />
                  : <Redirect to="/" />
              }
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}