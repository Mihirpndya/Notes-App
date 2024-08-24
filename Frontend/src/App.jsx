import "./App.css";
import "./index.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const token = localStorage.getItem("token");
				if (token) {
					const config = {
						headers: { Authorization: `Bearer ${token}` },
					};
					const response = await axios.get("/api/me", config);
					setUser(response.data);
				} else {
					setUser(null);
				}
			} catch (error) {
				console.error(error);
				localStorage.removeItem("token");
				setUser(null);
			}
		};

		fetchUser();
	}, [navigate]);

	return (
		<div>
			<Routes>
				{user ? (
					<>
						<Route path="/home" element={<Home />} />
						{/* Add more authenticated routes as needed */}
						<Route path="*" element={<Home />} />{" "}
						{/* Redirect to dashboard if no match */}
					</>
				) : (
					<>
						<Route path="/signin" element={<SignIn />} />
						<Route path="/signup" element={<SignUp />} />
						<Route path="*" element={<SignUp />} />{" "}
						{/* Redirect to sign-in if no match */}
					</>
				)}
			</Routes>
		</div>
	);
}
