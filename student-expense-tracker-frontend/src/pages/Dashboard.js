import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";
import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";
import RecentExpenses from "../components/RecentExpenses";
import QuickActions from "../components/QuickActions";

import api from "../services/api";


function Dashboard() {

    const [dashboard, setDashboard] = useState({
        totalExpense: 0,
        expenseCount: 0
    });

    const [budget, setBudget] = useState({
        budget: 0,
        remainingBudget: 0
    });

    const [recentExpenses, setRecentExpenses] = useState([]);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const loadDashboard = async () => {

            try {

                // Get logged-in user's profile
                const profileResponse =
                    await api.get("/users/me");

                const userId =
                    profileResponse.data.id;


                // Get dashboard statistics
                const dashboardResponse =
                    await api.get(
                        `/expenses/user/${userId}/dashboard`
                    );

                setDashboard({
                    totalExpense:
                        dashboardResponse.data.totalExpense || 0,

                    expenseCount:
                        dashboardResponse.data.expenseCount || 0
                });


                // Get all expenses belonging to this user
                const expensesResponse =
                    await api.get("/expenses");


                const expenses =
                    expensesResponse.data || [];


                // Sort newest expenses first
                const sortedExpenses =
                    [...expenses].sort(
                        (a, b) =>
                            new Date(b.date) -
                            new Date(a.date)
                    );


                // Show only latest 5
                setRecentExpenses(
                    sortedExpenses.slice(0, 5)
                );


                // Get current month's budget
                const today = new Date();

                const month =
                    today.getMonth() + 1;

                const year =
                    today.getFullYear();


                try {

                    const budgetResponse =
                        await api.get(
                            `/budgets/user/${userId}/status`,
                            {
                                params: {
                                    month: month,
                                    year: year
                                }
                            }
                        );


                    setBudget({
                        budget:
                            budgetResponse.data.budget || 0,

                        remainingBudget:
                            budgetResponse.data.remainingBudget || 0
                    });


                } catch (budgetError) {

                    // No budget set for this month
                    setBudget({
                        budget: 0,
                        remainingBudget: 0
                    });
                }


            } catch (error) {

                console.error(
                    "Failed to load dashboard:",
                    error
                );

            } finally {

                setLoading(false);
            }
        };


        loadDashboard();

    }, []);


    return (

        <div className="dashboard-container">

            <Sidebar />


            <div className="dashboard-content">

                <Navbar />


                {loading ? (

                    <p className="dashboard-message">
                        Loading dashboard...
                    </p>

                ) : (

                    <>

                        <div className="summary-grid">

                            <SummaryCard
                                title="Total Budget"
                                value={`₹ ${budget.budget}`}
                            />


                            <SummaryCard
                                title="Total Expenses"
                                value={`₹ ${dashboard.totalExpense}`}
                            />


                            <SummaryCard
                                title="Remaining Budget"
                                value={`₹ ${budget.remainingBudget}`}
                            />


                            <SummaryCard
                                title="Transactions"
                                value={dashboard.expenseCount}
                            />

                        </div>


                        <RecentExpenses
                            expenses={recentExpenses}
                        />


                        <QuickActions />

                    </>

                )}

            </div>

        </div>
    );
}

export default Dashboard;