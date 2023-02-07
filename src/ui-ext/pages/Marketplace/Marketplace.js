import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Marketplace.css";
import getData from "../../../helper/fetchProjectData";

// redux stuff
// import { useGetAllQuery } from "../../../redux/api/flenderProjectsApi";

// redux

function Marketplace() {
	const [data, setData] = useState(null);

	useEffect(() => {
		// console.log("Marketplace mounted");

		getData()
			.then((el) => setData(el))
			.catch((err) => console.log(err));
	}, []);

	if (data === null) {
		return <h1>Loading please wait...</h1>;
	}

	return (
		<div className="addPadding MarketPlacePage">
			<h1>Marketplace</h1>
			<h3>Successful Irish businesses growing with Flender finance</h3>
			{data &&
				data.map((el) => {
					const {
						projectName,
						projectNameToDisplayOnACard,
						ribbonType,
						interestRateToDisplayOnACard,
						projectGrade,
						totalFunded,
						totalAmountAsStringNoEuroSign,
						projectDurationInMonthsJustTheNumber,
					} = el;
					return (
						<div key={projectName} style={{ width: "fit-content" }}>
							<Link to={`/campaigns/${projectName}`}>
								<table>
									<tbody>
										<tr>
											<th>RibbonType</th>
											<td>{ribbonType}</td>
										</tr>
										<tr>
											<th>Name</th>
											<td>{projectNameToDisplayOnACard}</td>
										</tr>
										<tr>
											<th>Interest Offered</th>
											<td>{interestRateToDisplayOnACard}%</td>
										</tr>
										<tr>
											<th>Loan Grade</th>
											<td>{projectGrade}</td>
										</tr>
										<tr>
											<th>Percentage Funded</th>
											<td>
												{(totalFunded / totalAmountAsStringNoEuroSign).toFixed(
													2
												) * 100}
												%
											</td>
										</tr>
										<tr>
											<th>Goal</th>
											<td>
												{totalAmountAsStringNoEuroSign.toLocaleString("en-GB", {
													style: "currency",
													currency: "EUR",
												})}
											</td>
										</tr>
										<tr>
											<th>Total Funded</th>
											<td>
												{totalFunded.toLocaleString("en-GB", {
													style: "currency",
													currency: "EUR",
												})}
											</td>
										</tr>
										<tr>
											<th>Available for investment</th>
											<td>
												{(
													totalAmountAsStringNoEuroSign - totalFunded
												).toLocaleString("en-GB", {
													style: "currency",
													currency: "EUR",
												})}
											</td>
										</tr>
										<tr>
											<th>Duration in months</th>
											<td>{projectDurationInMonthsJustTheNumber}</td>
										</tr>
									</tbody>
								</table>
							</Link>
						</div>
					);
				})}
		</div>
	);
}

export default Marketplace;
