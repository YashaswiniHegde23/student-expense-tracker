import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/navbar.css";

function Navbar() {

    const [profile, setProfile] = useState({
        name: "User",
        email: ""
    });


    const today =
        new Date().toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );


    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const response =
                    await api.get("/users/me");

                setProfile({
                    name: response.data.name,
                    email: response.data.email
                });

            } catch (error) {

                console.error(
                    "Failed to load user profile"
                );
            }
        };


        fetchProfile();

    }, []);


    const initial =
        profile.name
            ? profile.name
                .charAt(0)
                .toUpperCase()
            : "U";


    return (

        <div className="navbar">

            <div>

                <h2>
                    Welcome Back 👋
                </h2>

                <p>
                    {today}
                </p>

            </div>


            <div className="profile">

                <div className="profile-circle">
                    {initial}
                </div>

                <div>

                    <h4>
                        {profile.name}
                    </h4>

                    <span>
                        Student
                    </span>

                </div>

            </div>

        </div>
    );
}

export default Navbar;