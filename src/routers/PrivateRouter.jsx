import { Navigate, Outlet } from 'react-router-dom';
import UserAuth from '../Hooks/UserAuth';

const PrivateRouter = () => {
        const { currentUser } = UserAuth();
        return currentUser ? <Outlet/> : <Navigate to="/login" />;
    };
export default PrivateRouter;
