import './HomePage.css'
import { NavLink } from 'react-router-dom';

const HomePage = () => {
	return (
		<><div className="hero-block__container">
			<h1 className="hero-block__title">Привіт</h1>
			<div className="hero-block__text" >
				<p> Запрошую до мого першого react застосунку - todo list</p>
				<p>Тут ви можете створити список завдань які ви плануєете виконати <br />
					Вам надається можливість редагувати створене завдання, помічати його як виконане та видаляти<br />
					Натисність 	<NavLink to='/todos' style={{color: '#CC5500'}} className="hero-block__todos">Розпочати</NavLink> для створення вашого списку завдань
				</p>


			</div>

		</div>
		</>
	)
}



export default HomePage;
