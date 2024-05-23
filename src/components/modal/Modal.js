import { useState, useEffect } from 'react';
import styles from './Modal.css';
import { useFetch } from '../../hooks/useFetch';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Modal = ({ todos, id, setData }) => {

	const [modalData, setModalData] = useState([]);
	const [titleModal, setTitleModal] = useState('');
	const [descriptionModal, setDescriptionModal] = useState('');
	const [checkedModal, setCheckedModal] = useState(false);
	const navigate = useNavigate();


	const filteredDataById = (dataArr, id) => {
		const filteredObj = dataArr.find(item => item.id === id);
		return (filteredObj ? [filteredObj] : []);
	}

	useEffect(() => {
		setModalData(filteredDataById(todos, id));
	}, [todos, id]);





	useEffect(() => {
		if (modalData[0]) {
			setTitleModal(modalData[0].title);
			setDescriptionModal(modalData[0].description);
			setCheckedModal(modalData[0].checked);
		}
	}, [modalData]);


	const editTodo = async (e) => {
		e.preventDefault();
		const item = {
			title: titleModal,
			description: descriptionModal,
			checked: checkedModal,
		}

		try {
			const response = await axios.patch(`todos/${id}`, item);
			console.log('Користувача успішно оновлено:', response.data);
			setData(prev => prev.map(todo => (todo.id === id ? response.data : todo)));
			navigate('/todos'); // Перенаправлення після успішного збереження
		 } catch (error) {
			console.error('Помилка оновлення користувача:', error);
		 }
		// setTitleModal(e.target.value);
		// setDescriptionModal(e.target.value);
		// setCheckedModal(e.target.value);

	}

	return (
		<div className='todo__modal'>
			<form className='todo__form--modal'>
				<Link to={`/todos`} onClick={editTodo} className='todo__add'>Save </Link>
				{/* <button onClick={editTodo} className='todo__add'> Save</button> */}
				<div className='todo__inputs'>
					<input
						type='text'
						className='todo__input--title'
						value={titleModal}

						onChange={e => setTitleModal(e.target.value)}
					/>

					<input
						type='text'
						className='todo__input--description'
						value={descriptionModal}
						onChange={e => setDescriptionModal(e.target.value)}
					/>
					<input
						type='checkbox'
						className='todo__input--chekbox'
						checked={checkedModal}
						onChange={e => setCheckedModal(e.target.checked)} />
				</div>

			</form>
		</div>
	)
}



export default Modal;
