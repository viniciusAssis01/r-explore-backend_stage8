const { Router } = require("express");

const MovieNotesController = require("../controllers/movieNotesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const movieNotesRoutes = Router();

const notesController = new MovieNotesController();

movieNotesRoutes.use(ensureAuthenticated);
movieNotesRoutes.post("/", notesController.create);
movieNotesRoutes.get("/:id", notesController.show);
movieNotesRoutes.delete("/:id", notesController.delete);
movieNotesRoutes.get("/", notesController.index);

module.exports = movieNotesRoutes;
