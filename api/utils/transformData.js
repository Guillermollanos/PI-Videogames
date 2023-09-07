const transformApiData = (data) => {
	//Destructuring received data
	let { id, name, platforms, background_image, released, rating, genres } =
		data;
	//Getting needed information from platforms
	platforms = platforms.map((plat) => {
		const { platform } = plat;
		return platform.name;
	});
	//Getting needed information from genres
	genres = genres.map((gen) => gen.name);
	//Adding a flag to difference between database and api videogames
	const origin = 'api';
	//Returning arranged information
	return {
		id,
		name,
		platforms,
		background_image,
		released,
		rating,
		genres,
		origin,
	};
};

const transformApiDataId = (data) => {
	//Destructuring received data
	let {
		id,
		name,
		description,
		platforms,
		background_image,
		released,
		rating,
		genres,
	} = data;
	//Getting needed information from platforms
	platforms = platforms.map((plat) => {
		const { platform } = plat;
		return platform.name;
	});
	//Getting needed information from genres
	genres = genres.map((gen) => gen.name);
	//Returning arranged information
	return {
		id,
		name,
		description,
		platforms,
		background_image,
		released,
		rating,
		genres,
	};
};

const transformDbData = (data) => {
	//Destructuring received data
	let { id, name, platforms, background_image, released, rating, genres } =
		data;
	//Getting needed information from genres
	genres = genres.map((gen) => gen.name);
	//Adding a flag to difference between database and api videogames
	const origin = 'database';
	//Returning arranged information
	return {
		id,
		name,
		platforms,
		background_image,
		released,
		rating: Number(rating),
		genres,
		origin,
	};
};

const transformDbDataId = (data) => {
	//Destructuring received data
	let {
		id,
		name,
		description,
		platforms,
		background_image,
		released,
		rating,
		genres,
	} = data;
	//Getting needed information from genres
	genres = genres.map((gen) => gen.name);
	//Returning arranged information
	return {
		id,
		name,
		description,
		platforms,
		background_image,
		released,
		rating: Number(rating),
		genres,
	};
};

module.exports = {
	transformApiData,
	transformApiDataId,
	transformDbData,
	transformDbDataId,
};
