const knex = require("../database/knex");

class MovieNotesController {
	async create(request, response) {
		const { title, description, rating, tags } = request.body;
		const user_id = request.user.id;

		const [note_id] = await knex("movie_notes").insert({
			title,
			description,
			rating,
			user_id,
		});

		const tagsInsert = tags.map((tag) => {
			return {
				note_id,
				user_id,
				name: tag,
			};
		});

		await knex("movie_tags").insert(tagsInsert);

		return response.json({});
	}

	async show(request, response) {
		const { id } = request.params;

		const movieNote = await knex("movie_notes").where({ id }).first();
		const dataBr = movieNote.created_at
			.substring(0, 10)
			.split("-")
			.reverse()
			.join("/");
		const time = movieNote.created_at.substring(11, 16);

		const formattedCreated_at = `${dataBr} ás ${time}`;

		const tags = await knex("movie_tags")
			.where({ note_id: id })
			.orderBy("name");

		return response.json({
			...movieNote,
			created_at: formattedCreated_at,
			tags,
		});
	}

	async index(request, response) {
		const { title } = request.query;
		const user_id = request.user.id;

		const movieNotes = await knex("movie_notes")
			.select(["id", "title", "description", "user_id", "rating"])
			.where({ user_id })
			.whereLike("title", `%${title}%`)
			.orderBy("title");
		const userTags = await knex("movie_tags").where({ user_id });
		const notesWithTags = movieNotes.map((note) => {
			const noteTags = userTags.filter((tag) => tag.note_id === note.id);

			return {
				...note,
				tags: noteTags,
			};
		});
		return response.json(notesWithTags);
	}

	async delete(request, response) {
		const { id } = request.params;

		await knex("movie_notes").where({ id }).delete();

		return response.json();
	}
}

module.exports = MovieNotesController;
