import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/expense.css";

function AddExpense() {

    const navigate = useNavigate();

    const [expense, setExpense] = useState({
        title: "",
        category: "",
        amount: "",
        date: "",
        description: ""
    });

    const handleChange = (e) => {
        setExpense({
            ...expense,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post("/expenses", expense);

            alert("Expense Added Successfully");

            navigate("/expenses");

        } catch (error) {

            alert("Failed to Add Expense");

        }
    };

    return (

        <div className="dashboard-container">

            <Sidebar />

            <div className="dashboard-content">

                <Navbar />

                <form
                    className="expense-form"
                    onSubmit={handleSubmit}
                >

                    <h2>Add Expense</h2>

                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={expense.title}
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="category"
                        value={expense.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                        <option value="Education">Education</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Other">Other</option>
                    </select>

                    <input
                        type="number"
                        name="amount"
                        placeholder="Amount"
                        value={expense.amount}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="date"
                        name="date"
                        value={expense.date}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={expense.description}
                        onChange={handleChange}
                    />

                    <button type="submit">
                        Add Expense
                    </button>

                </form>

            </div>

        </div>

    );
}

export default AddExpense;