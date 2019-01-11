import Dashboard from './pages/Dashboard.vue';
import Settings from './pages/Settings.vue';
import Model from './pages/Model.vue';
import Configuration from './pages/Configuration.vue';
import EditModel from './pages/EditModel.vue';
import GStorage from './pages/GStorage.vue';

const menu = [
    {
        title: 'Server',
        menu: [
            {
                path: '/dashboard',
                component: Dashboard,
                title: 'Dashboard'
            },
            {
                path: '/settings',
                component: Settings,
                title: 'Settings'
            },
            {
                path: '/gstorage',
                component: GStorage,
                title: 'GStorage'
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

// Add Models to route
routes.push({path: "/model/:identifier", component: Model, meta: {section: "Server", title: "Model"}});
// Add Configurations to route
routes.push({path: "/model/:identifier/configuration/:confIdentifier", component: Configuration, meta: {section: "Model", title: "Configuration"}});
// Add new or edit model
routes.push({path: "/edit-model", component: EditModel, meta: {section: "Server", title: "Add new or edit model"}});


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
