import { useSelector } from "react-redux";
import { Redirect, Route, useLocation } from "react-router-dom";
import { selectAuth } from "../features/auth/authSlice";

const AuthRoute = (props: any) => {
  const { component: Component, ...rest } = props;

  const authState = useSelector(selectAuth)
  const location = useLocation()

  return (
    <Route
      {...rest}
      render={props => {
        if (!authState.isUserLoggedIn) {
          return <Component {...props} />
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: location,
                },
              }}
            />
          )
        }
      }}
    />
  )
}

export default AuthRoute;