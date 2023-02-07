import { createSlice } from "@reduxjs/toolkit";
import { secretNameOfSession } from "../utils/allOther";
import moment from "moment";

const initialState = {
	userLoggedInState: false,
	userData: {},
	swapToDashboard: false,
	notifications: [],
	showUserLoggedOutNotification: false,
	lodgementAmountEntered: "",
	flendersProjectsData: [],
};

export const generalStoreSlice = createSlice({
	name: "generalStore", // <--- this is just a name, not that relevant
	initialState, //  <---  can be MANY values, not just one
	reducers: {
		// checks is user logged in, if so, sets state to sessionStorage
		// this triggers on every Route change (part of RoutesMonitorGlobal component)
		checkIfUserIsLoggedIn: (state) => {
			let data = sessionStorage.getItem(secretNameOfSession);
			// console.log("checkIfUserIsLoggedInTriggered, here is data", data);

			if (!data || data === null) {
				state.userLoggedInState = false;
				return;
			}

			state.userLoggedInState = true;
			state.userData = JSON.parse(data);
		},
		changeUserLoggedInStateToFalseAndRemoveUserData: (state, action) => {
			// console.log("changeUserLoggedInState triggered, set to FALSE");
			// console.log("action payload", action.payload);
			//
			state.userLoggedInState = false;
			state.userData = {};
			state.notifications = [];
			sessionStorage.clear();

			if (action.payload.showLogOutNotification) {
				state.showUserLoggedOutNotification = true;
			}
		},
		swapMarketPlaceAndDashboard: (state, action) => {
			if (action.payload === "dashboard") {
				state.swapToDashboard = true;
				return;
			}

			state.swapToDashboard = false;
		},
		addToNotifications: (state, action) => {
			// payload should be STRING: like 'logged in';
			// How do they work: EveryTime I redirect to Dashboard, if there is a new notification it pops up
			const obj = {
				id: Math.random(),
				time: moment().calendar(),
				action: action.payload,
			};
			state.notifications.unshift(obj);

			sessionStorage.setItem(
				"userNotifications",
				JSON.stringify(state.notifications)
			);
		},
		setUserLoggedOutNotificationToFalse: (state) => {
			state.showUserLoggedOutNotification = false;
		},
		changeLodgementAmountEntered: (state, action) => {
			// payload here is a Number
			state.lodgementAmountEntered = action.payload;
		},
		extractUserNotificationFromSessionStorage: (state) => {
			// there is no need to update notifications ALL the time, only if notificationsSTATe is empty
			if (state.notifications > 0) {
				return;
			}

			if (state.notifications.length === 0) {
				let data = sessionStorage.getItem("userNotifications");
				// console.log("this is user notifications", data);

				if (!data) {
					return;
				}
				state.notifications = JSON.parse(data);
			}
		},
		tokenNotValid_LogoutUser_ClearAllSessionData: (state) => {
			sessionStorage.clear();
			window.location.pathname = "/login";
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	checkIfUserIsLoggedIn,
	changeUserLoggedInStateToFalseAndRemoveUserData,
	swapMarketPlaceAndDashboard,
	addToNotifications,
	setUserLoggedOutNotificationToFalse,
	changeLodgementAmountEntered,
	extractUserNotificationFromSessionStorage,
	tokenNotValid_LogoutUser_ClearAllSessionData,
} = generalStoreSlice.actions; // here we export our ACTIONS

export default generalStoreSlice.reducer; // this export is needed to import into the MAIN storeConfig file
