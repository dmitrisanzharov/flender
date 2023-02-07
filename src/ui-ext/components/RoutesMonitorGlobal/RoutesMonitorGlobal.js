import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	swapMarketPlaceAndDashboard,
	checkIfUserIsLoggedIn,
	extractUserNotificationFromSessionStorage,
} from "../../../redux/generalStore";

const RoutesMonitorGlobal = () => {
	// redux
	const dispatch = useDispatch();
	const state = useSelector((state) => state.generalStore);

	// router
	const location = useLocation();

	// useEffects
	useEffect(() => {
		// Location monitoring
		// console.log("current location", location.pathname);

		// all monitors
		// setting userData state from sessionStorage, in case userReloads
		dispatch(checkIfUserIsLoggedIn());

		// setting userNotifications state sessionStorage, in case userReloads
		dispatch(extractUserNotificationFromSessionStorage());

		// route handling

		if (
			location.pathname === "/add-funds" ||
			location.pathname === "/withdraw"
		) {
			dispatch(swapMarketPlaceAndDashboard("dashboard"));
			return;
		}

		dispatch(swapMarketPlaceAndDashboard("marketing"));
	}, [location, dispatch]);

	useEffect(() => {}, [state]);

	return null;
};

export default RoutesMonitorGlobal;
