import express from 'express';
const noteRouter = require("./note");
const router = express.Router();

router.use("/v1",noteRouter);

module.exports = router;
