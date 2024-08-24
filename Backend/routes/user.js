const express = require("express");
const router = express.Router();
const z = require("zod");
const { User } = require("../db");
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middleware");

const userSignUpSchema = z.object({
	username: z.string(),
	password: z.string(),
	firstName: z.string(),
	lastName: z.string(),
});

const userUpdateSchema = z.object({
	firstName: z.string().optional(),
	lastName: z.string().optional(),
	password: z.string().optional(),
});

const userSignInSchema = z.object({
	username: z.string(),
	password: z.string(),
});

router.get("/me", authMiddleware, async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password"); // Exclude password from the response
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.json(user);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
});

router.post("/signup", async (req, res) => {
	const userData = req.body;
	const { success } = userSignUpSchema.safeParse(userData);
	if (!success) {
		return res.status(411).json({
			message: "Email already taken/ Invalid inputs",
		});
	}

	const existingUser = await User.findOne({
		username: userData.username,
	});

	if (existingUser) {
		return res.status(411).json({
			message: "User already exists",
		});
	}

	const user = await User.create({
		username: req.body.username,
		password: req.body.password,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
	});

	const userId = user._id;


	const token = jwt.sign(
		{
			userId,
		},
		JWT_SECRET
	);

	res.json({
		message: "User created successfully",
		token: token,
		userId: user._id
	});
});

router.post("/signin", async (req, res) => {
	const { success } = userSignInSchema.safeParse(req.body);
	if (!success) {
		return res.status(411).json({
			message: "Invalid Credentials",
		});
	}

	const user = await User.findOne({
		username: req.body.username,
		password: req.body.password,
	});

	if (user) {
		const token = jwt.sign(
			{
				userId: user._id,
			},
			JWT_SECRET
		);

		res.json({
			token: token,
			_id: user._id
		});
		return;
	}

	res.status(411).json({
		message: "Error while logging in",
	});
});

router.put("/", authMiddleware, async (req, res) => {
	const { success } = userUpdateSchema.safeParse(req.body);
	if (!success) {
		res.status(411).json({
			message: "Error while updating information",
		});
	}

	await User.updateOne(req.body, {
		id: req.userId,
	});

	res.json({
		message: "Updated successfully",
	});
});

router.get("/bulk", async (req, res) => {
	const filter = req.query.filter || "";

	const users = await User.find({
		$or: [
			{
				firstName: {
					$regex: filter,
				},
			},
			{
				lastName: {
					$regex: filter,
				},
			},
		],
	});

	res.json({
		users: users.map((user) => ({
			username: user.userName,
			firstName: user.firstName,
			lastName: user.lastName,
			_id: user._id,
		})),
	});
});

module.exports = router;
