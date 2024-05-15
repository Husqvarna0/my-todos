import { NavLink, Outlet } from 'react-router-dom';
import './Layout.css'

const Layout = () => {
	const getActiveLink = ({ isActive }) => (isActive ? 'active-link' : '')
	return (
		<>
			<div className='todo__header-container'>
				<header className='todo__header'>
					<NavLink to='/' style={({ isActive }) => ({ color: isActive ? '#CC5500' : '' })}>Home</NavLink>
					<NavLink to='/todos' style={({ isActive }) => ({ color: isActive ? '#CC5500' : '' })} className={getActiveLink}>Todos</NavLink>
					<NavLink to='/about' className={getActiveLink} style={({ isActive }) => ({ color: isActive ? '#CC5500' : '' })}>About</NavLink>
				</header>
			</div>
			<main className='todo__block'>
				<Outlet />
			</main>
			<footer className='todo__footer'>2024</footer>
		</>

	)
}



export default Layout;
