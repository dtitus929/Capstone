import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LoginSignupPage from './components/LoginSignupPage'
import Main from './components/Main'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const sessionUser = useSelector(state => state.session.user);

  return (
    <>

      {!sessionUser && (
        <LoginSignupPage />

      )}

      {sessionUser && isLoaded && (
        <>
          <div id="layout-top">
            <Navigation isLoaded={isLoaded} />
          </div>
          < Switch >
            <Route path="/:listId">
              <Main />
            </Route>
          </Switch >

        </>
      )
      }


    </>
  );
}

export default App;
