const { Router } = require("express");

const usersRoutes = require("./users.routes");
const movieNotesRoutes = require("./movie_notes.routes");
const movieTagsRoutes = require("./movie_tags.routes");
const sessionsRoutes = require("./sessions.routes");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/movies", movieNotesRoutes);
routes.use("/tags", movieTagsRoutes);
routes.use("/sessions", sessionsRoutes);

module.exports = routes;
