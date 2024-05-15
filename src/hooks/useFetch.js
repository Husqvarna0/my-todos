import { useEffect, useState } from "react";
import axios from 'axios';
import { getTodos } from "../api/api";

export const useFetch = (url) => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchData = async () => {
		setIsLoading(true);

		try {
			const response = await axios.get(url);
			setData(response.data);
		} catch {
			console.warn('something went wrong', error)
			setError(error.message)
		} finally {
			setIsLoading(false);
		}




	};

	useEffect(() => {
		fetchData();
	}, []);

	return { data, isLoading }
}