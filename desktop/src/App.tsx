import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";
import Connect from "./ui/pages/Connect";
import UserHome from "./ui/pages/user/UserHome";

function App() {

  return (
    <Router>
      <Switch>
        <Route path="/" component={Connect} />
        <Route path="/userHome" component={UserHome} />
      </Switch>
    </Router>
  );
}

export default App;