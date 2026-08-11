import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

function QuickActions() {

    const navigate = useNavigate();

    return (

        <div className="quick-actions">

            <button onClick={() => navigate("/add-expense")}>
                + Add Expense
            </button>

            <button onClick={() => navigate("/budget")}>
                Set Budget
            </button>

        </div>

    );
}

export default QuickActions;