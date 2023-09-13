import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './DetailPage.module.css';

const DetailPage = () => {
	const { id } = useParams();
	const [videogame, setVideogame] = useState({});

	useEffect(() => {
		axios
			.get(`http://localhost:3001/videogames/${id}`)
			.then((res) => setVideogame(res.data))
			.catch((error) => alert(error));
	}, [id]);

	return (
		<div className={styles.detail}>
			<div className={styles.title}>
				<h1 className={styles.titleText}>{videogame.name}</h1>
				<h4 className={styles.titleId}>ID {videogame.id}</h4>
			</div>
			<div>
				<img
					className={styles.image}
					src={videogame.background_image}
					alt={videogame.name}
				/>
				<div className={styles.info}>
					<h2 className={styles.sectionTitle}>Platforms</h2>
					<div className={styles.platforms}>
						<ul className={styles.list}>
							{videogame.platforms?.map((platform, index) => (
								<li key={index}>{platform}</li>
							))}
						</ul>
					</div>
					<p
						className={styles.description}
						dangerouslySetInnerHTML={{ __html: videogame.description }}
					/>

					<p className={styles.releaseDate}>Released {videogame.released}</p>
					<h2 className={styles.rating}>Rating: {videogame.rating}</h2>
					<h2 className={styles.sectionTitle}>Genres</h2>
					<div className={styles.genres}>
						<ul className={styles.list}>
							{videogame.genres?.map((genre, index) => (
								<li key={index} className={styles.listItem}>
									{genre}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DetailPage;
