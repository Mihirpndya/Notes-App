const express = require("express");
const { createTodoSchema, updateSchema, deleteSchema } = require("./types");
const { todo } = require("./db");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/getTodos", async (req, res) => {
	const responsePayload = await todo.find({});

	res.json({
		notes: responsePayload,
	});
});

app.post("/createTodos", async (req, res) => {
	const createPayload = req.body;
	const parsedPayload = createTodoSchema.safeParse(createPayload);
	if (!parsedPayload.success) {
		res.status(411).json({
			msg: "invalid entry",
		});
		return;
	}

	await todo
		.create({
			title: createPayload.title,
			description: createPayload.description,
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

app.delete("/deleteNote", async (req, res) => {
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

	const isThere = await todo.findById(deletePayload._id);

	if (isThere == null) {
		res.status(411).json({
			msg: "Note not found",
		});
		return;
	}

	await todo
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

app.put("/updateNote", async (req, res) => {
	const updatePayload = req.body;
	const parsedPayload = updateSchema.safeParse(updatePayload);
	if (!parsedPayload.success) {
		res.status(411).json({
			msg: "invalid entry",
		});
		return;
	}

	const isThere = await todo.findById(updatePayload._id);

	if (isThere == null) {
		res.status(411).json({
			msg: "Note not found",
		});
		return;
	}

	await todo
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

app.listen(port, () => {
	console.log(`Notes app listening on port ${port}`);
});
