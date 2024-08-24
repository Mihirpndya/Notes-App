
const mongoose = require("mongoose");

mongoose.connect("Db url here..");

const users = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
		minLength: 3,
		maxLength: 30,
	},
	password: {
		type: String,
		required: true,
		minLength: 6,
	},
	firstName: {
		type: String,
		required: true,
		minLength: 2,
	},
	LastName: {
		type: String,
	},
});

const noteSchema = mongoose.Schema({
	title: String,
	description: String,
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
});

const Note = mongoose.model("Notes", noteSchema);
const User = mongoose.model("User", users);

module.exports = {
	Note: Note,
  User: User,
};
