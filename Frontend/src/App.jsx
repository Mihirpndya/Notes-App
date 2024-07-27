import "./App.css";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/UserComponents/Login";
import Profile from "./Components/UserComponents/Profile";

export default function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route index element={<Home />} />
					<Route path="login" element={<Login />} />
					<Route path="profile" element={<Profile />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}
