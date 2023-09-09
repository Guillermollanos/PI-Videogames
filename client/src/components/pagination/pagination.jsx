import React from 'react';
import './pagination.css';

// ...

function Pagination({ page, setPage, pagesArray, pagesNumber }) {
	const handleClick = (event) => {
		let requestedPage = event.target.value;
		if (requestedPage === 'prev' && Number(page) > 1) {
			requestedPage = Number(page) - 1;
		} else if (requestedPage === 'next' && Number(page) < pagesNumber) {
			requestedPage = Number(page) + 1;
		}
		if (!isNaN(requestedPage)) {
			setPage(requestedPage);
		}
	};

	return (
		<div className='pagination-container'>
			<button
				className='pagination-button prev'
				onClick={handleClick}
				value='prev'
				disabled={page <= 1}
			>
				Prev
			</button>
			{pagesArray.map((p) => (
				<button
					className='pagination-button'
					onClick={handleClick}
					value={p}
					disabled={Number(page) === p}
					key={p}
				>
					{p}
				</button>
			))}
			<button
				className='pagination-button next'
				onClick={handleClick}
				value='next'
				disabled={page >= pagesNumber}
			>
				Next
			</button>
		</div>
	);
}

export default Pagination;
