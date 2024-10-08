import React, { useEffect, useState } from "react";
import axios from "axios";
import ViewCard from "../Components/ViewCard";
import Header from "../Components/Navbar/Header";
import { useSearchParams } from "react-router-dom";

const Home = () => {
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();
	const userId = searchParams.get("userId");
	useEffect(() => {
		console.log(userId);
		const getNotes = async () => {
			axios
				.get(
					"http://localhost:3000/api/v1/notes/getNotes",
					{
						headers: {
							Authorization: "Bearer " + localStorage.getItem("token"),
						},
					}
				)
				.then((response) => {
					setNotes(response.data.notes);
				});
		};
		getNotes();
	}, []);

	return (
		<div className="relative">
			<div className="sticky top-[0]">
				<Header />
			</div>
			<div className="flex justify-center">
				<div className="fixed z-[5] p-20 ">
					{newNote ? (
						<div className="flex flex-cols md:items-center justify-center w-[60vh] h-[60vh] shadow-lg shadow-slate-400 backdrop-blur-md bg-white/30 ">
							<ViewCard setNewNote={setNewNote} setNotes={setNotes} />
						</div>
					) : (
						<div className="fixed flex flex-col justify-end bottom-0 right-0 mr-3 mb-3 ">
							<button
								onClick={() => {
									setNewNote(true);
								}}
								className=" bg-sky-300 p-2  border-3 rounded-full text-sm font-normal shadow-md shadow-slate-400 m-10 p-4 md:m-20 md:px-8 md:py-5"
							>
								Create note
							</button>
						</div>
					)}
				</div>

				<div
					className={
						" grid lg:grid-cols-3 md:grid-cols-2 pt-4 " +
						(newNote ? "pointer-events-none blur-sm" : "")
					}
				>
					{notes.map((note) => (
						<div key={note._id} className="p-2 m-4">
							<ViewCard
								title={note.title}
								description={note.description}
								_id={note._id}
								notes={notes}
								setNotes={setNotes}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Home;
