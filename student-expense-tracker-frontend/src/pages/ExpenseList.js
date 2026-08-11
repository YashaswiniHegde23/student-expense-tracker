import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/expense.css";

function ExpenseList() {

    const navigate = useNavigate();

    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");

    const [amountFilter, setAmountFilter] = useState("");
    const [amountValue, setAmountValue] = useState("");
    const [minAmount, setMinAmount] = useState("");
    const [maxAmount, setMaxAmount] = useState("");

    const [sortBy, setSortBy] = useState("date");
    const [direction, setDirection] = useState("desc");

    const [page, setPage] = useState(0);
    const [pageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    const fetchExpenses = useCallback(async () => {

        setLoading(true);

        try {

            let response;

            if (search.trim() !== "") {

                response = await api.get(
                    `/expenses/search?title=${encodeURIComponent(search)}`
                );

                setExpenses(response.data);
                setTotalPages(1);

            } else if (category !== "") {

                response = await api.get(
                    `/expenses/category/${encodeURIComponent(category)}`
                );

                setExpenses(response.data);
                setTotalPages(1);

            } else if (date !== "") {

                response = await api.get(
                    `/expenses/date/${date}`
                );

                setExpenses(response.data);
                setTotalPages(1);

            } else if (
                amountFilter === "greater" &&
                amountValue !== ""
            ) {

                response = await api.get(
                    `/expenses/amount/greater?amount=${amountValue}`
                );

                setExpenses(response.data);
                setTotalPages(1);

            } else if (
                amountFilter === "less" &&
                amountValue !== ""
            ) {

                response = await api.get(
                    `/expenses/amount/less?amount=${amountValue}`
                );

                setExpenses(response.data);
                setTotalPages(1);

            } else if (
                amountFilter === "between" &&
                minAmount !== "" &&
                maxAmount !== ""
            ) {

                response = await api.get(
                    `/expenses/amount/between?min=${minAmount}&max=${maxAmount}`
                );

                setExpenses(response.data);
                setTotalPages(1);

            } else {

                response = await api.get(
                    `/expenses/pagination?page=${page}&size=${pageSize}`
                );

                setExpenses(response.data.content);
                setTotalPages(response.data.totalPages);
            }

        } catch (error) {

            console.error(
                "Failed to fetch expenses:",
                error
            );

            setExpenses([]);
            setTotalPages(0);

        } finally {

            setLoading(false);

        }

    }, [
        search,
        category,
        date,
        amountFilter,
        amountValue,
        minAmount,
        maxAmount,
        page,
        pageSize
    ]);

    useEffect(() => {

        fetchExpenses();

    }, [fetchExpenses]);

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this expense?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await api.delete(`/expenses/${id}`);

            alert("Expense Deleted Successfully");

            fetchExpenses();

        } catch (error) {

            alert("Failed to delete expense");

        }
    };

    const handleSearch = () => {

        setPage(0);
        fetchExpenses();

    };

    const handleSort = async () => {

        setLoading(true);

        try {

            const response = await api.get(
                `/expenses/sort?sortBy=${sortBy}&direction=${direction}`
            );

            setExpenses(response.data);
            setTotalPages(1);

        } catch (error) {

            console.error(
                "Failed to sort expenses:",
                error
            );

        } finally {

            setLoading(false);

        }
    };

    const handleExport = async () => {

        try {

            const response = await api.get(
                "/expenses/export/excel",
                {
                    responseType: "blob"
                }
            );

            const url =
                window.URL.createObjectURL(
                    new Blob([response.data])
                );

            const link =
                document.createElement("a");

            link.href = url;

            link.setAttribute(
                "download",
                "expenses.xlsx"
            );

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

        } catch (error) {

            alert("Failed to export expenses");

        }
    };

    const clearFilters = async () => {

        setSearch("");
        setCategory("");
        setDate("");

        setAmountFilter("");
        setAmountValue("");
        setMinAmount("");
        setMaxAmount("");

        setSortBy("date");
        setDirection("desc");

        setPage(0);

        try {

            setLoading(true);

            const response = await api.get(
                `/expenses/pagination?page=0&size=${pageSize}`
            );

            setExpenses(response.data.content);
            setTotalPages(response.data.totalPages);

        } catch (error) {

            console.error(
                "Failed to clear filters:",
                error
            );

            setExpenses([]);
            setTotalPages(0);

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="dashboard-container">

            <Sidebar />

            <div className="dashboard-content">

                <Navbar />

                <div className="expense-header">

                    <div>

                        <h1>Expenses</h1>

                        <p>
                            Manage your expenses
                        </p>

                    </div>

                    <button
                        className="add-expense-btn"
                        onClick={() =>
                            navigate("/add-expense")
                        }
                    >
                        + Add Expense
                    </button>

                </div>


                {/* FILTER SECTION */}

                <div className="expense-search">

                    <div className="filter-row">

                        <input
                            type="text"
                            placeholder="Search expenses..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                        <select
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value)
                            }
                        >

                            <option value="">
                                All Categories
                            </option>

                            <option value="Food">
                                Food
                            </option>

                            <option value="Travel">
                                Travel
                            </option>

                            <option value="Education">
                                Education
                            </option>

                            <option value="Shopping">
                                Shopping
                            </option>

                            <option value="Entertainment">
                                Entertainment
                            </option>

                            <option value="Other">
                                Other
                            </option>

                        </select>

                        <input
                            type="date"
                            value={date}
                            onChange={(e) =>
                                setDate(e.target.value)
                            }
                        />

                        <select
                            value={amountFilter}
                            onChange={(e) =>
                                setAmountFilter(
                                    e.target.value
                                )
                            }
                        >

                            <option value="">
                                Amount
                            </option>

                            <option value="greater">
                                Greater Than
                            </option>

                            <option value="less">
                                Less Than
                            </option>

                            <option value="between">
                                Between
                            </option>

                        </select>

                    </div>


                    {/* AMOUNT INPUTS */}

                    {amountFilter !== "" && (

                        <div className="amount-row">

                            {amountFilter === "between" ? (

                                <>

                                    <input
                                        type="number"
                                        placeholder="Min Amount"
                                        value={minAmount}
                                        onChange={(e) =>
                                            setMinAmount(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <input
                                        type="number"
                                        placeholder="Max Amount"
                                        value={maxAmount}
                                        onChange={(e) =>
                                            setMaxAmount(
                                                e.target.value
                                            )
                                        }
                                    />

                                </>

                            ) : (

                                <input
                                    type="number"
                                    placeholder="Enter Amount"
                                    value={amountValue}
                                    onChange={(e) =>
                                        setAmountValue(
                                            e.target.value
                                        )
                                    }
                                />

                            )}

                        </div>

                    )}


                    {/* FILTER BUTTONS */}

                    <div className="filter-buttons">

                        <button onClick={handleSearch}>
                            Search
                        </button>

                        <button onClick={clearFilters}>
                            Clear
                        </button>

                    </div>

                </div>


                {/* SORT + EXPORT */}

                <div className="expense-controls">

                    <select
                        value={sortBy}
                        onChange={(e) =>
                            setSortBy(e.target.value)
                        }
                    >

                        <option value="date">
                            Date
                        </option>

                        <option value="amount">
                            Amount
                        </option>

                        <option value="title">
                            Title
                        </option>

                        <option value="category">
                            Category
                        </option>

                    </select>


                    <select
                        value={direction}
                        onChange={(e) =>
                            setDirection(e.target.value)
                        }
                    >

                        <option value="desc">
                            Descending
                        </option>

                        <option value="asc">
                            Ascending
                        </option>

                    </select>


                    <button
                        onClick={handleSort}
                        className="sort-btn"
                    >
                        Sort
                    </button>


                    <button
                        onClick={handleExport}
                        className="export-btn"
                    >
                        Export Excel
                    </button>

                </div>


                {/* EXPENSE TABLE */}

                <div className="expense-list">

                    {loading ? (

                        <p className="expense-message">
                            Loading expenses...
                        </p>

                    ) : expenses.length === 0 ? (

                        <p className="expense-message">
                            No expenses found.
                        </p>

                    ) : (

                        <table className="expense-table">

                            <thead>

                            <tr>

                                <th>Title</th>

                                <th>Category</th>

                                <th>Amount</th>

                                <th>Date</th>

                                <th>Description</th>

                                <th>Action</th>

                            </tr>

                            </thead>


                            <tbody>

                            {expenses.map(
                                (expense) => (

                                    <tr
                                        key={
                                            expense.id
                                        }
                                    >

                                        <td>
                                            {
                                                expense.title
                                            }
                                        </td>

                                        <td>
                                            {
                                                expense.category
                                            }
                                        </td>

                                        <td>
                                            ₹
                                            {
                                                expense.amount
                                            }
                                        </td>

                                        <td>
                                            {
                                                expense.date
                                            }
                                        </td>

                                        <td>
                                            {
                                                expense.description ||
                                                "-"
                                            }
                                        </td>

                                        <td>

                                            <button
                                                className="edit-btn"
                                                onClick={() =>
                                                    navigate(
                                                        `/edit-expense/${expense.id}`
                                                    )
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="delete-btn"
                                                onClick={() =>
                                                    handleDelete(
                                                        expense.id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                )
                            )}

                            </tbody>

                        </table>

                    )}

                </div>


                {/* PAGINATION */}

                {totalPages > 1 && (

                    <div className="expense-pagination">

                        <button
                            disabled={page === 0}
                            onClick={() =>
                                setPage(page - 1)
                            }
                        >
                            Previous
                        </button>

                        <span>
                            Page {page + 1} of{" "}
                            {totalPages}
                        </span>

                        <button
                            disabled={
                                page >=
                                totalPages - 1
                            }
                            onClick={() =>
                                setPage(page + 1)
                            }
                        >
                            Next
                        </button>

                    </div>

                )}

            </div>

        </div>
    );
}

export default ExpenseList;