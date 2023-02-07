import axios from "axios";
import { serverUrl, finlendersDB } from "../utils/serverUrls";
import { projectsFromFinlendersDB } from "../utils/routes.js";

async function getData() {
	console.log("getData helper function triggered");
	let res = await axios.get(
		serverUrl + finlendersDB + projectsFromFinlendersDB
	);
	return res.data;
}

export default getData;
