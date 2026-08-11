import {
    Link,
    useLocation,
    useNavigate
} from "react-router-dom";

import "../styles/Sidebar.css";

function Sidebar() {

    const location = useLocation();
    const navigate = useNavigate();


    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/", {
            replace: true
        });
    };


    return (

        <aside className="sidebar">

            <div className="logo">
                💰 Expense Tracker
            </div>


            <nav className="sidebar-nav">

                <Link
                    to="/dashboard"
                    className={
                        location.pathname === "/dashboard"
                            ? "active"
                            : ""
                    }
                >
                    Dashboard
                </Link>


                <Link
                    to="/expenses"
                    className={
                        location.pathname === "/expenses"
                            ? "active"
                            : ""
                    }
                >
                    Expenses
                </Link>


                <Link
                    to="/budget"
                    className={
                        location.pathname === "/budget"
                            ? "active"
                            : ""
                    }
                >
                    Budget
                </Link>


                <Link
                    to="/profile"
                    className={
                        location.pathname === "/profile"
                            ? "active"
                            : ""
                    }
                >
                    Profile
                </Link>

            </nav>


            <button
                className="logout-btn"
                onClick={handleLogout}
            >
                Logout
            </button>

        </aside>
    );
}

export default Sidebar;