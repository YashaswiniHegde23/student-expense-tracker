import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

function LoginForm() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: ""
    });


    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {

        e.preventDefault();


        // Check empty email
        if (!user.email.trim()) {

            alert("Email is required");

            return;
        }


        // Check email format
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(user.email)) {

            alert("Please enter a valid email address");

            return;
        }


        // Check empty password
        if (!user.password) {

            alert("Password is required");

            return;
        }


        try {

            const response =
                await api.post(
                    "/auth/login",
                    user
                );


            if (
                response.data ===
                "Incorrect Password"
            ) {

                localStorage.removeItem("token");

                alert("Incorrect Password");

                return;
            }


            localStorage.setItem(
                "token",
                response.data
            );


            alert("Login Successful");

            navigate("/dashboard");


        } catch (error) {

            if (error.response) {

                localStorage.removeItem("token");

                alert(
                    error.response.data
                );

            } else {

                alert(
                    "Unable to connect to the server."
                );
            }
        }
    };


    return (

        <div className="login-card">

            <form onSubmit={handleSubmit}>

                <h2>Welcome Back</h2>

                <p className="subtitle">
                    Sign in to manage your expenses effortlessly.
                </p>


                <div className="input-group">

                    <label>Email</label>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={user.email}
                        onChange={handleChange}
                    />

                </div>


                <div className="input-group">

                    <label>Password</label>

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={user.password}
                        onChange={handleChange}
                    />

                </div>


                <button
                    type="submit"
                    className="login-btn"
                >
                    Sign In
                </button>


                <p className="register-text">

                    New here?{" "}

                    <Link to="/register">
                        Create Account
                    </Link>

                </p>

            </form>

        </div>
    );
}

export default LoginForm;