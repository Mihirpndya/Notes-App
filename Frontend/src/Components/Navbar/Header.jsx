import Logo from "./Logo";
import ProfilePage from "./ProfilePage";
import React from "react";
import { Navbar } from "@material-tailwind/react";

export function Header() {
	return (
		<Navbar className="mx-auto lg:pl-6">
			<div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
				<div>
					<Logo />
				</div>
				<div>
					{" "}
					<ProfilePage />
				</div>
			</div>
		</Navbar>
	);
}

// const Header = () => {
// 	return (
// 		<div>
// 			<div className="mx-auto border-b-2 drop-shadow-md flex justify-between w-full items-center flex-wrap">
// 				<div>
// 					<Logo />
// 				</div>
// 				<div>
// 					<ProfilePage />
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

export default Header;
