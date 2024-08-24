import React from "react";

const TextBox = ({ label,onChange,placeholder }) => {
	return (
		<div >
			<div className="text-left text-sm font-medium py-2">{label}</div>
			<input onChange={onChange} className=" w-full px-2 py-1 border-2 border-md" placeholder={placeholder} type="text" />
		</div>
	);
};

export default TextBox;
