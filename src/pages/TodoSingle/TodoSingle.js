import PropTypes from 'prop-types';
import styles from './TodoSingle.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import axios from 'axios';
import Modal from '../../components/modal/Modal';


const TodoSingle = ({ id, todos, setData }) => {

	 const { idPage } = useParams();
	 const todo = todos.find(todo => todo.idPage === parseInt(idPage, 10));




	return (
		<Modal
			modal={true}
			setData={setData}
			
			todos={todos}
			id={id}
		/>
	)
}



export default TodoSingle;
