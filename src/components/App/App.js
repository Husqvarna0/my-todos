import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Form from '../form/Form';
import { getTodos } from '../../api/api';
import { useFetch } from '../../hooks/useFetch';

import TodoPage from '../../pages/Todo/TodoPage';
import {Routes, Route  } from 'react-router-dom';
import Layout from '../../Layout/Layout';
import HomePage from '../../pages/Home/HomePage';
import AboutPage from '../../pages/About/AboutPage';
import Modal from '../modal/Modal';


function App() {

	return (

		<>
			<main className='main__wrapper'>
				<Routes>
					<Route path='/' element={<Layout />}>
						<Route index element={<HomePage />} />
						<Route path='/todos' element={<TodoPage />} />
						<Route path='/todos/:id' element={<Modal />} />
						<Route path='/about' element={<AboutPage />} />
					</Route>
				</Routes>
			</main>

		</>
	)
}

export default App;