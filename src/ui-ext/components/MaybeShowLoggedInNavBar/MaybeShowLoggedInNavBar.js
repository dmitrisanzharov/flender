import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const MaybeShowLoggedInNavBar = ({ children }) => {
	const location = useLocation();

	const [showNavBar, setShowNavBar] = useState(false);

	useEffect(() => {
		if (
			location.pathname === "/user-dashboard" ||
			location.pathname === "/add-funds" ||
			location.pathname === "/withdraw"
		) {
			setShowNavBar(true);
		} else {
			setShowNavBar(false);
		}
	}, [location]);

	return <div>{showNavBar && children}</div>;
};

export default MaybeShowLoggedInNavBar;
