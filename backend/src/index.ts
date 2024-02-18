import express from "express";
import cors from "cors";
const app = express();
const port = 3000;
const router = require("../routes/index");

app.use(cors());
app.use(express.json());
app.use("/noteApp", router);

app.listen(port, () => {
	console.log("listening from port 3000");
});
