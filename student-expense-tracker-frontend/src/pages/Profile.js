import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import "../styles/profile.css";

function Profile() {

    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        name: "",
        email: ""
    });

    const [savedProfile, setSavedProfile] = useState({
        name: "",
        email: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);


    const fetchProfile = async () => {

        try {

            const response = await api.get("/users/me");

            const userData = {
                name: response.data.name,
                email: response.data.email
            };

            setProfile(userData);
            setSavedProfile(userData);

        } catch (error) {

            console.error(
                "Failed to load profile:",
                error
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        fetchProfile();

    }, []);


    const handleChange = (e) => {

        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {

        e.preventDefault();


        if (!profile.name.trim()) {

            alert("Name is required");

            return;
        }


        if (!profile.email.trim()) {

            alert("Email is required");

            return;
        }


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(profile.email)) {

            alert("Please enter a valid email address");

            return;
        }


        setSaving(true);


        try {

            const response = await api.put(
                "/users/me",
                {
                    name: profile.name,
                    email: profile.email
                }
            );


            if (response.data.token) {

                localStorage.setItem(
                    "token",
                    response.data.token
                );
            }


            const updatedProfile = {
                name: response.data.name,
                email: response.data.email
            };


            // Update the displayed profile
            // ONLY after successful save
            setSavedProfile(updatedProfile);

            // Keep input fields in sync
            setProfile(updatedProfile);


            alert("Profile Updated Successfully");


        } catch (error) {

            console.error(error);

            if (error.response) {

                if (typeof error.response.data === "string") {

                    alert(error.response.data);

                } else {

                    alert("Failed to update profile");
                }

            } else {

                alert("Unable to connect to the server.");
            }

        } finally {

            setSaving(false);
        }
    };


    if (loading) {

        return (
            <div className="dashboard-container">

                <Sidebar />

                <div className="dashboard-content">

                    <Navbar />

                    <p className="profile-message">
                        Loading profile...
                    </p>

                </div>

            </div>
        );
    }


    return (

        <div className="dashboard-container">

            <Sidebar />

            <div className="dashboard-content">

                <Navbar />

                <div className="profile-header">

                    <div>

                        <h1>Profile</h1>

                        <p>
                            Manage your account details
                        </p>

                    </div>

                </div>


                <div className="profile-card">

                    <div className="profile-avatar">

                        {savedProfile.name
                            ? savedProfile.name
                                .charAt(0)
                                .toUpperCase()
                            : "U"}

                    </div>


                    {/* This changes only after Save Changes */}

                    <h2>
                        {savedProfile.name}
                    </h2>


                    <p className="profile-email">
                        {savedProfile.email}
                    </p>


                    <form
                        className="profile-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="profile-input-group">

                            <label>
                                Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={profile.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                            />

                        </div>


                        <div className="profile-input-group">

                            <label>
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={profile.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                            />

                        </div>


                        <button
                            type="submit"
                            className="profile-save-btn"
                            disabled={saving}
                        >

                            {saving
                                ? "Saving..."
                                : "Save Changes"}

                        </button>

                    </form>


                    <button
                        className="profile-back-btn"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >
                        Back to Dashboard
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Profile;