import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

const Modal = ({
	onClose,
	_id,
	setNotes,
	notes,
	title,
	description,
	setOnEdit,
}) => {
	const removeNote = (deleteId) => {
		const newList = notes.filter((note) => note._id !== deleteId);
		setNotes(newList);
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/30 z-[10]">
			<div className="bg-white  shadow-lg shadow-gray-300 rounded-lg shadow bg-gradient-to-b from-amber-200 to-amber-300 dark:border-gray-500 p-4 max-w-lg w-full relative">
				<div className="pb-2">
					<h2 className="text-xl font-semibold">{title}</h2>
					<button
						className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
						onClick={onClose}
					>
						{<X />}
					</button>
				</div>

				<p>{description}</p>

				<div className="flex justify-end">
					<button
						onClick={() => {
							onClose();
							setOnEdit(true);
						}}
						className="my-3 mx-3 px-6 py-1 rounded-md border-1 shadow-md shadow-gray-400 bg-sky-300 hover:bg-sky-400 border-black"
					>
						Edit
					</button>
					<button
						className="my-3 mx-3 px-6 py-1 rounded-md border-1 shadow-md shadow-gray-400 bg-sky-300 hover:bg-sky-400 border-black"
						onClick={() => {
							onClose();
							removeNote(_id);
							axios
								.delete("http://localhost:3000/api/v1/notes/deleteNote", {
									data: { _id: _id },
								})
								.then((response) => {
									console.log("User deleted successfully!");
								})
								.catch((error) => {
									console.error("Error deleting user:", JSON.stringify(error));
								});
						}}
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;

/*axios
                .put("http://localhost:3000/updateNote", updatedData)
                .then((res) => {
                  setMessage("Update Successfull");
                })
                .catch((err) => {
                  setMessage("Error while updating data");
                }); */
