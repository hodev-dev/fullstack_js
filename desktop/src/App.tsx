import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";
import { AuthState, selectAuth } from './features/auth/authSlice';
import ProtectedRoute from './helper/ProtectedRoute';
import Connect from "./ui/pages/Connect";
import UserHome from "./ui/pages/user/UserHome";

function App() {
  const authState: AuthState = useSelector(selectAuth);
  return (
    <Router>
      <Switch>
        <Route path="/" component={Connect} exact />
        <ProtectedRoute isLoading={(authState.status === 'loading') ? true : false} isLoggedIn={authState.isLoggedIn}>
          <Route path="/user" component={UserHome} />
        </ProtectedRoute>
      </Switch>
    </Router>
  );
}

export default App;