import Dashboard from './pages/Dashboard.vue';
import Settings from './pages/Settings.vue';
import Model from './pages/Model.vue';

const menu = [
    {
        title: 'Server',
        menu: [
            {
                path: '/dashboard',
                component: Dashboard,
                title: 'Dashboard',
                sourceUrl: 'src/Dashboard.vue'
            },
            {
                path: '/settings',
                component: Settings,
                title: 'Settings',
                sourceUrl: 'src/Dashboard.vue'
            }
        ]
    }
];

// Generate a Vue Router compatible routes map from the menu
const routes = menu.reduce((paths, section) => {
    const sectionPaths = section.menu.map(menuItem => {
        return {
            path: menuItem.path,
            component: menuItem.component,
            meta: {
                section: section.title,
                title: menuItem.title,
                sourceUrl: menuItem.sourceUrl
            }
        };
    });

    return paths.concat(sectionPaths);
}, []);

// Add model route
routes.push({path: "/model/:identifier", component: Model, meta: {section: "Server", title: "Model", sourceUrl: "src/Model.vue"}});

// Add the default route at the beginning of the routes array
routes.unshift({
    path: '/',
    redirect: '/dashboard'
});

// Add the catch all route to redirect 404s
routes.push({
    path: '*',
    redirect: '/dashboard'
});

export { menu, routes };
