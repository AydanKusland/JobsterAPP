import { NavLink } from 'react-router-dom'
import links from '../utils/links'

const NavLinks = ({ toggle }) => {
	return (
		<div className='nav-links'>
			{links.map(link => {
				const { text, path, icon, id } = link
				return (
					<NavLink
						key={id}
						to={path}
						className={({ isActive }) =>
							isActive ? 'nav-link active' : 'nav-link'
						}
						onClick={toggle}
					>
						<span className='icon'>{icon}</span>
						{text}
					</NavLink>
				)
			})}
		</div>
	)
}
export default NavLinks
