import React, { useEffect, useState } from "react";
import "./LoggedInNavBar.css";
import FlenderLogo from "../FlenderLogo/FlenderLogo";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeUserLoggedInStateToFalseAndRemoveUserData } from "../../../redux/generalStore";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import calcAvailableBalance from "../../../helper/calAvailableBalance";

const LoggedInNavBar = () => {
	// redux
	const dispatch = useDispatch();

	const showDashboard = useSelector(
		(state) => state.generalStore.swapToDashboard
	);

	const showNotifications = useSelector(
		(state) => state.generalStore.notifications
	);

	const userData = useSelector((state) => state.generalStore.userData);

	// states
	const [showSideNotificationBarAll, setShowSideNotificationBarAll] =
		useState(false);
	const [displayMiniNotification, setDisplayMiniNotification] = useState(false);

	// react router
	const navigate = useNavigate();
	// functions

	function handleChangeshowSideNotificationBarAll() {
		setShowSideNotificationBarAll(!showSideNotificationBarAll);
	}

	function handleSignOut() {
		dispatch(
			changeUserLoggedInStateToFalseAndRemoveUserData({
				time: moment().calendar(),
				action: "logged out success",
			})
		);
		navigate("/");
	}

	// useEffects

	useEffect(() => {
		// console.log("showSideNotificationBarAll", showSideNotificationBarAll);
	});

	useEffect(() => {
		setDisplayMiniNotification(true);
	}, [showNotifications]);

	useEffect(() => {
		const timeOut = setTimeout(() => {
			setDisplayMiniNotification(false);
		}, 2000);
		return () => clearTimeout(timeOut);
	}, [displayMiniNotification]);

	return (
		<div className="LoggedInNavBarContainer">
			<FlenderLogo />

			<div className="LoggedInNavBarContainer_NavItems ">
				{showDashboard ? (
					<div className="LoggedInNavBarContainer_NavItems_SingleItem">
						<Link to="/user-dashboard">Dashboard</Link>
					</div>
				) : (
					<div className="LoggedInNavBarContainer_NavItems_SingleItem">
						<Link to="/marketplace">Marketplace</Link>
					</div>
				)}

				<div className="LoggedInNavBarContainer_NavItems_SingleItem">
					My Investments
				</div>
				<div className="LoggedInNavBarContainer_NavItems_SingleItem">
					AutoFlend
				</div>
				<div className="LoggedInNavBarContainer_NavItems_SingleItem">
					Reports
				</div>
			</div>

			<div className="LoggedInNavBarContainer_NavRightBox">
				<div
					className="LoggedInNavBarContainer_NavRightBox_AvailableBalance dbb"
					tabIndex="1"
				>
					Available balance <br />{" "}
					{userData._id &&
						calcAvailableBalance(
							userData.totalDeposits,
							userData.totalWithdrawals,
							userData.totalInvestments
						)}{" "}
					<i className="bi bi-caret-down"></i>
				</div>
				<div className="LoggedInNavBarContainer_NavRightBox_AvailableBalance_DropDown">
					<ul>
						<li>
							<Link to="/add-funds">+ Add Funds</Link>
						</li>
						<li>
							<Link to="/withdraw">Withdraw</Link>
						</li>
					</ul>
				</div>
				<div className="LoggedInNavBarContainer_NavRightBox_NotificationsBox drr">
					<i
						className="bi bi-bell-fill"
						onClick={handleChangeshowSideNotificationBarAll}
					></i>
					{showSideNotificationBarAll && (
						<div className="LoggedInNavBarContainer_NavRightBox_NotificationsBox_SideNotificationsBarAll">
							<div className="LoggedInNavBarContainer_NavRightBox_NotificationsBox_SideNotificationsBarAll_ButtonHolder">
								<button onClick={handleChangeshowSideNotificationBarAll}>
									x
								</button>
							</div>

							<ul className="LoggedInNavBarContainer_NavRightBox_NotificationsBox_SideNotificationsBarAll_NotificationsBox">
								{showNotifications &&
									showNotifications.map((el, i) => {
										return (
											<li
												key={
													new Date().getTime().toString() + el.id + el.action
												}
											>
												<div>Time: {el.time}, </div>
												<div>Action: {el.action}</div>
												<div>id: {el.id}</div>
												<hr />
											</li>
										);
									})}
							</ul>
						</div>
					)}
				</div>

				{displayMiniNotification && showNotifications?.length > 0 && (
					<div className="LoggedInNavBarContainer_NavRightBox_NotificationsBox_SideNotificationsBarAll_MiniNotificationBox">
						{showNotifications?.length > 0 && (
							<div>
								<b>Time: {showNotifications[0].time}</b>
								<br />
								<b>Action: {showNotifications[0].action}</b>
							</div>
						)}
					</div>
				)}

				<div
					className="LoggedInNavBarContainer_NavRightBox_UserNameBox drr"
					tabIndex="0"
				>
					{userData._id && (
						<>
							<span>{userData.fName[0]}</span>
							<span>{userData.sName[0]}</span>
						</>
					)}

					<i className="bi bi-caret-down"></i>
					<div className="LoggedInNavBarContainer_NavRightBox_UserNameBox_SettingsBox dbb">
						<ul>
							<li>
								<Link to="/settings">Settings</Link>
							</li>
							<li>
								<button onClick={handleSignOut}>SignOut</button>
							</li>
						</ul>
					</div>
				</div>

				{/* end of LoggedInNavBarContainer_NavRightBox */}
			</div>
		</div>
	);
};

export default LoggedInNavBar;
