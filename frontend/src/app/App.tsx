import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import CalendarScreen from "./CalendarScreen";
import { getToday } from "./dateFunctions";

export default function App() {

  const month = getToday().substring(0, 7);
  
  return (
    <Router>
      <Switch>
        <Route path="/calendar/:month">
          <CalendarScreen />;
        </Route>
        <Redirect to={{pathname: "/calendar/" + month}}/>
      </Switch>
    </Router>
  );
}
