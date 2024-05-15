import { useState, useEffect } from 'react';
import styles from './Modal.css';
import { useFetch } from '../../hooks/useFetch';
import axios from 'axios';

const Modal = ({ modal,  todos, id, setData, setTitle, setDescription, setChecked }) => {

	const [modalData, setModalData] = useState([]);
	const [titleModal, setTitleModal] = useState('');
	const [descriptionModal, setDescriptionModal] = useState('');
	const [checkedModal, setCheckedModal] = useState(false);

	const filteredDataById  = (dataArr, id) => {
		const filteredObj = dataArr.find(item => item.id === id);
		return (filteredObj ? [filteredObj] : []);
	}
	// console.log(todos)
	// console.log(id)
	useEffect(() => {
		setModalData(filteredDataById(todos, id));		
	}, [todos, id]);
	
	
	

	// const [item, setItem] = useState([]);	
	useEffect(() => {
		if (modalData[0]) {
			 setTitleModal(modalData[0].title);
			 setDescriptionModal(modalData[0].description);
			 setCheckedModal(modalData[0].checked);
		}
  }, [modalData]);
  
	
	const editTodo = async (e) => {
		const item = {
			title: titleModal,
			description: descriptionModal,
			checked: checkedModal,
		}

		const response = await axios.patch(`todos/${id}`, item)
			.then(response => {
				console.log('Користувача успішно оновлено:', response.data);
			})
			.catch(error => {
				console.error('Помилка оновлення користувача:', error);
			});

			setData(prev => [...prev, response.data]);
			// setTitleModal(e.target.value);
			// setDescriptionModal(e.target.value);
			// setCheckedModal(e.target.value);

	}

	return ( modal ? (
		<div className='todo__modal'>
			<form className='todo__form--modal'>
				<button onClick={editTodo} className='todo__add'>Save</button>
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
		</div>) : null 
	)
}



export default Modal;
