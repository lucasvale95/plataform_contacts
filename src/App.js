import React from 'react';
import RoutesMain from './Routes';
import AuthProvider from "./Contexts/AuthContext"

function App() {
  return (
    <>
    <AuthProvider>
      <RoutesMain />
    </AuthProvider>
    </>
  );
}

export default App;
