import React from 'react';
import { NativeRouter, Route } from "react-router-native";
import Connect from './ui/pages/Connect';

const App = () => {
  return (
    <NativeRouter>
      <Route exact path="/" component={Connect} />
    </NativeRouter>
  )
}

export default App
