//const urlRegex = /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/;
const dateRegex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;

export const validation = (form) => {
	const errors = {};

	if (form.name === '') errors.name = 'El nombre no puede estar vacío';
	else if (form.name.length < 2)
		errors.name = 'El nombre debe tener al menos 2 caracteres';

	if (form.description === '')
		errors.description = 'La descripción no puede estar vacía';
	else if (form.description.length < 10)
		errors.description = 'La descripción debe tener al menos 10 caracteres';

	if (form.platforms.length === 0)
		errors.platforms = 'Debe haber al menos 1 plataforma seleccionada';

	//Si deseas habilitar la validación de URL, puedes descomentar la siguiente sección:
	//if (!urlRegex.test(form.background_image))
	//errors.background_image = 'URL inválida';

	if (!isValidUrl(form.background_image))
		errors.background_image = 'URL inválida';

	if (form.released === '') errors.released = 'La fecha no puede estar vacía';
	else if (!dateRegex.test(form.released))
		errors.released = 'Formato de fecha inválido';

	if (!form.rating) errors.rating = 'La calificación no puede estar vacía';

	if (form.genres.length === 0)
		errors.genres = 'Debe haber al menos 1 género seleccionado';

	return errors;
};

const isValidUrl = (string) => {
	try {
		return Boolean(new URL(string));
	} catch (error) {
		return false;
	}
};
