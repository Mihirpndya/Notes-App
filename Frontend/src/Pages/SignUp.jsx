import React, { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import Heading from "../Components/Heading";
import SubHeading from "../Components/SubHeading";
import TextBox from "../Components/TextBox";
import Button from "../Components/Button";
import BottomLink from "../Components/BottomLink";

const SignUp = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const[error,setError] = useState("");
	const navigate = useNavigate();

	return (
		<div className="bg-slate-300">
			<div className="flex flex-col justify-center items-center h-screen ">
				<div className="bg-white border-2 rounded-md p-4 text-center w-80">
					<Heading heading={"Sign Up"} />
					<SubHeading
						description={"Enter your Information to create your account"}
					/>
					<div className="text-red-400">{error}</div>
					<TextBox
						onChange={(e) => {
							setFirstName(e.target.value);
						}}
						label={"First Name"}
						placeholder={"john"}
					/>
					<TextBox
						onChange={(e) => {
							setLastName(e.target.value);
						}}
						label={"Last Name"}
						placeholder={"doe"}
					/>
					<TextBox
						onChange={(e) => {
							setUsername(e.target.value);
						}}
						label={"Email"}
						placeholder={"john.doe@example.com"}
					/>
					<TextBox
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						label={"Password"}
						placeholder={"password"}
					/>
					<div>
						<Button
							onClick={async () => {
								try {
									const response = await axios.post(
										"http://localhost:3000/api/v1/user/signup",
										{
											username,
											firstName,
											lastName,
											password,
										}
									);
									localStorage.setItem("token", response.data.token);
									navigate("/home?userId="+response.data.userId);
								} catch (error) {
									console.error("Sign-up error:", error);
									setError("Email already exists/Invalid inputs !");
								}
							}}
							label={"Sign Up"}
						/>
					</div>
					<BottomLink
						text={"Already have an account? "}
						to={"/signin"}
						nav={"Log-In"}
					/>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
