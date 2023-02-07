import React, { useEffect, useState, useMemo, useRef } from "react";
import "./Transactions.css";
import moment from "moment";
import { secretNameOfSession } from "../../../utils/allOther";

const Transactions = () => {
	// ALL OTHER
	const reportTemplate = useRef();

	// STATES
	const [from, setFrom] = useState(
		moment().subtract(7, "days").format("YYYY-MM-DD")
	);
	const [to, setTo] = useState(moment().format("YYYY-MM-DD"));
	const [transactionTypeState, setTransactionTypeState] =
		useState("investment");
	const [data, setData] = useState(null);
	const [warning, setWarning] = useState(false);

	// FUNCTIONS
	function handleReset() {
		setFrom(moment().subtract(7, "days").format("YYYY-MM-DD"));
		setTo(moment().format("YYYY-MM-DD"));
	}

	function handleDownload() {
		console.log(reportTemplate.current);
		window.html2pdf(reportTemplate.current).save();
	}

	function handleTransactionsFilter(filterType) {
		// set the state here
		setTransactionTypeState(filterType);

		// get user and filter by transaction type
		const userData = JSON.parse(
			sessionStorage.getItem(secretNameOfSession)
		).transactions.filter((el) => el.transactionType === filterType);
		// console.log("userData: ", userData);

		// handle filter between dates
		const fromEpoch = Date.parse(from);
		// console.log("fromEpoch: ", fromEpoch);
		const toEpoch = Date.parse(to);
		console.log("toEpoch: ", toEpoch);

		// handle error IF from > to
		if (fromEpoch > toEpoch) {
			setWarning(true);
		} else {
			setWarning(false);
		}

		// handle final filtering
		let filteredData2 = userData.filter((el) => {
			const { transactionDate } = el;
			const elEpoch = Date.parse(transactionDate);
			// console.log("elEpoch: ", elEpoch);

			const testIfFromIsSmallerThanTransactionDate = fromEpoch <= elEpoch;
			// console.log("testIfFromIsSmallerThanTransactionDate: ", testIfFromIsSmallerThanTransactionDate);

			const testIfToIsBiggerThanTransactionDate = toEpoch >= elEpoch;
			// console.log("testIfToIsBiggerThanTransactionDate: ", testIfToIsBiggerThanTransactionDate);

			return testIfFromIsSmallerThanTransactionDate &&
				testIfToIsBiggerThanTransactionDate
				? true
				: false;
		});

		//    console.log('filtered Data2', filteredData2)

		setData(filteredData2);
	}

	// useEffect(() => {
	// 	console.log(from);
	// 	console.log(moment().subtract(7, "days").format("YYYY-MM-DD"));
	// }, [from]);

	useMemo(() => {
		handleTransactionsFilter(transactionTypeState);
	}, [to, from, transactionTypeState]);

	return (
		<div className="addPadding">
			<h1>Transactions</h1>
			<button
				style={
					transactionTypeState === "investment"
						? { backgroundColor: "red" }
						: null
				}
				onClick={() => handleTransactionsFilter("investment")}
			>
				Investment
			</button>
			<button
				style={
					transactionTypeState === "lodgement"
						? { backgroundColor: "red" }
						: null
				}
				onClick={() => handleTransactionsFilter("lodgement")}
			>
				Lodgement
			</button>
			<button
				style={
					transactionTypeState === "withdrawal"
						? { backgroundColor: "red" }
						: null
				}
				onClick={() => handleTransactionsFilter("withdrawal")}
			>
				Withdrawal
			</button>

			<hr />
			<label>from</label>
			<input
				type="date"
				value={from}
				onChange={(e) => setFrom(e.target.value)}
			/>
			<br />
			<br />
			<label>to</label>
			<input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
			<span>
				{" "}
				to inlude today, select today + 1 day, since I did NOT include TIME in
				this project
			</span>

			<br />
			<br />
			<button onClick={handleReset}>reset dates</button>
			{warning && (
				<h4 className="warningText">From must be Before TO, please change</h4>
			)}
			<hr />

			<button onClick={handleDownload}>download report</button>

			<hr />

			<div ref={reportTemplate} style={{ border: "1px solid blue" }}>
				{data === null && <h3>data is null</h3>}
				{data?.length >= 1 && (
					<div>
						<h1>
							Transaction type:{" "}
							<span style={{ color: "red" }}>{transactionTypeState}</span>
						</h1>
						<h3>
							{moment(from).format("Do MMM YY")} -{" "}
							{moment(to).format("Do MMM YY")}
						</h3>
					</div>
				)}
				{data?.length === 0 ? (
					<h3>
						no transactions found between: {moment(from).format("Do MMM YY")} -{" "}
						{moment(to).format("Do MMM YY")}
					</h3>
				) : (
					data?.map((el) => {
						const {
							amountInEuro,
							transactionDate,
							transactionType,
							transactionId,
							_id,
						} = el;
						return (
							<div key={_id}>
								<hr />
								<ul>
									<li>
										<b>amountInEuro:</b>{" "}
										{amountInEuro.toLocaleString("en-GB", {
											style: "currency",
											currency: "EUR",
										})}
									</li>
									<li>
										<b>transactionDate:</b> {transactionDate.split("T")[0]}
									</li>
									<li>
										<b>transactionType:</b> {transactionType}
									</li>
									<li>
										<b>transactionId:</b> {_id}
									</li>
									{transactionType === "investment" && (
										<li>
											<b>projectInvestmentID:</b> {transactionId}
										</li>
									)}
								</ul>
							</div>
						);
					})
				)}
			</div>

			{/* end of the main div */}
		</div>
	);
};

export default Transactions;
