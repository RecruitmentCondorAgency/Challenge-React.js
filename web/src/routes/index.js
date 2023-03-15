import { createBrowserRouter } from 'react-router-dom';
import Root from '../pages/Root';
import Search from '../pages/Search';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import Signup from '../pages/Signup';

export default routes = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        errorElement: <NotFound/>,
        children: [
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signup',
                element: <Signup/>
            },
            {
                path: '/search',
                element: <Search/>
            },
            {
                path: '/profile',
                element: <Profile/>
            }
        ]
    },
]);