import axios from "axios";

export const api = axios.create({
	baseURL: "https://gorest.co.in/public/v1/",
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});
