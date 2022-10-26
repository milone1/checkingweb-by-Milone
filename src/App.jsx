import React from "react";
import { UserProvider } from "./context/UserContext.jsx";
import Router  from "./router/index.js";

function App() {
  return (
    <UserProvider>
      <div>
        <Router />
      </div>
    </UserProvider>
      // <ResponsiveAppBar />
  );
}

export default App;
