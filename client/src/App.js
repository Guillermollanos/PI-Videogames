import './App.css';
import NavBar from './components/NavBar/NavBar';
import { LandingPage, HomePage, DetailPage, FormPage } from './views';
import { Routes, Route, useLocation } from 'react-router-dom';

function App() {
	const location = useLocation();

	return (
		<div className='App'>
			{location.pathname !== '/' && <NavBar />}
			<Routes>
				<Route exact path='/' element={<LandingPage />} />
				<Route path='/home' element={<HomePage />} />

				<Route path='/create' element={<FormPage />} />
				<Route path='/detail/:id' element={<DetailPage />} />
			</Routes>
		</div>
	);
}

export default App;
