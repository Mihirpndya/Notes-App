import React from "react";
import { Link } from "react-router-dom";


const BottomLink = ({ text, nav, to }) => {
	return (
		<div className=" py-2 text-sm flex justify-center ">
			<div>{text}</div>
			<Link className="pointer underline pl-1 cursor-pointer" to={to}>{nav}</Link>
		</div>
	);
};

export default BottomLink;

//asadasdasdasda asdasdasd@gmail.com
