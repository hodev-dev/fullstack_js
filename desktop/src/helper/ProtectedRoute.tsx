import React from 'react'
import { Redirect } from 'react-router-dom'
import IF, { ELSE, THEN } from './IF'
import SWITCH, { CASE, DEFAULT } from './Switch'

interface Iprops {
  children: any,
  isLoading: boolean,
  isLoggedIn: boolean
}

const ProtectedRoute = (props: Iprops) => {
  const { isLoggedIn, isLoading, children } = props;

  return (
    <>
      <SWITCH variable={isLoading}>
        <CASE check={true}>
          <div className={"flex flex-col items-center justify-center w-full h-screen text-6xl text-white bg-dark-300"}>
            <h1>loading</h1>
          </div>
        </CASE>
        <DEFAULT>
          <IF variable={isLoggedIn} logic={"==="} check={true}>
            <THEN>
              {children}
            </THEN>
            <ELSE>
              <Redirect to={'/'} />
            </ELSE>
          </IF>
        </DEFAULT>
      </SWITCH>
    </>
  )
}

export default ProtectedRoute
