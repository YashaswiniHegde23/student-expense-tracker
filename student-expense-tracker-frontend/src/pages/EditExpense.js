import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/expense.css";

function EditExpense() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [expense, setExpense] = useState({
        title: "",
        category: "",
        amount: "",
        date: "",
        description: ""
    });

    useEffect(() => {

        const fetchExpense = async () => {

            try {

                const response = await api.get(`/expenses/${id}`);

                setExpense({
                    title: response.data.title,
                    category: response.data.category,
                    amount: response.data.amount,
                    date: response.data.date,
                    description: response.data.description || ""
                });

            } catch (error) {

                alert("Failed to load expense");

                navigate("/expenses");

            }
        };

        fetchExpense();

    }, [id, navigate]);

    const handleChange = (e) => {

        setExpense({
            ...expense,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.put(`/expenses/${id}`, expense);

            alert("Expense Updated Successfully");

            navigate("/expenses");

        } catch (error) {

            alert("Failed to update expense");

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

                    <h2>Edit Expense</h2>

                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={expense.title}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={expense.category}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="amount"
                        placeholder="Amount"
                        value={expense.amount}
                        onChange={handleChange}
                    />

                    <input
                        type="date"
                        name="date"
                        value={expense.date}
                        onChange={handleChange}
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={expense.description}
                        onChange={handleChange}
                    />

                    <button type="submit">
                        Update Expense
                    </button>

                </form>

            </div>

        </div>
    );
}

export default EditExpense;