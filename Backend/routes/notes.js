const express = require("express");
const { createTodoSchema, updateSchema, deleteSchema } = require("../types");
const { Note } = require("../db");
const { authMiddleware } = require("../middleware");
const router = express.Router();

router.get("/getNotes", authMiddleware, async (req, res) => {
	const responsePayload = await Note.find({
		userId : req.userId,
	});

	res.json({
		notes: responsePayload,
	});
});

router.post("/createNote", authMiddleware, async (req, res) => {
	const createPayload = req.body;
	const parsedPayload = createTodoSchema.safeParse(createPayload);
	if (!parsedPayload.success) {
		res.status(411).json({
			msg: "invalid entry",
		});
		return;
	}

	await Note
		.create({
			title: createPayload.title,
			description: createPayload.description,
			userId: createPayload.userId,
		})
		.then((response) => {
			res.json({
				msg: "success",
				title: response.title,
				description: response.description,
				_id: response._id,
			});
		});
});

router.delete("/deleteNote", async (req, res) => {
	const deletePayload = req.body;
	const parsedPayload = deleteSchema.safeParse(deletePayload);
	if (!parsedPayload.success) {
		if (!parsedPayload.success) {
			res.status(411).json({
				msg: "invalid entry",
			});
			return;
		}
	}

	const isThere = await Note.findById(deletePayload._id);

	if (isThere == null) {
		res.status(411).json({
			msg: "Note not found",
		});
		return;
	}

	await Note
		.deleteOne({ _id: deletePayload._id })
		.then((result) => {
			res.status(200).json({
				msg: "Note deleted successfully",
			});
		})
		.catch((err) => {
			res.status(500).json({
				msg: JSON.stringify(err),
			});
		});
});

router.put("/updateNote", async (req, res) => {
	const updatePayload = req.body;
	const parsedPayload = updateSchema.safeParse(updatePayload);
	if (!parsedPayload.success) {
		res.status(411).json({
			msg: "invalid entry",
		});
		return;
	}

	const isThere = await Note.findById(updatePayload._id);

	if (isThere == null) {
		res.status(411).json({
			msg: "Note not found",
		});
		return;
	}

	await Note
		.updateOne(
			{
				_id: updatePayload._id,
			},
			{
				title: updatePayload.title,
				description: updatePayload.description,
			}
		)
		.then((response) => {
			res.status(200).json({
				msg: "Note successfully updated",
			});
		})
		.catch((err) => {
			res.status(411).json({
				message: "Error updating note",
			});
		});
});

module.exports = router;


/*{
    "msg": "success",
    "title": "test",
    "description": "test",
    "_id": "66c33a8311830814c8e591d3"
} */