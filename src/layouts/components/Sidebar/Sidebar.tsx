import React from 'react';
import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import config from '@/config';
import Menu, { MenuItem } from './Menu';
import {
    HomeActiveIcon,
    HomeIcon,
    LiveActiveIcon,
    LiveIcon,
    UserGroupActiveIcon,
    UserGroupIcon,
} from '@/components/Icons';
import SuggestedAccounts from '@/components/SuggestedAccounts';

const cx = classNames.bind(styles);

const Sidebar: React.FC = () => {
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem 
                    title="For You" 
                    to={config.routes.home} 
                    icon={<HomeIcon />} 
                    activeIcon={<HomeActiveIcon />} 
                />
                <MenuItem
                    title="Following"
                    to={config.routes.following}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                />
                <MenuItem 
                    title="LIVE" 
                    to={config.routes.live} 
                    icon={<LiveIcon />} 
                    activeIcon={<LiveActiveIcon />} 
                />
            </Menu>

            <SuggestedAccounts label='Suggested accounts'/>
            {/* <SuggestedAccounts label='Followed accounts'/> */}
        </aside>
    );
};

export default Sidebar;
