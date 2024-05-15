import { useEffect, useState } from 'react';
import axios from 'axios';
import { useFetch } from '../../hooks/useFetch';
import Modal from '../../components/modal/Modal';
import { Link } from 'react-router-dom';
const TodoPage = () => {

	const getCurrentTimeFormatted = () => {
		const now = new Date();
		const year = now.getFullYear();
		const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Місяці нумеруються з 0, тому додаємо 1
		const day = now.getDate().toString().padStart(2, '0'); // Додає ведучу нуль, якщо день < 10

		return `${year}-${month}-${day}`;
	}
	axios.defaults.baseURL = 'http://localhost:3030/';
	const [modal, setModal] = useState(false);
	const [data, setData] = useState([]);
	const [isPostLoading, setIsPostLoading] = useState(false);

	const [id, setId] = useState('');
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [checked, setChecked] = useState(false);

	const { data: todos, isLoading, error } = useFetch('todos');
	useEffect(() => {
		setData(todos)
	}, [todos]);


	const addTodo = async (e) => {

		const item = {
			title: title,
			description: description,
			checked: checked,
			creationDate: getCurrentTimeFormatted()
		}

		const response = await axios.post('todos', item);

		setData(prev => [...prev, response.data])
		setTitle('');
		setDescription('');
		setChecked(false);

	}
	const deleteTodo = async (id) => {

		const response = await axios.delete(`todos/${id}`);

		setData((prev) => prev.filter(item => item.id !== id));
	}

	const showModal = (e) => {
		setModal(prevModal => !prevModal);
		setId(e);

	}

	// useEffect(() => {
	// 	setId(id)
	// }, [id])

	if (error) {
		return <div>Something went wrong {error}</div>
	}
	return (
		<div className="wrapper">
			<div className="container">
				<form className='todo__form'>
					<button onClick={addTodo} className='todo__add'>Add todo</button>
					<div className='todo__inputs'>
						<input
							type='text'
							className='todo__input--title'
							value={title}
							onChange={e => setTitle(e.target.value)}
						/>

						<input
							type='text'
							className='todo__input--description'
							value={description}
							onChange={e => setDescription(e.target.value)}
						/>
						<input
							type='checkbox'
							className='todo__input--chekbox'
							checked={checked}
							onChange={e => setChecked(e.target.checked)} />
					</div>
				</form>

				<ul className='todo__list'>
					{isLoading ? <div>Wait a minute</div>
						: (
							data.map((todo) =>
								<li key={todo.id} className='todo__list--item'>
									<div style={todo.checked ? { textDecoration: 'line-through' } : null} className='todo__title'>{todo.title}</div>
									<div style={todo.checked ? { textDecoration: 'line-through' } : null} className='todo__description'> {todo.description}</div>
									<input type='checkbox' checked={todo.checked}></input>
									<div className='todo__date'>{todo.creationDate}</div>
									<div className='todo__buttons'>
										{/* <Link to={`${todos.id}`} onClick={(e) => showModal(e.target.id)} className='todo__edit'> Edit</Link> */}
										<button id={todo.id} onClick={(e) => showModal(e.target.id)} className='todo__edit'>Edit</button>
										<button onClick={() => deleteTodo(todo.id)} className='todo__delete'>Delette</button>
									</div>

								</li>
							)
						)}
				</ul>
				<div className='modal__wrapper'>
					<Modal
						modal={modal}
						todos={todos}
						id={id}
						
					/>
				</div>

			</div>
		</div>

	)
}



export default TodoPage;
