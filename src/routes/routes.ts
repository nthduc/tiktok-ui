import config from '@/config';
//Layouts
import { HeaderOnly } from '@/layouts';
import { DefaultLayout } from '@/layouts';
//Pages
import Home from '@/pages/Home';
import Following from '@/pages/Following';
import Profile from '@/pages/Profile';
import Upload from '@/pages/Upload';
import Search from '@/pages/Search';
import Live from '@/pages/Live';
import Messages from '@/pages/Messages';
import Watching from '@/pages/Watching';
import Settings from '@/pages/Settings';
import Feedback from '@/pages/Feedback';

//public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following, layout: DefaultLayout },
    { path: config.routes.live, component: Live, layout: DefaultLayout },
    { path: config.routes.profile, component: Profile, layout: DefaultLayout },
    { path: config.routes.upload, component: Upload, layout: HeaderOnly },
    { path: config.routes.search, component: Search, layout: null },
    { path: config.routes.messages, component: Messages, layout: HeaderOnly },
    { path: config.routes.watching, component: Watching, layout: null },
    { path: config.routes.settings, component: Settings, layout: HeaderOnly },
    { path: config.routes.feedback, component: Feedback, layout: HeaderOnly },
];
//private routes
// Khi đăng nhập vào sẽ có các routes private
const privateRoutes = [''];

export { publicRoutes, privateRoutes };
