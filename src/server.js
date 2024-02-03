require("express-async-errors");
require("dotenv/config");

const database = require("./database/sqlite");

const AppError = require("./utils/AppError");

const uploadConfig = require("./configs/upload");

const cors = require("cors");

const express = require("express");

const routes = require("./routes");

database();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));
app.use(routes);

app.use((error, request, response, next) => {
	if (error instanceof AppError) {
		return response.status(error.statusCode).json({
			status: "error",
			message: error.message,
		});
	}
	console.error(error);

	return response.status(500).json({
		status: "error",
		message: "Internal server Error",
	});
});

const PORT = process.env.PORT || 3000;
const runningMsg = `server running on http://localhost:${PORT}`;

app.listen(PORT, () => {
	console.log(runningMsg);
});
