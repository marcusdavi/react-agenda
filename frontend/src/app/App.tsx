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

export default function App() {
  const month = getToday().substring(0, 7);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    getUserEndpoint().then(setUser, () => setUser(null));
  }, []);

  if (user) {
    return (
      <Router>
        <Switch>
          <Route path="/calendar/:month">
            <CalendarScreen user={user} onSignOut={() => setUser(null)} />;
          </Route>
          <Redirect to={{ pathname: "/calendar/" + month }} />
        </Switch>
      </Router>
    );
  } else {
    return <LoginScreen onSignIn={setUser} />;
  }
}
