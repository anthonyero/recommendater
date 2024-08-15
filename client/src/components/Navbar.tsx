import { Link, } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';


const Navbar = () => {
	const { isAuthenticated } = useAuth0();

	return (
		<div className='navigation-bar'>
			<Link to='/'>Home</Link>
			<Link to='/profile'>Profile</Link>
			{ isAuthenticated ? <LogoutButton /> : <LoginButton />}
		</div>
	);
};

export default Navbar;

