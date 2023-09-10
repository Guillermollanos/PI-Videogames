import { useEffect, useState } from 'react';
import axios from 'axios';
import './FormPage.css';
import { validation } from '../../utils/validation';

const FormPage = () => {
	const [form, setForm] = useState({
		name: '',
		description: '',
		platforms: [],
		background_image: '',
		released: '',
		rating: '',
		genres: [],
	});

	const [errors, setErrors] = useState({
		name: '',
		description: '',
		platforms: '',
		background_image: '',
		released: '',
		rating: '',
		genres: '',
	});

	useEffect(() => {
		async function apiReq() {
			try {
				const { data } = await axios.get('http://localhost:3001/genres');
				setForm({ ...form, apiGenres: data });
			} catch (error) {
				console.error(error);
			}
		}
		apiReq();
	}, []);

	const changeHandler = (event) => {
		const property = event.target.name;
		const value = event.target.value;
		setErrors(validation({ ...form, [property]: value }));
		setForm({ ...form, [property]: value });
	};

	const genreHandler = (event) => {
		const selectedGenreid = Number(event.target.id);
		const exists = form.genres.find((genre) => genre === selectedGenreid);

		if (exists) {
			setErrors(
				validation({
					...form,
					genres: [...form.genres.filter((genre) => genre !== selectedGenreid)],
				})
			);
			setForm({
				...form,
				genres: [...form.genres.filter((genre) => genre !== selectedGenreid)],
			});
		} else {
			setErrors(
				validation({ ...form, genres: [...form.genres, selectedGenreid] })
			);
			setForm({ ...form, genres: [...form.genres, selectedGenreid] });
		}
	};

	const platformHandler = (event) => {
		event.preventDefault();

		if (event.target.name) {
			const removePlatform = event.target.name;
			setErrors(
				validation({
					...form,
					platforms: form.platforms.filter(
						(platform) => platform !== removePlatform
					),
				})
			);
			setForm({
				...form,
				platforms: form.platforms.filter(
					(platform) => platform !== removePlatform
				),
			});
		} else if (form.currentPlatform) {
			const platform = form.currentPlatform;
			setErrors(
				validation({
					...form,
					platforms: [...form.platforms, platform],
					currentPlatform: '',
				})
			);
			setForm({
				...form,
				platforms: [...form.platforms, platform],
				currentPlatform: '',
			});
		}
	};

	const submitHandler = (event) => {
		event.preventDefault();

		if (Object.keys(errors).length) {
			alert('Incorrect information');
		} else {
			const {
				name,
				description,
				platforms,
				background_image,
				released,
				rating,
				genres,
			} = form;
			axios
				.post('http://localhost:3001/videogames', {
					name,
					description,
					platforms,
					background_image,
					released,
					rating,
					genres,
				})
				.then((data) => {
					setForm({
						name: '',
						description: '',
						platforms: [],
						background_image: '',
						released: '',
						rating: '',
						genres: [],
					});
					alert('Game Created');
				})
				.catch((error) => alert(error));
		}
	};

	return (
		<form className='form-container' onSubmit={submitHandler}>
			<div>
				<label htmlFor='name'>Name</label>
				<input
					type='text'
					value={form.name}
					onChange={changeHandler}
					name='name'
				/>
				<span>{errors.name}</span>
			</div>

			<div>
				<label htmlFor='description'>Description</label>
				<input
					type='text'
					value={form.description}
					onChange={changeHandler}
					name='description'
				/>
				<span>{errors.description}</span>
			</div>

			<div>
				<label htmlFor='currentPlatform'>Platforms:</label>
				<input
					type='text'
					value={form.currentPlatform}
					onChange={changeHandler}
					name='currentPlatform'
				/>
				<button onClick={platformHandler}>Add</button>
				<span>{errors.platforms}</span>
			</div>

			<div className='platformContainer'>
				{form.platforms.map((platform) => (
					<label key={platform}>
						{platform}
						<button key={platform} name={platform} onClick={platformHandler}>
							x
						</button>
					</label>
				))}
			</div>

			<div>
				<label htmlFor='background_image'>Image</label>
				<input
					type='text'
					value={form.background_image}
					onChange={changeHandler}
					name='background_image'
				/>
				<span>{errors.background_image}</span>
			</div>

			<div>
				<label htmlFor='released'>Released</label>
				<input
					type='date'
					value={form.released}
					onChange={changeHandler}
					name='released'
					placeholder='yyyy-mm-dd'
				/>
				<span>{errors.released}</span>
			</div>

			<div>
				<label htmlFor='rating'>Rating</label>
				<input
					type='number'
					value={form.rating}
					onChange={changeHandler}
					name='rating'
					placeholder='Number...'
				/>
				<span>{errors.rating}</span>
			</div>

			<div>
				<label htmlFor='genres'>Genres</label>
				<span>{errors.genres}</span>
			</div>

			<div className='genresContainer'>
				{form.apiGenres &&
					form.apiGenres.map((genre) => (
						<label key={genre.id}>
							<input
								key={genre.id}
								type='checkbox'
								id={genre.id}
								name={genre.name}
								onChange={genreHandler}
							/>
							{genre.name}
						</label>
					))}
			</div>

			<button type='submit'>Create</button>
		</form>
	);
};

export default FormPage;

//Nombre Imagen.Descripción.Plataformas.Fecha de lanzamiento.Rating.Posibilidad de seleccionar/agregar varios géneros en simultáneo.Botón para crear el nuevo videojuego.
