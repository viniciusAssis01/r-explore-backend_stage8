const { Router } = require("express");

const MovieNotesController = require("../controllers/movieNotesController");

const movieNotesRoutes = Router();

const notesController = new MovieNotesController();

movieNotesRoutes.post("/:user_id", notesController.create);
movieNotesRoutes.get("/:id", notesController.show);
movieNotesRoutes.delete("/:id", notesController.delete);
movieNotesRoutes.get("/", notesController.index);

module.exports = movieNotesRoutes;
