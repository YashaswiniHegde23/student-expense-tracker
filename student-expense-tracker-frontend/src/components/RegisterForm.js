import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

function RegisterForm() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });


    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {

        e.preventDefault();


        // Check name
        if (!user.name.trim()) {

            alert("Name is required");

            return;
        }


        // Check email
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


        // Check password
        if (!user.password) {

            alert("Password is required");

            return;
        }


        // Minimum password length
        if (user.password.length < 6) {

            alert(
                "Password must be at least 6 characters"
            );

            return;
        }


        // Check confirm password
        if (!user.confirmPassword) {

            alert("Please confirm your password");

            return;
        }


        if (
            user.password !==
            user.confirmPassword
        ) {

            alert("Passwords do not match");

            return;
        }


        try {

            const response =
                await api.post(
                    "/auth/register",
                    {
                        name: user.name,
                        email: user.email,
                        password: user.password
                    }
                );


            alert(response.data);


            setUser({
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
            });


            navigate("/");


        } catch (error) {

            if (error.response) {

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

                <h2>Create Account</h2>

                <p className="subtitle">
                    Create your account to start tracking expenses.
                </p>


                <div className="input-group">

                    <label>Full Name</label>

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        value={user.name}
                        onChange={handleChange}
                    />

                </div>


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
                        placeholder="Create a password"
                        value={user.password}
                        onChange={handleChange}
                    />

                </div>


                <div className="input-group">

                    <label>Confirm Password</label>

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={user.confirmPassword}
                        onChange={handleChange}
                    />

                </div>


                <button
                    type="submit"
                    className="login-btn"
                >
                    Create Account
                </button>


                <p className="register-text">

                    Already have an account?{" "}

                    <Link to="/">
                        Sign In
                    </Link>

                </p>

            </form>

        </div>
    );
}

export default RegisterForm;