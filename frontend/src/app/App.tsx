import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import React from "react";
import { authContext } from "./hooks/authContext";
import { getToday } from "./helpers/dateFunctions";
import { IUser } from "./interfaces/interfaces";
import { getUserEndpoint } from "./services/backend";
import CalendarScreen from "./pages/CalendarScreen";
import LoginScreen from "./pages/LoginScreen";

export class App extends React.Component<{}, { user: IUser | null }> {
  setUser: (user: IUser | null) => void;
  onSignOut: () => void;

  constructor(props: {}) {
    super(props);
    this.state = {
      user: null,
    };
    this.onSignOut = () => {
      this.setState({ user: null });
    };

    this.setUser = (user: IUser | null) => {
      this.setState({ user });
    };
  }
  componentDidMount() {
    getUserEndpoint().then(this.setUser, this.onSignOut);
  }

  render() {
    const month = getToday().substring(0, 7);

    const user = this.state.user;
    const onSignOut = this.onSignOut;
    if (user) {
      return (
        <authContext.Provider value={{ user, onSignOut }}>
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
      return <LoginScreen onSignIn={this.setUser} />;
    }
  }
}
