import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import UsersList from "./UsersList";
import UserByID from "./UserByID";
import NavigationBar from "./NavigationBar";
import { DataProvider } from "../dataContext/DataContext";
import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute component

function App() {
  return (
    <DataProvider>
      <div className="App">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/users" element={
            <ProtectedRoute>
              <UsersList />
            </ProtectedRoute>
          } />
          <Route path="/users/:id" element={
            <ProtectedRoute>
              <UserByID />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </DataProvider>
  );
}

export default App;



