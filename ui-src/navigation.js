import Dashboard from './pages/Dashboard.vue';
import Settings from './pages/Settings.vue';
import Model from './pages/Model.vue';
import Configuration from './pages/Configuration.vue';
import EditModel from './pages/EditModel.vue';
import GCloudStorage from './pages/GCloudStorage.vue';
import GDisk from './pages/GDisk';
import Trigger from './pages/Trigger.vue';
import DataSource from './pages/DataSource.vue';
import UserNotificationCenter from './pages/UserNotificationCenter.vue';

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
                path: '/user-notification-center',
                component: UserNotificationCenter,
                title: 'User notification center'
            },
            {
                path: '/gcloudstorage',
                component: GCloudStorage,
                title: 'Google Cloud storage'
            },
            {
                path: '/gdisk',
                component: GDisk,
                title: 'Google Disk'
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
routes.push({path: "/modelcreate", component: EditModel, meta: {section: "Server", title: "Add new model"}});
// Add new or edit trigger
routes.push({path: "/trigger/:identifier", component: Trigger, meta: {section: "Triggers", title: "Edit trigger"}});
routes.push({path: "/triggercreate", component: Trigger, meta: {section: "Triggers", title: "Add new trigger"}});
// Add new or edit datasource
routes.push({path: "/datasource/:identifier", component: DataSource, meta: {section: "DataSources", title: "Edit datasource"}});
routes.push({path: "/datasourcecreate", component: DataSource, meta: {section: "DataSources", title: "Add new datasource"}});
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
