import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3030/';

export const getTodos = async () => {
	const todos = await axios.get('todos');
	return todos.data;
}

export const getSingleTodos = async (id) => {
	const todos = await axios.get(`todos/${id}`);
	return todos.data;
}