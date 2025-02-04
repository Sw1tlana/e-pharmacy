import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function RestrictedRoute({ children, redirectTo = "/products" }) {

    const isLoggedIn = useSelector(selectIsLoggedIn);
    return isLoggedIn ? <Navigate to={redirectTo} replace/> : children;
    
}

export default RestrictedRoute;
