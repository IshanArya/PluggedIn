import { type RouteConfig } from '@react-router/dev/routes';
import { flatRoutes } from '@react-router/fs-routes';

// By file-based routing convention, __appshell.tsx will be used as the layout for all routes in this directory.
// No code change is needed here if you are using flatRoutes and the file structure is correct.
// Just ensure all your page files (home.tsx, profile.tsx, etc.) are siblings of __appshell.tsx.

export default flatRoutes() satisfies RouteConfig;
