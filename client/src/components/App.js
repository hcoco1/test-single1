import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import UsersList from "./UsersList";
import UserByID from "./UserByID";
import NavigationBar from "./NavigationBar";
import Dashboard from "./Dashboard";
import {DataProvider} from "../dataContext/DataContext";

function App() {
  return (
<DataProvider>
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />}> 
          <Route index element={<SignIn />} />
          <Route path="signup" element={<SignUp />} /> 
          <Route path="users" element={<UsersList />} />
        </Route>
        <Route path="/users/:id" element={<UserByID />} />
      </Routes>
    </div>
</DataProvider>

  );
}

export default App;

