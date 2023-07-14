const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.bodyParser);

server.delete("/favorites", (req, res) => {
	const { userId, universityId } = req.query;

	const favorites = router.db.get("favorites");
	const favorite = favorites
		.find({ userId: Number(userId), universityId: Number(universityId) })
		.value();

	if (favorite) {
		favorites.remove(favorite).write();

		res.status(201).json({
			success: true,
			message: "Favorito eliminado exitosamente",
		});
	} else {
		res.status(404).json({
			success: false,
			message: "No se elimino el favorito",
		});
	}
});

server.use(router);

const port = 3000;
server.listen(port, () => {
	console.log(`JSON Server está corriendo en el puerto ${port}`);
});
