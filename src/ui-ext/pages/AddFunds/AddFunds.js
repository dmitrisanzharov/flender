import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeLodgementAmountEntered } from "../../../redux/generalStore";

const AddFunds = () => {
	// redux
	const dispatch = useDispatch();
	const lodgementAmountEnteredState = useSelector(
		(state) => state.generalStore.lodgementAmountEntered
	);

	// state
	const [amountWarning, setAmountWarning] = useState(false);

	// functions

	// useEffects
	useEffect(() => {
		if (lodgementAmountEnteredState === "") {
			return;
		}

		if (lodgementAmountEnteredState < 10) {
			setAmountWarning(true);
			return;
		}

		if (lodgementAmountEnteredState > 5000) {
			setAmountWarning(true);
			return;
		}

		setAmountWarning(false);
	}, [lodgementAmountEnteredState]);

	return (
		<div className="addPadding">
			<h1>Add Funds To Your Account</h1>
			<br />
			<h3>Input Top-up Amount</h3>
			<h5> Please enter the amount you want to top-up your balance.</h5>
			<div>Amount</div>
			<input
				type="number"
				min="10"
				max="5000"
				value={lodgementAmountEnteredState}
				onChange={(e) => dispatch(changeLodgementAmountEntered(e.target.value))}
			/>
			{amountWarning && (
				<div className="warningText">
					Incorrect amount. Minimum amount is 10 and maximum amount is 5000
				</div>
			)}
			<hr />
			<button>
				<Link to="/credit-card-page">Next</Link>
			</button>
			<br />
			<br />
			<button>
				<Link to="/user-dashboard">Dashboard</Link>
			</button>
		</div>
	);
};

export default AddFunds;
