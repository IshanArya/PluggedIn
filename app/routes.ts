import { type RouteConfig } from '@react-router/dev/routes';
import { flatRoutes } from '@react-router/fs-routes';
import Login from './routes/login';
import Callback from './routes/callback';
import Profile from './routes/profile';

export default flatRoutes() satisfies RouteConfig;

export const routes = [
    { path: '/login', element: <Login /> },
    { path: '/callback', element: <Callback /> },
    { path: '/profile', element: <Profile /> },
];
