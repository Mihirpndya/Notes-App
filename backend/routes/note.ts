import express from "express";
import Notes from "../src/db";
const router = express.Router();
import {z} from 'zod';


router.get("/getNotes", async (req, res) => {
	try {
        
		const response = await Notes.findOne({ title: req.body.title });
		if (!response) {
			res.status(411).json({
				msg: "No note found by this title",
			});
		}

		res.json({
			response,
		});
	} catch (error) {
		console.error("Error occured: ", error);
	}
});

router.post("/createNote", async (req, res) => {
	try {

		const newNote = await Notes.create(req.body);
		const noteId = newNote._id;

		res.json({
			msg: "note created",
			noteId,
		});
	} catch (error) {
		console.error("Error occured: ", error);
	}
});

module.exports = router;
