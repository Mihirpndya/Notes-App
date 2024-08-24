import React, { useState } from "react";
import Heading from "../Components/Heading";
import SubHeading from "../Components/SubHeading";
import TextBox from "../Components/TextBox";
import Button from "../Components/Button";
import BottomLink from "../Components/BottomLink";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	return (
		<div className="bg-slate-300">
			<div className="flex flex-col justify-center items-center h-screen ">
				<div className="bg-white border-2 rounded-md p-4 text-center w-80">
					<Heading heading={"Sign In"} />
					<SubHeading
						description={"Enter your credentials to access your account"}
					/>
					<div className="text-red-400">{error}</div>
					<TextBox
						onChange={(e) => {
							setUsername(e.target.value);
						}}
						label={"Email"}
						placeholder={"mike.torr@example.com"}
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
										"http://localhost:3000/api/v1/user/signin",
										{
											username,
											password,
										}
									);
									
									// Assuming the token is returned in response.data.token
									localStorage.setItem("token", response.data.token);

									// Navigate to dashboard after successful sign-in
									navigate("/home?userId=" + response.data._id);
								} catch (error) {
									console.error("Sign-in error:", error);
									setError("Invalid Credentials !");

									// Handle the error as needed, e.g., show an error message to the user
								}
							}}
							label={"Sign In"}
						/>
					</div>
					<BottomLink
						text={"Don't have an account? "}
						to={"/signup"}
						nav={"Sign Up"}
					/>
				</div>
			</div>
		</div>
	);
};

export default SignIn;

//kinjal.komal@whatever.com