const { Router } = require("express");

const MovieTagsController = require("../controllers/movieTagsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const movieTagsRoutes = Router();

const movieTagsController = new MovieTagsController();

movieTagsRoutes.use(ensureAuthenticated);
movieTagsRoutes.get("/", movieTagsController.index);

module.exports = movieTagsRoutes;
