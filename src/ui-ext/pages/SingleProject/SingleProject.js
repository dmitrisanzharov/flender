import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useGetAllQuery } from "../../../redux/api/flenderProjectsApi";
import { secretNameOfSession } from "../../../utils/allOther";
import { useNavigate } from "react-router-dom";
import getData from "../../../helper/fetchProjectData";

const SingleProject = () => {
	const [data, setData] = useState(null);
	const { projectNameUrl } = useParams();
	const navigate = useNavigate();

	// console.log("projectNameUrl: ", projectNameUrl);

	// redux
	// const { isLoading, data } = useGetAllQuery();
	// console.log(data);

	// all other

	// functions
	const filteredData = useMemo(() => {
		if (!data || data.length < 1) {
			return;
		}

		return data.find((el) => el.projectName === projectNameUrl);
	}, [data, projectNameUrl]);

	function handleInvest(proj) {
		sessionStorage.setItem("investingProject", JSON.stringify(proj));
		navigate("/investing-page");
	}

	// useEffects
	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "instant",
		});

		getData()
			.then((el) => setData(el))
			.catch((err) => console.log(err));
	}, []);

	// HTML

	if (data === null) {
		return <h1>Loading please wait</h1>;
	}

	if (data.length > 0) {
		const {
			projectNameToDisplayOnACard,
			nameOfCompany,
			whyInvestInUs,
			dateCreated,
			totalAmountAsStringNoEuroSign,
			totalFunded,
			projectDurationInMonthsJustTheNumber,
			howWillWeUseYourInvestment,
			address,
			latitudeLongitudeArray,
			ourStory,
		} = filteredData;

		return (
			<div className="addPadding SingleProject">
				<h1>{projectNameToDisplayOnACard}</h1>
				<h3>by {nameOfCompany}</h3>
				{JSON.parse(sessionStorage.getItem(secretNameOfSession))?.fName && (
					<div>
						<hr />
						<button onClick={() => handleInvest(filteredData)}>
							User Logged In: Invest into this project
						</button>
					</div>
				)}
				<hr />
				<h4>Campaign information</h4>
				<table>
					<tbody>
						<tr>
							<th>Created</th>
							<td>{dateCreated.split("T")[0]}</td>
						</tr>
						<tr>
							<th>Raised</th>
							<td>
								{totalFunded.toLocaleString("en-GB", {
									style: "currency",
									currency: "EUR",
								})}{" "}
								of{" "}
								{totalAmountAsStringNoEuroSign.toLocaleString("en-GB", {
									style: "currency",
									currency: "EUR",
								})}
							</td>
						</tr>
						<tr>
							<th>Loan Term</th>
							<td>{projectDurationInMonthsJustTheNumber} Months</td>
						</tr>
						<tr>
							<th>Address</th>
							<td>{address} Months</td>
						</tr>
						<tr>
							<th>Country</th>
							<td>Ireland</td>
						</tr>
					</tbody>
				</table>

				<hr />
				<h4>Why invest with us?</h4>
				<ul>
					{whyInvestInUs &&
						whyInvestInUs.map((el, i) => {
							return <li key={i + el}>{el}</li>;
						})}
				</ul>
				<hr />
				<h4>How we will use your funds</h4>
				<ul>
					{howWillWeUseYourInvestment &&
						howWillWeUseYourInvestment.map((el, i) => {
							return <li key={el + i}>{el}</li>;
						})}
				</ul>
				<hr />
				<h4>Where we are based</h4>
				<iframe
					src={`https://maps.google.com/maps?q=${latitudeLongitudeArray[0]},${latitudeLongitudeArray[1]}&zoom=15&output=embed`}
					width="600"
					height="450"
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
					title="google map"
				></iframe>
				<hr />
				<h4>Our Story</h4>
				<ul>
					{ourStory &&
						ourStory.map((el, i) => {
							return <li key={el + i}>{el}</li>;
						})}
				</ul>

				{/* end of the main div */}
			</div>
		);
	}

	return <h1>there was an error</h1>;
};

export default SingleProject;
