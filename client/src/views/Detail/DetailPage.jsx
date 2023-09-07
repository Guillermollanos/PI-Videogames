import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './DetailPage.css'; // Importa tu archivo CSS personalizado

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
		<div className='detail-container'>
			<div className='detail-title'>
				<h1>{videogame.name}</h1>
				<h4>ID {videogame.id}</h4>
			</div>
			<div>
				<img
					className='detail-image'
					src={videogame.background_image}
					alt={videogame.name}
				/>
				<div className='detail-section'>
					<h2>Platforms</h2>
					<ul className='detail-list'>
						{videogame.platforms?.map((platform, index) => (
							<li key={index} className='detail-list-item'>
								{platform}
							</li>
						))}
					</ul>
					<p
						className='detail-description'
						dangerouslySetInnerHTML={{ __html: videogame.description }}
					/>

					<p>Released {videogame.released}</p>
					<h2>Rating: {videogame.rating}</h2>
					<h2>Genres</h2>
					<ul className='detail-list'>
						{videogame.genres?.map((genre, index) => (
							<li key={index} className='detail-list-item'>
								{genre}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default DetailPage;
