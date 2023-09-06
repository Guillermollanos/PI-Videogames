import { useState } from 'react';
import axios from 'axios';
import './FormPage.css';

const FormPage = () => {
	const [form, setForm] = useState({
		name: '',
		background_image: '',
		description: '',
		plataforms: '',
		released: '',
		rating: '',
	});

	const [error, setError] = useState({
		name: '',
		background_image: '',
		description: '',
		plataforms: '',
		released: '',
		rating: '',
	});

	const changeHandler = (event) => {
		const property = event.target.name;
		const value = event.target.value;

		setForm({ ...form, [property]: value });
		validate({ ...form, [property]: value }, property);
	};

	const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ-' ]{2,30}$/;
	const descriptionRegex = /^[a-zA-Z0-9.,'"\s-]{0,255}$/;
	const plataformsRegex = /^[a-zA-Z0-9.,'"\s-]{0,50}$/;
	const releasedRegex =
		/^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
	const ratingRegex = /^([0-9]|10)(\.[0-9])?$/;

	const validate = (form, property) => {
		switch (property) {
			case 'name':
				if (nameRegex.test(form.name) || form.name === '') {
					setError({ ...error, name: '' });
				} else {
					setError({
						...error,
						name: 'El nombre contiene caracteres inválidos.',
					});
				}
				break;
			case 'description':
				if (
					descriptionRegex.test(form.description) ||
					form.description === ''
				) {
					setError({ ...error, description: '' });
				} else {
					setError({
						...error,
						description: 'La descripción contiene caracteres inválidos.',
					});
				}
				break;
			case 'plataforms':
				if (plataformsRegex.test(form.plataforms) || form.plataforms === '') {
					setError({ ...error, plataforms: '' });
				} else {
					setError({
						...error,
						plataforms: 'Las plataformas contienen caracteres inválidos.',
					});
				}
				break;
			case 'released':
				if (releasedRegex.test(form.released) || form.released === '') {
					setError({ ...error, released: '' });
				} else {
					setError({
						...error,
						released: 'La fecha de lanzamiento es inválida.',
					});
				}
				break;
			case 'rating':
				if (ratingRegex.test(form.rating) || form.rating === '') {
					setError({ ...error, rating: '' });
				} else {
					setError({ ...error, rating: 'El rating es inválido.' });
				}
				break;
			default:
				break;
		}
	};

	const SubmitHandler = (event) => {
		event.preventDefault();
		// Realizar la solicitud de envío aquí si todas las validaciones son exitosas
		if (Object.values(error).every((value) => value === '')) {
			axios
				.post('http://localhost:3001/videogames', form)
				.then((res) => {
					// Manejar la respuesta exitosa aquí si es necesario
					alert(res);
				})
				.catch((error) => {
					// Manejar errores aquí
					console.error('Error en la solicitud:', error);
				});
		}
	};

	return (
		<div className='form-container'>
			<form onSubmit={SubmitHandler}>
				<div>
					<label htmlFor='name'>Name</label>
					<input
						type='text'
						value={form.name}
						onChange={changeHandler}
						name='name'
					/>
					{error.name && <span>{error.name}</span>}
				</div>

				<div>
					<label htmlFor='background_image'>background_image</label>
					<input
						type='file'
						value={form.background_image}
						onChange={changeHandler}
						name='background_image'
					/>
				</div>

				<div>
					<label htmlFor='description'>Description</label>
					<input
						type='text'
						value={form.description}
						onChange={changeHandler}
						name='description'
					/>
					{error.description && <span>{error.description}</span>}
				</div>

				<div>
					<label htmlFor='plataforms'>Plataforms</label>
					<input
						type='text'
						value={form.plataforms}
						onChange={changeHandler}
						name='plataforms'
					/>
					{error.plataforms && <span>{error.plataforms}</span>}
				</div>

				<div>
					<label htmlFor='released'>Released</label>
					<input
						type='date'
						value={form.released}
						onChange={changeHandler}
						name='released'
					/>
					{error.released && <span>{error.released}</span>}
				</div>

				<div>
					<label htmlFor='rating'>Rating</label>
					<input
						type='number'
						value={form.rating}
						onChange={changeHandler}
						name='rating'
						min='1'
						max='5'
						step='0.1'
					/>
					{error.rating && <span>{error.rating}</span>}
				</div>

				<button type='submit'>Submit</button>
			</form>
		</div>
	);
};

export default FormPage;

//Nombre Imagen.Descripción.Plataformas.Fecha de lanzamiento.Rating.Posibilidad de seleccionar/agregar varios géneros en simultáneo.Botón para crear el nuevo videojuego.
