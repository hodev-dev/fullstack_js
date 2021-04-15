import React from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../features/auth/authSlice';

const UserHome = () => {
  const dispatch = useDispatch();

  return (
    <div>
      User Home
      <button className={"w-64 h-64 bg-blue-400"} onClick={() => dispatch(logOut())}>logout</button>
    </div>
  )
}

export default UserHome
