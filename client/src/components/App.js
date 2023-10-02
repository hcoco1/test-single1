import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import UsersList from "./UsersList";
import UserByID from "./UserByID";
import NavigationBar from "./NavigationBar";

import Dashboard from "./Dashboard";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />}> 
          
          <Route path="signup" element={<SignUp />} /> 
          <Route path="signin" element={<SignIn />} /> 
        </Route>
        
        <Route path="users" element={<UsersList />} />
        <Route path="users/:id" element={<UserByID />} />
      </Routes>
    </div>
  );
}

export default App;

