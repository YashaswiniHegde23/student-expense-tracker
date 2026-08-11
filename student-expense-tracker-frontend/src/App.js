import "./styles/App.css";

import {
    Routes,
    Route
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ExpenseList from "./pages/ExpenseList";
import AddExpense from "./pages/AddExpense";
import EditExpense from "./pages/EditExpense";
import Budget from "./pages/Budget";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";


function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/expenses"
                element={
                    <ProtectedRoute>
                        <ExpenseList />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/add-expense"
                element={
                    <ProtectedRoute>
                        <AddExpense />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/edit-expense/:id"
                element={
                    <ProtectedRoute>
                        <EditExpense />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/budget"
                element={
                    <ProtectedRoute>
                        <Budget />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />

        </Routes>
    );
}

export default App;