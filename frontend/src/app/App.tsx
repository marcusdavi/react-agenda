import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import CalendarScreen from "./pages/CalendarScreen";
import { getToday } from "./helpers/dateFunctions";
import { useEffect, useState } from "react";
import { getUserEndpoint } from "./services/backend";
import LoginScreen from "./pages/LoginScreen";
import { IUser } from "./interfaces/interfaces";
import { authContext } from "./contexts/authContext";

export default function App() {
  const month = getToday().substring(0, 7);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    getUserEndpoint().then(setUser, () => setUser(null));
  }, []);

  function onSignOut(){
    setUser(null);
  }

  if (user) {
    return (
      <authContext.Provider value={{user, onSignOut}}>
        <Router>
          <Switch>
            <Route path="/calendar/:month">
              <CalendarScreen />;
            </Route>
            <Redirect to={{ pathname: "/calendar/" + month }} />
          </Switch>
        </Router>
      </authContext.Provider>
    );
  } else {
    return <LoginScreen onSignIn={setUser} />;
  }
}
