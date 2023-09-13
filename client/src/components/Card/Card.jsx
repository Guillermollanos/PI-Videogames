import React from 'react';
import styles from './Card.module.css';

const Card = (props) => {
	// Verifica si props.genres es una cadena
	const genresString = Array.isArray(props.genres)
		? props.genres.join(', ')
		: props.genres;

	// Divide la cadena de géneros en una matriz
	const genresArray = genresString.split(',').map((genre) => genre.trim());

	// Filtra los géneros para incluir solo el género seleccionado (props.selectedGenre)
	const filteredGenres = genresArray.filter(
		(genre) => genre === props.selectedGenre
	);

	// Si se encontró el género seleccionado, usa ese; de lo contrario, usa el primer género en la lista
	const displayedGenre =
		filteredGenres.length > 0 ? filteredGenres[0] : genresArray[0];

	return (
		<div className={styles.card}>
			<div className={styles.cardImageContainer}>
				<img
					className={styles.cardImage}
					src={props.background_image}
					alt={props.name}
				/>
			</div>
			<h3 className={styles.cardTitle}>{props.name}</h3>
			<p className={styles.cardPlatform}>{displayedGenre}</p>
		</div>
	);
};

export default Card;
