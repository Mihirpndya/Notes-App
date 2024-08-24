const express = require("express");
const userRouter = require("./user");
const notesRouter = require("./notes");
const router = express.Router();


router.use("/user", userRouter);
router.use("/notes", notesRouter);

module.exports = router;
