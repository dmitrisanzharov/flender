import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

const RedirectPage = ({ redirectFromPageName, redirectToPageName, text }) => {
	return (
		<div>
			<Helmet>
				<title>
					{redirectFromPageName[0].toUpperCase() +
						redirectFromPageName.substring(1)}{" "}
					page
				</title>
			</Helmet>
			<h1>{text}</h1>
			<h2>
				You are being redirected to {redirectToPageName.toLowerCase()} page
			</h2>
			<h3>spinning circle</h3>
		</div>
	);
};

export default RedirectPage;

RedirectPage.propTypes = {
	redirectFromPageName: PropTypes.string.isRequired,
	redirectToPageName: PropTypes.string,
	text: PropTypes.string.isRequired,
};

RedirectPage.defaultProps = {
	redirectToPageName: "home page",
};
