import { useCallback, useEffect, useState } from "react";

import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import "../styles/budget.css";


function Budget() {

    const currentDate = new Date();


    const [userId, setUserId] = useState(null);


    const [month, setMonth] = useState(
        currentDate.getMonth() + 1
    );


    const [year, setYear] = useState(
        currentDate.getFullYear()
    );


    const [budgetAmount, setBudgetAmount] =
        useState("");


    const [budget, setBudget] = useState({
        budget: 0,
        totalSpent: 0,
        remainingBudget: 0,
        budgetExceeded: false
    });


    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);


    /*
     * Get logged-in user
     */
    const fetchUser = useCallback(async () => {

        try {

            const response =
                await api.get("/users/me");

            setUserId(response.data.id);

            return response.data.id;

        } catch (error) {

            console.error(
                "Failed to get user:",
                error
            );

            return null;
        }

    }, []);


    /*
     * Get budget status
     */
    const fetchBudget = useCallback(async (id) => {

        if (!id) {
            return;
        }


        setLoading(true);


        try {

            const response =
                await api.get(
                    `/budgets/user/${id}/status`,
                    {
                        params: {
                            month: month,
                            year: year
                        }
                    }
                );


            setBudget({
                budget:
                    response.data.budget || 0,

                totalSpent:
                    response.data.totalSpent || 0,

                remainingBudget:
                    response.data.remainingBudget || 0,

                budgetExceeded:
                    response.data.budgetExceeded || false
            });


            setBudgetAmount(
                response.data.budget || ""
            );


        } catch (error) {

            if (error.response?.status === 404) {

                setBudget({
                    budget: 0,
                    totalSpent: 0,
                    remainingBudget: 0,
                    budgetExceeded: false
                });

                setBudgetAmount("");

            } else {

                console.error(
                    "Failed to fetch budget:",
                    error
                );
            }

        } finally {

            setLoading(false);
        }

    }, [month, year]);


    /*
     * Load user
     */
    useEffect(() => {

        const loadUser = async () => {

            const id = await fetchUser();

            if (id) {

                await fetchBudget(id);

            } else {

                setLoading(false);
            }
        };


        loadUser();

    }, [fetchUser, fetchBudget]);


    /*
     * SAVE BUDGET
     */
    const handleSubmit = async (e) => {

        e.preventDefault();


        if (
            budgetAmount === "" ||
            Number(budgetAmount) <= 0
        ) {

            alert(
                "Please enter a valid budget amount."
            );

            return;
        }


        if (!userId) {

            alert(
                "User information not found. Please login again."
            );

            return;
        }


        setSaving(true);


        try {

            const response =
                await api.post(
                    "/budgets",
                    {
                        amount: Number(budgetAmount),
                        month: month,
                        year: year,
                        userId: userId
                    }
                );


            console.log(
                "Budget response:",
                response.data
            );


            alert(
                "Budget Saved Successfully"
            );


            /*
             * Immediately reload the budget
             */
            await fetchBudget(userId);


        } catch (error) {

            console.error(
                "BUDGET SAVE ERROR:",
                error
            );


            if (error.response) {

                console.error(
                    "Status:",
                    error.response.status
                );

                console.error(
                    "Data:",
                    error.response.data
                );


                if (
                    typeof error.response.data ===
                    "string"
                ) {

                    alert(
                        error.response.data
                    );

                } else if (
                    error.response.data?.message
                ) {

                    alert(
                        error.response.data.message
                    );

                } else {

                    alert(
                        "Failed to save budget"
                    );
                }

            } else {

                alert(
                    "Unable to connect to the server."
                );
            }

        } finally {

            setSaving(false);
        }
    };


    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];


    /*
     * Calculate percentage
     */
    let percentage = 0;


    if (budget.budget > 0) {

        percentage =
            (budget.totalSpent /
                budget.budget) * 100;
    }


    percentage = Math.min(
        Math.max(percentage, 0),
        100
    );


    let status = "Not Set";


    if (budget.budget > 0) {

        if (budget.budgetExceeded) {

            status = "Exceeded";

        } else if (percentage >= 80) {

            status = "Warning";

        } else {

            status = "On Track";
        }
    }


    return (

        <div className="dashboard-container">

            <Sidebar />


            <div className="dashboard-content">

                <Navbar />


                <div className="budget-header">

                    <div>

                        <h1>
                            Budget
                        </h1>

                        <p>
                            Track and manage your monthly budget
                        </p>

                    </div>

                </div>


                {/* MONTH AND YEAR */}

                <div className="budget-selector">

                    <div>

                        <label>
                            Month
                        </label>

                        <select
                            value={month}
                            onChange={(e) =>
                                setMonth(
                                    Number(
                                        e.target.value
                                    )
                                )
                            }
                        >

                            {monthNames.map(
                                (monthName, index) => (

                                    <option
                                        key={index}
                                        value={index + 1}
                                    >
                                        {monthName}
                                    </option>

                                )
                            )}

                        </select>

                    </div>


                    <div>

                        <label>
                            Year
                        </label>

                        <select
                            value={year}
                            onChange={(e) =>
                                setYear(
                                    Number(
                                        e.target.value
                                    )
                                )
                            }
                        >

                            {Array.from(
                                { length: 7 },
                                (_, index) => new Date().getFullYear() - 2 + index
                            ).map((yearOption) => (
                                <option key={yearOption} value={yearOption}>
                                    {yearOption}
                                </option>
                            ))}

                        </select>

                    </div>

                </div>


                {/* SET BUDGET */}

                <div className="budget-card">

                    <h2>
                        Monthly Budget
                    </h2>


                    <form
                        className="budget-form"
                        onSubmit={handleSubmit}
                    >

                        <input
                            type="number"
                            min="1"
                            step="0.01"
                            placeholder="Enter budget amount"
                            value={budgetAmount}
                            onChange={(e) =>
                                setBudgetAmount(
                                    e.target.value
                                )
                            }
                        />


                        <button
                            type="submit"
                            disabled={saving}
                        >

                            {saving
                                ? "Saving..."
                                : "Save Budget"}

                        </button>

                    </form>

                </div>


                {/* SUMMARY */}

                {loading ? (

                    <div className="budget-card">

                        <p className="budget-message">
                            Loading budget...
                        </p>

                    </div>

                ) : (

                    <>

                        <div className="budget-summary">

                            <div className="budget-stat">

                                <span>
                                    Monthly Budget
                                </span>

                                <strong>
                                    ₹
                                    {Number(
                                        budget.budget
                                    ).toFixed(2)}
                                </strong>

                            </div>


                            <div className="budget-stat">

                                <span>
                                    Total Spent
                                </span>

                                <strong>
                                    ₹
                                    {Number(
                                        budget.totalSpent
                                    ).toFixed(2)}
                                </strong>

                            </div>


                            <div className="budget-stat">

                                <span>
                                    Remaining
                                </span>

                                <strong
                                    className={
                                        budget.remainingBudget < 0
                                            ? "negative"
                                            : ""
                                    }
                                >
                                    ₹
                                    {Number(
                                        budget.remainingBudget
                                    ).toFixed(2)}
                                </strong>

                            </div>


                            <div className="budget-stat">

                                <span>
                                    Status
                                </span>

                                <strong
                                    className={
                                        status === "Exceeded"
                                            ? "exceeded"
                                            : status === "Warning"
                                                ? "warning"
                                                : status === "On Track"
                                                    ? "on-track"
                                                    : "not-set"
                                    }
                                >
                                    {status}
                                </strong>

                            </div>

                        </div>


                        {/* PROGRESS */}

                        <div className="budget-card">

                            <div className="progress-header">

                                <h2>
                                    Budget Usage
                                </h2>

                                <span>
                                    {percentage.toFixed(1)}%
                                </span>

                            </div>


                            <div className="progress-bar">

                                <div
                                    className={
                                        status === "Exceeded"
                                            ? "progress-fill exceeded"
                                            : status === "Warning"
                                                ? "progress-fill warning"
                                                : "progress-fill"
                                    }
                                    style={{
                                        width:
                                            `${percentage}%`
                                    }}
                                />

                            </div>


                            <p className="budget-description">

                                {status === "Not Set"
                                    ? "Set a budget to start tracking your spending."
                                    : status === "Exceeded"
                                        ? "You have exceeded your monthly budget."
                                        : status === "Warning"
                                            ? "You are approaching your monthly budget limit."
                                            : "You are within your monthly budget."}

                            </p>

                        </div>

                    </>

                )}

            </div>

        </div>
    );
}

export default Budget;