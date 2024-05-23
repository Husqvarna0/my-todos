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
import TodoSingle from '../../pages/TodoSingle/TodoSingle'

function App() {
	const [data, setData] = useState([]);
	const { data: todos, isLoading, error } = useFetch('todos');
	const [modal, setModal] = useState(false);
	const [id, setId] = useState('');

	useEffect(() => {
		setData(todos)
	}, [todos]);

	const showModal = (e) => {
		setModal(prevModal => !prevModal);
		setId(e);
		console.log(e);
	}
	return (

		<>
			<main className='main__wrapper'>
				<Routes>
					<Route path='/' element={<Layout />}>
						<Route index element={<HomePage />} />
						<Route path='/todos' element={<TodoPage showModal={showModal}/>} />
						<Route path='/todos/:id' element={<TodoSingle id={id} todos={todos} setData={setData} />} />
						<Route path='/about' element={<AboutPage />} />
					</Route>
				</Routes>
			</main>

		</>
	)
}

export default App;