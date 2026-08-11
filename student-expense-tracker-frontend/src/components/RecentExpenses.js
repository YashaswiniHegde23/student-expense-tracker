import "../styles/dashboard.css";

function RecentExpenses({ expenses }) {

    return (

        <div className="recent-expenses">

            <h2>
                Recent Expenses
            </h2>


            <table>

                <thead>

                <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Date</th>
                </tr>

                </thead>


                <tbody>

                {expenses.length === 0 ? (

                    <tr>

                        <td colSpan="4">
                            No expenses yet
                        </td>

                    </tr>

                ) : (

                    expenses.map((expense) => (

                        <tr key={expense.id}>

                            <td>
                                {expense.title}
                            </td>

                            <td>
                                {expense.category}
                            </td>

                            <td>
                                ₹{expense.amount}
                            </td>

                            <td>
                                {expense.date}
                            </td>

                        </tr>

                    ))

                )}

                </tbody>

            </table>

        </div>
    );
}

export default RecentExpenses;