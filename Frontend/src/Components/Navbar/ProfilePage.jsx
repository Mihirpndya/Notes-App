import { UserCircleIcon, PowerIcon } from "@heroicons/react/24/solid";

import {
	Typography,
	Button,
	Menu,
	MenuHandler,
	MenuList,
	MenuItem,
} from "@material-tailwind/react";

import { useNavigate } from "react-router-dom";
import React from "react";

const profileMenuItems = [
	{
		label: "My Profile",
		icon: UserCircleIcon,
		action: () => {},
	},

	{
		label: "Sign Out",
		icon: PowerIcon,
		action: () => {},
	},
];

function ProfilePage() {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const navigate = useNavigate();

	const closeMenu = () => setIsMenuOpen(false);

	const profileMenuActions = {
		"My Profile": () => {
			navigate("/profile");
			closeMenu();
		},
		"Sign Out": () => {
			navigate("/login");
			closeMenu();
		},
	};

	return (
		<Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
			<MenuHandler>
				<Button className="flex items-center gap-1 rounded-full py-1 pr-3 pl-3 lg:mr-6 mr-4  bg-gradient-to-b from-amber-200 to-amber-400 shadow-md shadow-slate-300 ">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="lucide lucide-user"
					>
						<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
						<circle cx="12" cy="7" r="4" />
					</svg>
				</Button>
			</MenuHandler>
			<MenuList className="p-1">
				{profileMenuItems.map(({ label, icon }, key) => {
					const isLastItem = key === profileMenuItems.length - 1;
					return (
						<MenuItem
							key={label}
							onClick={() => {
								profileMenuActions[label]();
							}}
							className={`flex items-center gap-2 rounded ${
								isLastItem
									? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
									: "hover:bg-gray-100"
							}`}
						>
							{React.createElement(icon, {
								className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
								strokeWidth: 2,
							})}
							<Typography
								as="span"
								variant="small"
								className="font-normal px-3"
								color={isLastItem ? "red" : "inherit"}
							>
								{label}
							</Typography>
						</MenuItem>
					);
				})}
			</MenuList>
		</Menu>
	);
}
export default ProfilePage;
