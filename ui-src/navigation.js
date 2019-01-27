import Dashboard from './pages/Dashboard.vue';
import Settings from './pages/Settings.vue';
import Model from './pages/Model.vue';
import Configuration from './pages/Configuration.vue';
import GCloudStorage from './pages/GCloudStorage.vue';
import GDisk from './pages/GDisk.vue';
import Trigger from './pages/Trigger.vue';
import SourcePoint from './pages/SourcePoint.vue';
import UserNotificationCenter from './pages/UserNotificationCenter.vue';
import Job from './pages/Job.vue';

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

// Model routes
routes.push({path: "/model/:action/:identifier", component: Model, meta: {section: "Server", title: "View / Edit Model"}});
routes.push({path: "/model/:action", component: Model, meta: {section: "Server", title: "Create Model"}});

// Configuration routes
routes.push({path: "/configuration/:action/:identifier", component: Configuration, meta: {section: "Model", title: "View / Edit Configuration"}});
routes.push({path: "/configuration/:action", component: Configuration, meta: {section: "Model", title: "Create Configuration"}});

// Add new or edit trigger
routes.push({path: "/trigger/:action/:identifier", component: Trigger, meta: {section: "Triggers", title: "View / Edit Trigger"}});
routes.push({path: "/trigger/:action", component: Trigger, meta: {section: "Triggers", title: "Create Trigger"}});

// Add new or edit sourcePoint
routes.push({path: "/sourcePoint/:action/:identifier", component: SourcePoint, meta: {section: "SourcePoints", title: "View / Edit sourcePoint"}});
routes.push({path: "/sourcePoint/:action", component: SourcePoint, meta: {section: "SourcePoints", title: "Create sourcePoint"}});

// Job
routes.push({path: "/job/:action/:identifier", component: Job, meta: {section: "Jobs", title: "View Job"}});


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
